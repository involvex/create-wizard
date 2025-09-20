/**
 * @format
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { main } from '../scripts/create-app.js'
import fs from 'fs'
import { join } from 'path'
import { tmpdir } from 'os'
import * as p from '@clack/prompts'

// Mock external dependencies
vi.mock('@clack/prompts', () => ({
  intro: vi.fn(),
  outro: vi.fn(),
  group: vi.fn(),
  text: vi.fn(),
  select: vi.fn(),
  multiselect: vi.fn(),
  confirm: vi.fn(),
  spinner: vi.fn(() => ({
    start: vi.fn(),
    stop: vi.fn(),
  })),
  log: {
    info: vi.fn(),
    error: vi.fn(),
    success: vi.fn(),
  },
  cancel: vi.fn(),
}))
vi.mock('execa', () => ({ execa: vi.fn() }))

describe('create-app', () => {
  let execa
  const originalCwd = process.cwd()
  const tempDir = join(tmpdir(), 'create-universe-test-' + Math.random().toString(36).substr(2, 9))

  beforeEach(async () => {
    vi.resetModules()

    execa = (await import('execa')).execa

    fs.rmSync(tempDir, { recursive: true, force: true })
    fs.mkdirSync(tempDir, { recursive: true })
    process.chdir(tempDir)
  })

  afterEach(() => {
    process.chdir(originalCwd)
    fs.rmSync(tempDir, { recursive: true, force: true })
    vi.clearAllMocks()
  })

  it('should create a project with default options', async () => {
    const projectName = 'my-test-app'
    p.group.mockResolvedValue({
      projectName,
      template: 'react-app',
      dependencies: [],
      initGit: true,
    })

    execa.mockImplementation(async (command, args) => {
      if (command === 'npm' && args[0] === 'init') {
        fs.writeFileSync(join(process.cwd(), 'package.json'), '{}')
      }
    })

    await main({ execa, fs })

    const projectDir = join(tempDir, projectName)
    expect(fs.existsSync(projectDir)).toBe(true)
    expect(execa).toHaveBeenCalledWith('npm', ['init', '-y'])
    expect(execa).toHaveBeenCalledWith('git', ['init'])
  })

  it('should exit if project folder already exists', async () => {
    const projectName = 'existing-app'
    p.group.mockResolvedValue({
      projectName,
      template: 'react-app',
      dependencies: [],
      initGit: false,
    })

    const existsSyncSpy = vi.spyOn(fs, 'existsSync').mockReturnValue(true)
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {})

    await main({ execa, fs })

    expect(p.cancel).toHaveBeenCalledWith('Error: Project folder already exists.')
    expect(exitSpy).toHaveBeenCalledWith(1)

    existsSyncSpy.mockRestore()
    exitSpy.mockRestore()
  })
})
