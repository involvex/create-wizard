/**
 * @format
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { main } from '../scripts/create-app.js'
import fs from 'fs'
import { join } from 'path'

// Mock external dependencies
vi.mock('inquirer', () => ({ default: { prompt: vi.fn() } }))
vi.mock('execa', () => ({ execa: vi.fn() }))
vi.mock('ora', () => {
  const oraInstance = {
    start: vi.fn().mockReturnThis(),
    succeed: vi.fn().mockReturnThis(),
    fail: vi.fn().mockReturnThis(),
    set text(value) {},
  }
  return {
    default: vi.fn(() => oraInstance),
  }
})

describe('create-app', () => {
  let inquirer, execa
  const originalCwd = process.cwd()
  const tempDir = join(originalCwd, 'temp-test-dir-e2e')

  beforeEach(async () => {
    vi.resetModules()

    inquirer = (await import('inquirer')).default
    execa = (await import('execa')).execa

    fs.rmSync(tempDir, { recursive: true, force: true })
    fs.mkdirSync(tempDir, { recursive: true })
    process.chdir(tempDir)

    global.fetch = vi.fn((url) => {
      if (url.includes('api.github.com')) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve([]) })
      }
      if (url.endsWith('.zip')) {
        return Promise.resolve({ ok: true, arrayBuffer: () => Promise.resolve(new ArrayBuffer(8)) })
      }
      return Promise.reject(new Error(`Unhandled fetch URL: ${url}`))
    })
  })

  afterEach(() => {
    process.chdir(originalCwd)
    fs.rmSync(tempDir, { recursive: true, force: true })
    vi.clearAllMocks()
  })

  it('should create a project with default options', async () => {
    const projectName = 'my-test-app'
    inquirer.prompt.mockResolvedValue({
      projectName,
      template: 'react-app',
    })

    execa.mockImplementation(async (command, args) => {
      if (command === 'npm' && args[0] === 'init') {
        fs.writeFileSync(join(process.cwd(), 'package.json'), '{}')
      }
    })

    await main({ inquirer, execa, fs })

    const projectDir = join(tempDir, projectName)
    expect(fs.existsSync(projectDir)).toBe(true)
    expect(execa).toHaveBeenCalledWith('npm', ['init', '-y'])
    expect(execa).toHaveBeenCalledWith('git', ['init'])
  })

  it('should exit if project folder already exists', async () => {
    const projectName = 'existing-app'
    // Provide a complete mock answer object to prevent type errors
    inquirer.prompt.mockResolvedValue({
      projectName,
      template: 'react',
      dependencies: [],
      features: [],
      initGit: false,
    })

    // Mock that the directory exists to test the exit condition
    const existsSyncSpy = vi.spyOn(fs, 'existsSync').mockReturnValue(true)
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {})
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    await main({ inquirer, execa, fs })

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error: Project folder already exists.')
    expect(exitSpy).toHaveBeenCalledWith(1)

    // Restore mocks
    existsSyncSpy.mockRestore()
    exitSpy.mockRestore()
    consoleErrorSpy.mockRestore()
  })
})