/**
 * @format
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { main } from '../scripts/create-app.js'
import * as originalFs from 'fs'
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
vi.mock('fs-extra', () => ({
  copySync: vi.fn(),
  createWriteStream: vi.fn(),
}))

// Mock fs but keep original functionality for specific cases
vi.mock('fs', async (importOriginal) => {
  const actualFs = await importOriginal()
  return {
    ...actualFs,
    existsSync: vi.fn(),
    readFileSync: vi.fn(),
    writeFileSync: vi.fn(),
    mkdirSync: vi.fn(),
  }
})

describe('create-app', () => {
  let inquirer, execa, fs, fsExtra, ora
  const originalCwd = process.cwd()
  const tempDir = join(originalCwd, 'temp-test-dir')

  beforeEach(async () => {
    // Reset mocks and modules before each test
    vi.resetModules()

    // Import mocked modules
    inquirer = (await import('inquirer')).default
    execa = (await import('execa')).execa
    fs = (await import('fs'))
    fsExtra = (await import('fs-extra'))
    ora = (await import('ora')).default

    // Mock fetch for getTemplates
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          { name: 'react', type: 'dir' },
          { name: 'node-api', type: 'dir' },
        ]),
      }),
    )

    // Setup a temporary directory for tests
    if (!originalFs.existsSync(tempDir)) {
      originalFs.mkdirSync(tempDir)
    }
    process.chdir(tempDir)

    // Default mock implementations
    fs.existsSync.mockReturnValue(false)
    fs.readFileSync.mockReturnValue(JSON.stringify({ name: 'test-project' }))
  })

  afterEach(() => {
    // Clean up and restore
    process.chdir(originalCwd)
    if (originalFs.existsSync(tempDir)) {
      originalFs.rmSync(tempDir, { recursive: true, force: true })
    }
    vi.clearAllMocks()
  })

  it('should create a project with default options', async () => {
    const projectName = 'my-test-app'
    const projectDir = join(tempDir, projectName)

    inquirer.prompt.mockResolvedValue({
      projectName,
      template: 'react',
      dependencies: [],
      features: [],
      initGit: true,
    })

    await main({ inquirer, execa, fs, fsExtra, ora })

    // Verify directory and npm init
    expect(fs.mkdirSync).toHaveBeenCalledWith(projectDir)
    expect(execa).toHaveBeenCalledWith('npm', ['init', '-y'])

    // Verify git init
    expect(execa).toHaveBeenCalledWith('git', ['init'])
    expect(execa).toHaveBeenCalledWith('git', ['add', '.'])
    expect(execa).toHaveBeenCalledWith('git', ['commit', '-m', 'Initial commit'])

    // Verify final message
    // Note: We can't easily test console.log with mocks here, but we ensure the flow completes
  })

  it('should install selected dependencies', async () => {
    const projectName = 'my-dep-app'
    inquirer.prompt.mockResolvedValue({
      projectName,
      template: 'node-api',
      dependencies: [{ name: 'express', version: '^4.18.2' }],
      features: [],
      initGit: false,
    })

    await main({ inquirer, execa, fs, fsExtra, ora })

    // Verify dependency installation
    expect(execa).toHaveBeenCalledWith('npm', ['install', 'express@^4.18.2'])
  })

  it('should not initialize git if user declines', async () => {
    const projectName = 'no-git-app'
    inquirer.prompt.mockResolvedValue({
      projectName,
      template: 'react',
      dependencies: [],
      features: [],
      initGit: false, // User says no to git
    })

    await main({ inquirer, execa, fs, fsExtra, ora })

    // Verify git was NOT called
    expect(execa).not.toHaveBeenCalledWith('git', expect.any(Array))
  })

  it('should exit if project folder already exists', async () => {
    const projectName = 'existing-app'
    const projectDir = join(tempDir, projectName)

    // Make the folder exist
    fs.existsSync.mockReturnValue(true)

    // Mock process.exit to prevent test runner from stopping
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {})

    inquirer.prompt.mockResolvedValue({ projectName })

    await main({ inquirer, execa, fs, fsExtra, ora })

    expect(exitSpy).toHaveBeenCalledWith(1)

    // Cleanup spy
    exitSpy.mockRestore()
  })
})