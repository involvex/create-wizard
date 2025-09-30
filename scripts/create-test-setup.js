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
    {
      type: 'confirm',
      name: 'includeTypeScript',
      message: 'Include TypeScript?',
      default: false,
    },
  ])

  debugTestSetup('Selected framework: %s', answers.framework)
  const spinner = ora(`Setting up ${answers.framework}...`).start()

  try {
    switch (answers.framework) {
      case 'Jest':
        await setupJest(answers)
        break
      case 'Vitest':
        await setupVitest(answers)
        break
      case 'Mocha/Chai':
        await setupMochaChai(answers)
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

export async function setupJest(answers) {
  const devDependencies = ['jest']
  let jestConfigContent
  let exampleTestContent
  let testFileExtension = '.js'

  if (answers.includeTypeScript) {
    devDependencies.push('ts-jest', '@types/jest')
    jestConfigContent = `/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
`
    exampleTestContent = `describe('Example Test', () => {
  test('should pass', () => {
    expect(true).toBe(true);
  });
});
`
    testFileExtension = '.ts'
  } else {
    jestConfigContent = `module.exports = {
  testEnvironment: 'node',
};
`
    exampleTestContent = `describe('Example Test', () => {
  test('should pass', () => {
    expect(true).toBe(true);
  });
});
`
  }

  await execa('npm', ['install', '--save-dev', ...devDependencies])

  fs.writeFileSync(join(process.cwd(), 'jest.config.js'), jestConfigContent)

  fs.mkdirSync(join(process.cwd(), '__tests__'), { recursive: true })
  fs.writeFileSync(
    join(process.cwd(), '__tests__', `example.test${testFileExtension}`),
    exampleTestContent,
  )

  updatePackageJsonScripts({
    test: 'jest',
  })
}

export async function setupVitest(answers) {
  const devDependencies = ['vitest']
  let vitestConfigContent
  let testFileExtension = '.js'
  let exampleTestContent

  if (answers.includeTypeScript) {
    devDependencies.push('typescript')
    vitestConfigContent = `import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
  },
});
`
    testFileExtension = '.ts'
    exampleTestContent = `import { describe, it, expect } from 'vitest';

describe('Example Test', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });
});
`
  } else {
    vitestConfigContent = `import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
  },
});
`
    exampleTestContent = `import { describe, it, expect } from 'vitest';

describe('Example Test', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });
});
`
  }

  await execa('npm', ['install', '--save-dev', ...devDependencies])

  fs.writeFileSync(
    join(process.cwd(), `vitest.config.${answers.includeTypeScript ? 'ts' : 'js'}`),
    vitestConfigContent,
  )

  fs.mkdirSync(join(process.cwd(), 'src', '__tests__'), { recursive: true })
  fs.writeFileSync(
    join(process.cwd(), 'src', '__tests__', `example.test${testFileExtension}`),
    exampleTestContent,
  )

  updatePackageJsonScripts({
    test: 'vitest',
  })
}

export async function setupMochaChai(answers) {
  const devDependencies = ['mocha', 'chai']
  if (answers.includeTypeScript) {
    devDependencies.push('ts-node', 'typescript', '@types/mocha', '@types/chai')
  }

  await execa('npm', ['install', '--save-dev', ...devDependencies])

  let mochaConfigContent
  let exampleTestContent
  let testFileExtension = '.js'

  if (answers.includeTypeScript) {
    mochaConfigContent = `module.exports = {
  require: ['ts-node/register'],
  extension: ['ts', 'tsx'],
  spec: ['./test/**/*.test.ts'],
};
`
    exampleTestContent = `import { expect } from 'chai';

describe('Example Test', () => {
  it('should pass', () => {
    expect(true).to.be.true;
  });
});
`
    testFileExtension = '.ts'
  } else {
    mochaConfigContent = `module.exports = {
  spec: ['./test/**/*.test.js'],
};
`
    exampleTestContent = `const { expect } = require('chai');

describe('Example Test', () => {
  it('should pass', () => {
    expect(true).to.be.true;
  });
});
`
  }

  fs.writeFileSync(join(process.cwd(), '.mocharc.js'), mochaConfigContent)

  fs.mkdirSync(join(process.cwd(), 'test'), { recursive: true })
  fs.writeFileSync(
    join(process.cwd(), 'test', `example.test${testFileExtension}`),
    exampleTestContent,
  )

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
