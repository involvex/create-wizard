/**
 * ********************************************
 * Copyright Involvex
 * Copyright 2025
 * *********************************************
 *
 * @format
 */

import { execa as _execa } from 'execa'
import { join, dirname, resolve } from 'path'
import _fs from 'fs'
import _fsExtra from 'fs-extra'
import { fileURLToPath } from 'url'
import * as p from '@clack/prompts'
import debug from 'debug'

import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const packageJson = require('../package.json')

// Parse command line arguments for --debug flag
const args = process.argv.slice(2)

// Handle help flag
if (args.includes('-h') || args.includes('--help')) {
  console.log(`
    Usage: create-wizard [projectName] [options]

    Initializes a new project using an interactive wizard.

    Arguments:
      projectName           The name of the project to create. If provided, the wizard will skip the project name prompt.

    Options:
      -v, --version                     Output the current version and exit.
      -h, --help                        Display this help message and exit.
      --plugin                          Configure and install a new plugin (e.g., Prettier, ESLint).
      --create-test                     Set up a new test framework for the project.
      --license                         Generate a new LICENSE file.
      --debug=TRUE                      Enable debug logging.
      --list-templates                  List all available deployment templates.
      --view-template <Template-Name>   View more information about a specific template by name.
  `)
  process.exit(0)
}

