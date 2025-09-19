/**
 * @format
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { main } from '../scripts/create-app.js'
import fs from 'fs'
import { join } from 'path'

// Mock external dependencies that are not the subject of the test
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
    // Reset modules to get fresh mocks
    vi.resetModules()

    // Dynamically import mocked modules
    inquirer = (await import('inquirer')).default
    execa = (await import('execa')).execa

    // Set up a clean temporary directory for each test
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true })
    }
    fs.mkdirSync(tempDir)
    process.chdir(tempDir)

    // Mock fetch for templates
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            { name: 'react', type: 'dir' },
            { name: 'node-api', type: 'dir' },
          ]),
      }),
    )
  })

  afterEach(() => {
    // Clean up and restore CWD
    process.chdir(originalCwd)
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true })
    }
    vi.clearAllMocks() // Clear mocks after each test
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

    // Spy on fs methods to verify calls without replacing the whole module
    const writeFileSyncSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {})
    const readFileSyncSpy = vi.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify({}))

    await main({ inquirer, execa, fs })

    const projectDir = join(tempDir, projectName)

    // Verify directory was created (by chdir logic)
    expect(process.cwd()).toBe(projectDir)

    // Verify npm init and git init were called
    expect(execa).toHaveBeenCalledWith('npm', ['init', '-y'])
    expect(execa).toHaveBeenCalledWith('git', ['init'])
    expect(execa).toHaveBeenCalledWith('git', ['add', '.'])
    expect(execa).toHaveBeenCalledWith('git', ['commit', '-m', 'Initial commit'])

    // Restore spies
    writeFileSyncSpy.mockRestore()
    readFileSyncSpy.mockRestore()
  })

  it('should exit if project folder already exists', async () => {
    const projectName = 'existing-app'
    const projectDir = join(tempDir, projectName)

    // Create the directory to make it exist
    fs.mkdirSync(projectDir)

    inquirer.prompt.mockResolvedValue({ projectName })

    // Mock process.exit
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {})

    await main({ inquirer, execa, fs })

    // Verify it tried to exit
    expect(exitSpy).toHaveBeenCalledWith(1)

    exitSpy.mockRestore()
  })
})
