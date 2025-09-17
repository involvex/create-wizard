#!/usr/bin/env node
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

// Main function
export async function main(deps) {
  const inquirer = deps.inquirer || _inquirer
  const execa = deps.execa || _execa
  const fs = deps.fs || _fs
  const fsExtra = deps.fsExtra || _fsExtra
  const templatesDir = deps.templatesDir

  const prompt = inquirer.prompt

  async function applyTemplate(templateName, projectDir) {
    const templatePath = join(templatesDir, templateName)
    const templateConfigPath = join(templatePath, 'template.json')
    const templateFilesPath = join(templatePath, 'files')

    let templateConfig = { dependencies: {}, devDependencies: {}, scripts: {} }
    if (fs.existsSync(templateConfigPath)) {
      templateConfig = JSON.parse(fs.readFileSync(templateConfigPath, 'utf-8'))
    }

    const projectPackageJsonPath = join(projectDir, 'package.json')
    let projectPackageJson = JSON.parse(fs.readFileSync(projectPackageJsonPath, 'utf-8'))

    projectPackageJson.dependencies = {
      ...projectPackageJson.dependencies,
      ...templateConfig.dependencies,
    }
    projectPackageJson.devDependencies = {
      ...projectPackageJson.devDependencies,
      ...templateConfig.devDependencies,
    }
    projectPackageJson.scripts = { ...projectPackageJson.scripts, ...templateConfig.scripts }

    fs.writeFileSync(projectPackageJsonPath, JSON.stringify(projectPackageJson, null, 2))

    if (fs.existsSync(templateFilesPath)) {
      const spinner = ora('Copying template files...').start()
      fsExtra.copySync(templateFilesPath, projectDir, { overwrite: true })
      spinner.succeed('Template files copied.')
    }
    return templateConfig
  }

  const answers = await prompt([
    { name: 'projectName', message: 'Project name:' },
    {
      type: 'list',
      name: 'template',
      message: 'Select a project template:',
      choices: fs
        .readdirSync(templatesDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name),
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
      type: 'checkbox',
      name: 'features',
      message: 'Select optional features:',
      choices: [
        { name: 'jest', message: 'Include Jest testing framework' },
        { name: 'debug', message: 'Include VS Code debug configuration' },
      ],
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

  await applyTemplate(answers.template, projectDir)

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

  if (answers.features.includes('jest')) {
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      jest: '^29.7.0',
    }
    packageJson.scripts = {
      ...packageJson.scripts,
      test: 'jest',
    }
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

  if (answers.features.includes('debug')) {
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
    const installSpinner = ora('Installing dependencies...').start()
    await execa('npm', ['install', ...allDependencies])
    installSpinner.succeed('Dependencies installed.')
  }
  if (allDevDependencies.length > 0) {
    const devInstallSpinner = ora('Installing dev dependencies...').start()
    await execa('npm', ['install', '--save-dev', ...allDevDependencies])
    devInstallSpinner.succeed('Dev dependencies installed.')
  }

  if (answers.initGit) {
    const gitInitSpinner = ora('Initializing Git repository...').start()
    await execa('git', ['init'])
    gitInitSpinner.succeed('Git repository initialized.')

    const gitAddSpinner = ora('Staging files...').start()
    await execa('git', ['add', '.'])
    gitAddSpinner.succeed('Files staged.')

    const gitCommitSpinner = ora('Committing initial changes...').start()
    await execa('git', ['commit', '-m', 'Initial commit'])
    gitCommitSpinner.succeed('Initial commit created.')
  }

  console.log('Project successfully created!')
}

import { main as createPlugin } from './create-plugin.js';

// This block allows the script to be run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const templatesDir = join(__dirname, '../templates');

  // Check for --plugin flag
  if (process.argv.includes('--plugin')) {
    createPlugin({
      /* dependencies */
    });
  } else {
    main({ templatesDir });
  }
}
