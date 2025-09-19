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

    // Set up a clean temporary directory for each test
    fs.rmSync(tempDir, { recursive: true, force: true })
    fs.mkdirSync(tempDir, { recursive: true })
    process.chdir(tempDir)

    // Mock fetch for templates
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
      template: 'react',
      dependencies: [],
      features: [],
      initGit: true,
    })

    // Mock fs functions for this specific test
    const writeFileSyncSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {})
    const readFileSyncSpy = vi.spyOn(fs, 'readFileSync').mockReturnValue('{}') // Mock reading package.json
    const mkdirSyncSpy = vi.spyOn(fs, 'mkdirSync').mockImplementation(() => {}) // Prevent real mkdir

    await main({ inquirer, execa, fs })

    expect(mkdirSyncSpy).toHaveBeenCalledWith(join(tempDir, projectName))
    expect(execa).toHaveBeenCalledWith('npm', ['init', '-y'])
    expect(execa).toHaveBeenCalledWith('git', ['init'])

    // Restore spies
    writeFileSyncSpy.mockRestore()
    readFileSyncSpy.mockRestore()
    mkdirSyncSpy.mockRestore()
  })

  it('should exit if project folder already exists', async () => {
    const projectName = 'existing-app'
    inquirer.prompt.mockResolvedValue({ projectName })

    // Mock existsSync to simulate the folder existing
    const existsSyncSpy = vi.spyOn(fs, 'existsSync').mockReturnValue(true)
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {})
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    await main({ inquirer, execa, fs })

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error: Project folder already exists.')
    expect(exitSpy).toHaveBeenCalledWith(1)

    // Restore spies
    existsSyncSpy.mockRestore()
    exitSpy.mockRestore()
    consoleErrorSpy.mockRestore()
  })
})