// Handle version flag
if (args.includes('-v') || args.includes('--version')) {
  console.log(packageJson.version)
  process.exit(0)
}

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
  const execa = deps.execa || _execa
  const fs = deps.fs || _fs
  const fsExtra = deps.fsExtra || _fsExtra

  async function getTemplates() {
    debugTemplates('Fetching available templates')
    const spinner = p.spinner()
    spinner.start('Loading template library...')
    try {
      const templatesPath = join(dirname(fileURLToPath(import.meta.url)), '..', 'template-library')
      const templates = fs.readdirSync(templatesPath).filter(file => {
        const filePath = join(templatesPath, file)
        return fs.statSync(filePath).isDirectory()
      })
      debugTemplates('Found templates: %o', templates)
      spinner.stop('Template library loaded.')
      return templates
    } catch (error) {
      debugTemplates('Failed to fetch templates: %o', error)
      spinner.stop('Failed to load template library.')
      console.error(error)
      process.exit(1)
    }
  }

  async function applyTemplate(templateName, projectDir, answers) {
    debugTemplatesApply('Applying template: %s to project: %s', templateName, projectDir)
    const spinner = p.spinner()
    spinner.start(`Applying template: ${templateName}...`)
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

      if (answers.template === 'vue-wizard') {
        const featuresDir = join(
          dirname(fileURLToPath(import.meta.url)),
          '..',
          'template-library',
          templateName,
          'features',
        )
        if (answers.addLicense) {
          fsExtra.copySync(join(featuresDir, 'license'), projectDir)
        }
        if (answers.addFunding) {
          fsExtra.copySync(join(featuresDir, 'funding'), projectDir)
        }
        if (answers.addDocs) {
          fsExtra.copySync(join(featuresDir, 'docs'), projectDir)
        }
        if (answers.useGhPages) {
          fsExtra.copySync(join(featuresDir, 'gh-pages'), projectDir)
        }
        fsExtra.copySync(join(featuresDir, 'versioning'), projectDir)
      }

      spinner.stop('Template applied.')
    } catch (error) {
      debugTemplatesApply('Failed to apply template: %o', error)
      spinner.stop('Failed to apply template.')
      console.error(error)
      process.exit(1)
    }
  }

  p.intro("Let's create a new project!")

  const cliArgs = process.argv.slice(2).filter(arg => !arg.startsWith('--'))
  const projectNameFromArg = cliArgs[0]

  const answers = {}

  if (projectNameFromArg) {
    answers.projectName = projectNameFromArg
    p.log.info(`Using project name from argument: ${projectNameFromArg}`)
  }

  const answersArg = args.find(arg => arg.startsWith('--answers='))
  if (answersArg) {
    const answersJSON = answersArg.split('=')[1]
    Object.assign(answers, JSON.parse(answersJSON))
  } else {
    // Interactive mode
    const group = await p.group(
      {
        ...(!projectNameFromArg && {
          projectName: () =>
            p.text({
              message: 'Project name:',
              placeholder: 'my-awesome-project',
              validate: value => {
                if (!value) return 'Please enter a project name.'
              },
            }),
        }),
        template: async () =>
          p.select({
            message: 'Select a project template:',
            options: (await getTemplates()).map(t => ({ value: t, label: t })),
          }),
      },
      {
        onCancel: () => {
          p.cancel('Operation cancelled.')
          process.exit(0)
        },
      },
    )

    Object.assign(answers, group)

    if (answers.template === 'discord-bot') {
      const discordGroup = await p.group(
        {
          discordFeatures: () =>
            p.multiselect({
              message: 'Select Discord bot features:',
              options: [
                { value: 'welcome', label: 'Include welcome messages for new users' },
                { value: 'logging', label: 'Include message logging' },
                { value: 'moderation', label: 'Include moderation commands (kick/ban)' },
              ],
              required: false,
            }),
          discordRPC: () =>
            p.confirm({
              message: 'Include Discord RPC (activity status)?',
              initialValue: false,
            }),
        },
        {
          onCancel: () => {
            p.cancel('Operation cancelled.')
            process.exit(0)
          },
        },
      )
      Object.assign(answers, discordGroup)
    }

    if (answers.template === 'vue-wizard') {
      const vueWizardGroup = await p.group(
        {
          isPublic: () =>
            p.confirm({
              message: 'Make the repository public?',
              initialValue: true,
            }),
          addLicense: () =>
            p.confirm({
              message: 'Add a LICENSE file?',
              initialValue: true,
            }),
          addFunding: () =>
            p.confirm({
              message: 'Add a FUNDING.yml file?',
              initialValue: false,
            }),
          addDocs: () =>
            p.confirm({
              message: 'Set up a docs/ directory?',
              initialValue: false,
            }),
          useGhPages: () =>
            p.confirm({
              message: 'Set up a GitHub Pages deployment workflow?',
              initialValue: false,
            }),
        },
        {
          onCancel: () => {
            p.cancel('Operation cancelled.')
            process.exit(0)
          },
        },
      )
      Object.assign(answers, vueWizardGroup)
    }

    const customizationGroup = await p.group(
      {
        ...(!answers.template.startsWith('vue-wizard') && {
          dependencies: () =>
            p.multiselect({
              message: 'Which packages should be installed?',
              options: [
                { value: { name: 'express', version: '^4.18.2' }, label: 'express' },
                { value: { name: 'discord.js', version: '^14.14.1' }, label: 'discord.js' },
                { value: { name: 'axios', version: '^1.6.2' }, label: 'axios' },
                { value: { name: 'eslint', version: '^8.56.0' }, label: 'eslint' },
                { value: { name: 'dotenv', version: '^16.3.1' }, label: 'dotenv' },
              ],
              required: false,
            }),
        }),
        initGit: () =>
          p.confirm({
            message: 'Initialize a Git repository?',
            initialValue: true,
          }),
        includeTestFramework: () =>
          p.confirm({
            message: 'Include a testing framework?',
            initialValue: false,
          }),
        testFramework: ({ results }) => {
          if (results.includeTestFramework) {
            return p.select({
              message: 'Which testing framework?',
              options: [
                { value: 'Jest', label: 'Jest' },
                { value: 'Vitest', label: 'Vitest' },
                { value: 'Mocha/Chai', label: 'Mocha/Chai' },
              ],
            })
          }
        },
        includeTypeScript: () =>
          p.confirm({
            message: 'Include TypeScript?',
            initialValue: false,
          }),
        includeEslint: () =>
          p.confirm({
            message: 'Include ESLint for linting?',
            initialValue: false,
          }),
        includePrettier: () =>
          p.confirm({
            message: 'Include Prettier for code formatting?',
            initialValue: false,
          }),
        includeDocker: () =>
          p.confirm({
            message: 'Include Docker support?',
            initialValue: false,
          }),
        includeGithubActions: () =>
          p.confirm({
            message: 'Include GitHub Actions workflow?',
            initialValue: false,
          }),
        includeGitlabCi: () =>
          p.confirm({
            message: 'Include GitLab CI/CD pipeline?',
            initialValue: false,
          }),
        includeDebugConfig: () =>
          p.confirm({
            message: 'Include VS Code debug configuration?',
            initialValue: false,
          }),
      },
      {
        onCancel: () => {
          p.cancel('Operation cancelled.')
          process.exit(0)
        },
      },
    )

    Object.assign(answers, customizationGroup)
  }

  const projectDir = join(process.cwd(), answers.projectName)
  if (fs.existsSync(projectDir)) {
    p.cancel('Error: Project folder already exists.')
    process.exit(1)
  }

  fs.mkdirSync(projectDir, { recursive: true })
  process.chdir(projectDir)

  const spinner = p.spinner()

  spinner.start('Initializing new project (npm init -y)...')
  await execa('npm', ['init', '-y'])
  spinner.stop('Project initialized.')

  await applyTemplate(answers.template, projectDir, answers)

  if (answers.includeTestFramework) {
    spinner.start(`Setting up ${answers.testFramework}...`)
    try {
      process.chdir(projectDir) // Ensure we are in the project directory
      switch (answers.testFramework) {
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
      spinner.stop(`${answers.testFramework} setup complete!`)
    } catch (error) {
      spinner.stop(`Failed to set up ${answers.testFramework}.`)
      console.error(error)
      process.exit(1)
    }
  }

  const packageJsonPath = join(projectDir, 'package.json')
  let packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))

  // Ensure dependencies is an array even if no prompts were shown
  if (!answers.dependencies) {
    answers.dependencies = []
  }

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
    if (!fs.existsSync(join(projectDir, 'tsconfig.json'))) {
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
  }

  if (answers.includeEslint) {
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      eslint: '^8.56.0',
      globals: '^15.2.0',
    }
    if (answers.includePrettier) {
      packageJson.devDependencies['eslint-config-prettier'] = '^9.1.0'
    }

    // Modern templates are ESM-based.
    const isESM = [
      'vite',
      'nextjs',
      'react-app',
      'vuejs',
      'electron-vite-vue',
      'electron-next-ts',
      'docusaurus-site',
    ].includes(answers.template)

    if (isESM) {
      packageJson.type = 'module'
    }

    let eslintConfigContent
    if (packageJson.type === 'module') {
      eslintConfigContent = `import js from "@eslint/js";
import globals from "globals";
${answers.includePrettier ? "import prettierConfig from 'eslint-config-prettier';\n" : ''}
export default [
  {languageOptions: { globals: { ...globals.node, ...globals.browser } }},
  js.configs.recommended,
  ${answers.includePrettier ? 'prettierConfig,\n' : ''}
];
`
    } else {
      eslintConfigContent = `const js = require("@eslint/js");
const globals = require("globals");
${answers.includePrettier ? "const prettierConfig = require('eslint-config-prettier');\n" : ''}
module.exports = [
  {languageOptions: { globals: { ...globals.node, ...globals.browser } }},
  js.configs.recommended,
  ${answers.includePrettier ? 'prettierConfig,\n' : ''}
];
`
    }

    if (!fs.existsSync(join(projectDir, 'eslint.config.js'))) {
      fs.writeFileSync(join(projectDir, 'eslint.config.js'), eslintConfigContent)
    }

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
    if (!fs.existsSync(join(projectDir, '.prettierrc'))) {
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
    }
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
    spinner.start('Installing dependencies...')
    await execa('npm', ['install', ...allDependencies])
    spinner.stop('Dependencies installed.')
    debugDeps('Dependencies installed successfully')
  }
  if (allDevDependencies.length > 0) {
    debugDeps('Installing dev dependencies: %o', allDevDependencies)
    spinner.start('Installing dev dependencies...')
    await execa('npm', ['install', '--save-dev', ...allDevDependencies])
    spinner.stop('Dev dependencies installed.')
    debugDeps('Dev dependencies installed successfully')
  }

  if (answers.initGit) {
    debugGit('Initializing Git repository')
    spinner.start('Initializing Git repository...')
    await execa('git', ['init'])
    spinner.stop('Git repository initialized.')
    debugGit('Git repository initialized successfully')

    spinner.start('Staging files...')
    await execa('git', ['add', '.'])
    spinner.stop('Files staged.')
    debugGit('Files staged successfully')

    spinner.start('Committing initial changes...')
    await execa('git', ['commit', '-m', 'Initial commit'])
    spinner.stop('Initial commit created.')
    debugGit('Initial commit created successfully')
  }

  p.outro('Project successfully created!')
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
if (resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
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
  } else if (userArgs.includes('--list-templates')) {
    const templatesPath = join(dirname(fileURLToPath(import.meta.url)), '..', 'template-library')
    const templates = _fs.readdirSync(templatesPath).filter(file => {
      const filePath = join(templatesPath, file)
      return _fs.statSync(filePath).isDirectory()
    })
    console.log('Available Templates:')
    templates.forEach(t => console.log(`- ${t}`))
    process.exit(0)
  } else if (userArgs.includes('--view-template')) {
    const templateNameIndex = userArgs.indexOf('--view-template') + 1
    const templateName = userArgs[templateNameIndex]

    if (!templateName || templateName.startsWith('--')) {
      console.error('Error: Please provide a template name.')
      process.exit(1)
    }

    const templatesPath = join(dirname(fileURLToPath(import.meta.url)), '..', 'template-library')
    const templateDir = join(templatesPath, templateName)

    if (!_fs.existsSync(templateDir)) {
      console.error(`Error: Template '${templateName}' not found.`)
      process.exit(1)
    }

    console.log(`Template: ${templateName}`)
    const templateJsonPath = join(templateDir, 'template.json')
    if (_fs.existsSync(templateJsonPath)) {
      const templateJson = JSON.parse(_fs.readFileSync(templateJsonPath, 'utf-8'))
      console.log('Configuration:', JSON.stringify(templateJson, null, 2))
    }

    const readmePath = join(templateDir, 'README.md')
    if (_fs.existsSync(readmePath)) {
      console.log('\n--- README ---')
      console.log(_fs.readFileSync(readmePath, 'utf-8'))
    }
    process.exit(0)
  } else {
    // If no specific flags are provided by the user, run main
    main({})
  }
}
