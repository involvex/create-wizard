/**
 * ********************************************
 * Copyright Involvex
 * Copyright 2025
 * *********************************************
 *
 * @format
 */

import _inquirer from 'inquirer'
import { execa as _execa } from 'execa'
import { join, dirname } from 'path'
import _fs from 'fs'
import _fsExtra from 'fs-extra'
import { fileURLToPath } from 'url'
import ora from 'ora'
import debug from 'debug'

// Parse command line arguments for --debug flag
const args = process.argv.slice(2)
const debugFlag = args.find(arg => arg.startsWith('--debug='))
const isDebugEnabled = debugFlag === '--debug=TRUE' || process.env.DEBUG === 'TRUE'

// Enable debug logging BEFORE creating debug instances
if (isDebugEnabled) {
  debug.enable('create-wizard:*')
  console.log('Debug logging enabled for create-wizard')
}

// Setup debug logging for create-app
const debugLog = debug('create-wizard:create-app')
const debugTemplates = debug('create-wizard:create-app:templates')
const debugTemplatesApply = debug('create-wizard:create-app:apply')
const debugDeps = debug('create-wizard:create-app:deps')
const debugGit = debug('create-wizard:create-app:git')

// Log that debug is enabled
if (isDebugEnabled) {
  debugLog('Debug logging enabled for create-wizard')
}
// Main function
export async function main(deps) {
  debugLog('Starting create-app main function')
  const inquirer = deps.inquirer || _inquirer
  const execa = deps.execa || _execa
  const fs = deps.fs || _fs
  const fsExtra = deps.fsExtra || _fsExtra

  async function getTemplates() {
    debugTemplates('Fetching available templates')
    const spinner = ora('Fetching templates...').start()
    try {
      const templatesPath = join(dirname(fileURLToPath(import.meta.url)), '..', 'template-library')
      const templates = fs.readdirSync(templatesPath).filter(file => {
        const filePath = join(templatesPath, file)
        return fs.statSync(filePath).isDirectory()
      })
      debugTemplates('Found templates: %o', templates)
      spinner.succeed('Templates fetched.')
      return templates
    } catch (error) {
      debugTemplates('Failed to fetch templates: %o', error)
      spinner.fail('Failed to fetch templates.')
      console.error(error)
      process.exit(1)
    }
  }

  async function applyTemplate(templateName, projectDir, answers) {
    debugTemplatesApply('Applying template: %s to project: %s', templateName, projectDir)
    const spinner = ora(`Applying template: ${templateName}...`).start()
    try {
      const templateDir = join(
        dirname(fileURLToPath(import.meta.url)),
        '..',
        'template-library',
        templateName,
        'files',
      )

      debugTemplatesApply('Copying template files from: %s', templateDir)
      fsExtra.copySync(templateDir, projectDir)

      // Conditionally copy feature files
      if (answers.discordFeatures) {
        debugTemplatesApply('Applying Discord features: %o', answers.discordFeatures)
        if (answers.discordFeatures.includes('welcome')) {
          fsExtra.copySync(join(templateDir, '../features/welcome'), projectDir)
        }
        if (answers.discordFeatures.includes('logging')) {
          fsExtra.copySync(join(templateDir, '../features/logging'), projectDir)
        }
        if (answers.discordFeatures.includes('moderation')) {
          fsExtra.copySync(join(templateDir, '../features/moderation'), projectDir)
        }
      }
      if (answers.discordRPC) {
        debugTemplatesApply('Applying Discord RPC feature')
        fsExtra.copySync(join(templateDir, '../features/rpc'), projectDir)
      }

      spinner.succeed('Template applied.')
    } catch (error) {
      debugTemplatesApply('Failed to apply template: %o', error)
      spinner.fail('Failed to apply template.')
      console.error(error)
      process.exit(1)
    }
  }

  const answers = await inquirer.prompt([
    { name: 'projectName', message: 'Project name:' },
    {
      type: 'list',
      name: 'template',
      message: 'Select a project template:',
      choices: await getTemplates(),
    },
    {
      type: 'checkbox',
      name: 'discordFeatures',
      message: 'Select Discord bot features:',
      choices: [
        { name: 'welcome', message: 'Include welcome messages for new users' },
        { name: 'logging', message: 'Include message logging' },
        { name: 'moderation', message: 'Include moderation commands (kick/ban)' },
      ],
      when: answers => answers.template === 'discord-bot',
    },
    {
      type: 'confirm',
      name: 'discordRPC',
      message: 'Include Discord RPC (activity status)?',
      default: false,
      when: answers => answers.template === 'discord-bot',
    },
    {
      type: 'checkbox',
      name: 'dependencies',
      message: 'Which packages should be installed?',
      choices: [
        { name: 'express', value: { name: 'express', version: '^4.18.2' } },
        { name: 'discord.js', value: { name: 'discord.js', version: '^14.14.1' } },
        { name: 'axios', value: { name: 'axios', version: '^1.6.2' } },
        { name: 'eslint', value: { name: 'eslint', version: '^8.56.0' } },
        { name: 'dotenv', value: { name: 'dotenv', version: '^16.3.1' } },
      ],
    },
    {
      type: 'confirm',
      name: 'initGit',
      message: 'Initialize a Git repository?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'includeTestFramework',
      message: 'Include a testing framework?',
      default: false,
    },
    {
      type: 'list',
      name: 'testFramework',
      message: 'Which testing framework?',
      choices: ['Jest', 'Vitest', 'Mocha/Chai'],
      when: answers => answers.includeTestFramework,
    },
    {
      type: 'confirm',
      name: 'includeTypeScript',
      message: 'Include TypeScript?',
      default: false,
    },
    {
      type: 'confirm',
      name: 'includeEslint',
      message: 'Include ESLint for linting?',
      default: false,
    },
    {
      type: 'confirm',
      name: 'includePrettier',
      message: 'Include Prettier for code formatting?',
      default: false,
    },
    {
      type: 'confirm',
      name: 'includeDocker',
      default: false,
    },
    {
      type: 'confirm',
      name: 'includeGithubActions',
      message: 'Include GitHub Actions workflow?',
      default: false,
    },
    {
      type: 'confirm',
      name: 'includeGitlabCi',
      message: 'Include GitLab CI/CD pipeline?',
      default: false,
    },
    {
      type: 'confirm',
      name: 'includeDebugConfig',
      message: 'Include VS Code debug configuration?',
      default: false,
    },
  ])

  const projectDir = join(process.cwd(), answers.projectName)
  if (fs.existsSync(projectDir)) {
    console.error('Error: Project folder already exists.')
    process.exit(1)
  }

  fs.mkdirSync(projectDir)
  process.chdir(projectDir)

  const npmInitSpinner = ora('Initializing new project (npm init -y)...').start()
  await execa('npm', ['init', '-y'])
  npmInitSpinner.succeed('Project initialized.')

  await applyTemplate(answers.template, projectDir, answers)

  if (answers.includeTestFramework) {
    const testSetupSpinner = ora(`Setting up ${answers.testFramework}...`).start()
    try {
      process.chdir(projectDir) // Ensure we are in the project directory
      switch (answers.testFramework) {
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
      testSetupSpinner.succeed(`${answers.testFramework} setup complete!`)
    } catch (error) {
      testSetupSpinner.fail(`Failed to set up ${answers.testFramework}.`)
      console.error(error)
      process.exit(1)
    }
  }

  const packageJsonPath = join(projectDir, 'package.json')
  let packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))

  // Process user-selected dependencies
  const userDependencies = answers.dependencies.reduce((acc, dep) => {
    acc[dep.name] = dep.version
    return acc
  }, {})

  // Merge user-selected dependencies with template dependencies
  packageJson.dependencies = {
    ...packageJson.dependencies,
    ...userDependencies,
  }
  packageJson.devDependencies = {
    ...packageJson.devDependencies,
  }

  if (answers.includeTypeScript) {
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      typescript: '^5.3.3',
    }
    fs.writeFileSync(
      join(projectDir, 'tsconfig.json'),
      JSON.stringify(
        {
          compilerOptions: {
            target: 'es2016',
            module: 'commonjs',
            esModuleInterop: true,
            forceConsistentCasingInFileNames: true,
            strict: true,
            skipLibCheck: true,
          },
        },
        null,
        2,
      ),
    )
  }

  if (answers.includeEslint) {
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      eslint: '^8.56.0',
    }
    if (answers.includePrettier) {
      packageJson.devDependencies = {
        ...packageJson.devDependencies,
        'eslint-config-prettier': '^9.1.0',
      }
    }
    fs.writeFileSync(
      join(projectDir, 'eslint.config.js'),
      `import js from "@eslint/js";\nimport globals from "globals";\n${answers.includePrettier ? "import prettierConfig from 'eslint-config-prettier';\n" : ''}export default [\n  {languageOptions: { globals: { ...globals.node, ...globals.browser } }},\n  js.configs.recommended,\n  ${answers.includePrettier ? 'prettierConfig,\n' : ''}];\n`,
    )
    packageJson.scripts = {
      ...packageJson.scripts,
      lint: 'eslint .',
      'lint:fix': 'eslint . --fix',
    }
  }

  if (answers.includePrettier) {
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      prettier: '^3.2.5',
    }
    fs.writeFileSync(
      join(projectDir, '.prettierrc'),
      JSON.stringify(
        {
          semi: false,
          singleQuote: true,
          trailingComma: 'all',
        },
        null,
        2,
      ),
    )
    packageJson.scripts = {
      ...packageJson.scripts,
      'format:check': 'prettier --check .',
      format: 'prettier --write .',
    }
  }

  if (answers.includeDocker) {
    fs.writeFileSync(
      join(projectDir, 'Dockerfile'),
      `# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json .

# Install any dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]
`,
    )
    fs.writeFileSync(
      join(projectDir, '.dockerignore'),
      `node_modules
npm-debug.log
yarn-debug.log
.git
.gitignore
.vscode
Dockerfile
.dockerignore
`,
    )
  }

  if (answers.includeGithubActions) {
    const githubDir = join(projectDir, '.github')
    const workflowsDir = join(githubDir, 'workflows')
    fs.mkdirSync(workflowsDir, { recursive: true })
    fs.writeFileSync(
      join(workflowsDir, 'main.yml'),
      `name: CI/CD Pipeline

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
      - run: npm ci
      - run: npm run build --if-present
      - run: npm test
`,
    )
  }

  if (answers.includeGitlabCi) {
    fs.writeFileSync(
      join(projectDir, '.gitlab-ci.yml'),
      `stages:
  - build
  - test

build-job:
  stage: build
  script:
    - echo "Compiling the code..."
    - npm ci
    - npm run build --if-present
  tags:
    - docker

test-job:
  stage: test
  script:
    - echo "Running tests..."
    - npm test
  tags:
    - docker
`,
    )
  }

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

  if (answers.includeDebugConfig) {
    const vscodeDir = join(projectDir, '.vscode')
    fs.mkdirSync(vscodeDir, { recursive: true })
    fs.writeFileSync(
      join(vscodeDir, 'launch.json'),
      JSON.stringify(
        {
          version: '0.2.0',
          configurations: [
            {
              type: 'node',
              request: 'launch',
              name: 'Launch Program',
              skipFiles: ['<node_internals>/**'],
              program: '${workspaceFolder}/src/index.js',
            },
          ],
        },
        null,
        2,
      ),
    )
  }

  const allDependencies = Object.entries(packageJson.dependencies || {}).map(
    ([name, version]) => `${name}@${version}`,
  )
  const allDevDependencies = Object.entries(packageJson.devDependencies || {}).map(
    ([name, version]) => `${name}@${version}`,
  )

  if (allDependencies.length > 0) {
    debugDeps('Installing dependencies: %o', allDependencies)
    const installSpinner = ora('Installing dependencies...').start()
    await execa('npm', ['install', ...allDependencies])
    installSpinner.succeed('Dependencies installed.')
    debugDeps('Dependencies installed successfully')
  }
  if (allDevDependencies.length > 0) {
    debugDeps('Installing dev dependencies: %o', allDevDependencies)
    const devInstallSpinner = ora('Installing dev dependencies...').start()
    await execa('npm', ['install', '--save-dev', ...allDevDependencies])
    devInstallSpinner.succeed('Dev dependencies installed.')
    debugDeps('Dev dependencies installed successfully')
  }

  if (answers.initGit) {
    debugGit('Initializing Git repository')
    const gitInitSpinner = ora('Initializing Git repository...').start()
    await execa('git', ['init'])
    gitInitSpinner.succeed('Git repository initialized.')
    debugGit('Git repository initialized successfully')

    const gitAddSpinner = ora('Staging files...').start()
    await execa('git', ['add', '.'])
    gitAddSpinner.succeed('Files staged.')
    debugGit('Files staged successfully')

    const gitCommitSpinner = ora('Committing initial changes...').start()
    await execa('git', ['commit', '-m', 'Initial commit'])
    gitCommitSpinner.succeed('Initial commit created.')
    debugGit('Initial commit created successfully')
  }

  console.log('Project successfully created!')
  console.log('\nThank you for using @involvex/create-wizard!')
  console.log(
    'If you want to support the project, you can do so at https://buymeacoffee.com/involvex',
  )
}

import { main as createPlugin } from './create-plugin.js'
import { main as generateLicense } from './generate-license.js'
import {
  main as createTestSetup,
  setupJest,
  setupVitest,
  setupMochaChai,
} from './create-test-setup.js'

//This block allows the script to be run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  // Check for flags
  const userArgs = process.argv.slice(2) // Get arguments passed by the user

  if (userArgs.includes('--plugin')) {
    createPlugin({
      /* dependencies */
    })
  } else if (userArgs.includes('--license')) {
    generateLicense({
      /* dependencies */
    })
  } else if (userArgs.includes('--create-test')) {
    createTestSetup({
      /* dependencies */
    })
  } else {
    // If no specific flags are provided by the user, run main
    main({})
  }
}
