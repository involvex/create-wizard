/** @format */

import inquirer from 'inquirer'
import { execa } from 'execa'
import fs from 'fs-extra'
import { join } from 'path'

import ora from 'ora'
import debug from 'debug'

// Setup debug logging for create-test-setup
const debugTestSetup = debug('create-wizard:create-test-setup')

export async function main() {
  debugTestSetup('Starting create-test-setup main function')
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'framework',
      message: 'Which testing framework would you like to set up?',
      choices: ['Jest', 'Vitest', 'Mocha/Chai'],
    },
  ])

  debugTestSetup('Selected framework: %s', answers.framework)
  const spinner = ora(`Setting up ${answers.framework}...`).start()

  try {
    switch (answers.framework) {
      case 'Jest':
        await setupJest()
        break
      case 'Vitest':
        await setupVitest()
        break
      case 'Mocha/Chai':
        await setupMochaChai()
        break
    }
    spinner.succeed(`${answers.framework} setup complete!`)
    debugTestSetup('%s setup completed successfully', answers.framework)
  } catch (error) {
    debugTestSetup('Failed to set up %s: %o', answers.framework, error)
    spinner.fail(`Failed to set up ${answers.framework}.`)
    console.error(error)
    process.exit(1)
  }
}

export async function setupJest() {
  await execa('npm', ['install', '--save-dev', 'jest', 'ts-jest', '@types/jest'])

  const jestConfigContent = `/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
`
  fs.writeFileSync(join(process.cwd(), 'jest.config.js'), jestConfigContent)

  const exampleTestContent = `describe('Example Test', () => {
  test('should pass', () => {
    expect(true).toBe(true);
  });
});
`
  fs.mkdirSync(join(process.cwd(), '__tests__'), { recursive: true })
  fs.writeFileSync(join(process.cwd(), '__tests__', 'example.test.ts'), exampleTestContent)

  updatePackageJsonScripts({
    test: 'jest',
  })
}

export async function setupVitest() {
  await execa('npm', ['install', '--save-dev', 'vitest', 'typescript'])

  const vitestConfigContent = `import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
  },
});
`
  fs.writeFileSync(join(process.cwd(), 'vitest.config.ts'), vitestConfigContent)

  const exampleTestContent = `import { describe, it, expect } from 'vitest';

describe('Example Test', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });
});
`
  fs.mkdirSync(join(process.cwd(), 'src', '__tests__'), { recursive: true })
  fs.writeFileSync(join(process.cwd(), 'src', '__tests__', 'example.test.ts'), exampleTestContent)

  updatePackageJsonScripts({
    test: 'vitest',
  })
}

export async function setupMochaChai() {
  await execa('npm', [
    'install',
    '--save-dev',
    'mocha',
    'chai',
    'ts-node',
    'typescript',
    '@types/mocha',
    '@types/chai',
  ])

  const mochaConfigContent = `module.exports = {
  require: ['ts-node/register'],
  extension: ['ts', 'tsx'],
  spec: ['./test/**/*.test.ts'],
};
`
  fs.writeFileSync(join(process.cwd(), '.mocharc.js'), mochaConfigContent)

  const exampleTestContent = `import { expect } from 'chai';

describe('Example Test', () => {
  it('should pass', () => {
    expect(true).to.be.true;
  });
});
`
  fs.mkdirSync(join(process.cwd(), 'test'), { recursive: true })
  fs.writeFileSync(join(process.cwd(), 'test', 'example.test.ts'), exampleTestContent)

  updatePackageJsonScripts({
    test: 'mocha',
  })
}

function updatePackageJsonScripts(newScripts) {
  const packageJsonPath = join(process.cwd(), 'package.json')
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
    packageJson.scripts = { ...packageJson.scripts, ...newScripts }
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
  } else {
    console.error('package.json not found. Please run npm init first.')
  }
}
