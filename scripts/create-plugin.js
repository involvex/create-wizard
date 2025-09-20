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
import { join } from 'path'
import _fs from 'fs'
import ora from 'ora'

export async function main(deps) {
  // Dependency injection for easier testing
  const inquirer = deps.inquirer || _inquirer
  const execa = deps.execa || _execa
  const fs = deps.fs || _fs

  console.log('Interactive Plugin Setup Wizard')

  const { targetDir } = await inquirer.prompt([
    {
      name: 'targetDir',
      message:
        'Enter the target directory for the configuration (leave empty for current directory):',
      default: '.',
    },
  ])

  const absoluteTargetDir = join(process.cwd(), targetDir)
  if (!fs.existsSync(absoluteTargetDir)) {
    fs.mkdirSync(absoluteTargetDir, { recursive: true })
  }

  const { pluginType } = await inquirer.prompt([
    {
      type: 'list',
      name: 'pluginType',
      message: 'Which type of plugin do you want to configure?',
      choices: ['formatter', 'linter', 'typescript', 'gitignore'],
    },
  ])

  let configGenerated = false
  let depsInstalled = false

  switch (pluginType) {
    case 'formatter':
      {
        console.log('Configuring Prettier...')
        const answers = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'semi',
            message: 'Use semicolons?',
            default: false,
          },
          {
            type: 'confirm',
            name: 'singleQuote',
            message: 'Use single quotes?',
            default: true,
          },
          {
            type: 'list',
            name: 'trailingComma',
            message: 'Use trailing commas?',
            choices: ['none', 'es5', 'all'],
            default: 'all',
          },
        ])

        const prettierConfig = {
          semi: answers.semi,
          singleQuote: answers.singleQuote,
          trailingComma: answers.trailingComma,
        }

        fs.writeFileSync(
          join(absoluteTargetDir, '.prettierrc'),
          JSON.stringify(prettierConfig, null, 2),
        )
        configGenerated = true

        const { installDeps } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'installDeps',
            message: 'Install Prettier dependency?',
            default: true,
          },
        ])

        if (installDeps) {
          const spinner = ora('Installing Prettier...').start()
          try {
            await execa('npm', ['install', '--save-dev', 'prettier'], {
              cwd: absoluteTargetDir,
            })
            spinner.succeed('Prettier installed.')
            depsInstalled = true
          } catch (error) {
            spinner.fail('Failed to install Prettier.')
            console.error(error)
          }
        }
      }
      break
    case 'linter':
      {
        console.log('Configuring ESLint...')
        const answers = await inquirer.prompt([
          {
            type: 'checkbox',
            name: 'env',
            message: 'Select the environments your code will run in:',
            choices: ['browser', 'node'],
            default: ['browser', 'node'],
          },
          {
            type: 'confirm',
            name: 'extendPrettier',
            message: 'Extend Prettier configuration (if you use Prettier)?',
            default: true,
          },
        ])

        const globals = {}
        if (answers.env.includes('browser')) {
          globals.browser = true
        }
        if (answers.env.includes('node')) {
          globals.node = true
        }

        const eslintConfig = `
import globals from "globals";
import js from "@eslint/js";
${answers.extendPrettier ? 'import prettierConfig from "eslint-config-prettier";' : ''}

export default [
  { languageOptions: { globals: ${JSON.stringify(globals)} } },
  js.configs.recommended,
  ${answers.extendPrettier ? 'prettierConfig,' : ''}
];
`

        fs.writeFileSync(join(absoluteTargetDir, 'eslint.config.js'), eslintConfig.trim())
        configGenerated = true

        const { installDeps } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'installDeps',
            message: 'Install ESLint dependencies?',
            default: true,
          },
        ])

        if (installDeps) {
          const spinner = ora('Installing ESLint dependencies...').start()
          const deps = ['eslint', '@eslint/js', 'globals']
          if (answers.extendPrettier) {
            deps.push('eslint-config-prettier')
          }
          try {
            await execa('npm', ['install', '--save-dev', ...deps], {
              cwd: absoluteTargetDir,
            })
            spinner.succeed('ESLint dependencies installed.')
            depsInstalled = true
          } catch (error) {
            spinner.fail('Failed to install ESLint dependencies.')
            console.error(error)
          }
        }
      }
      break
    case 'typescript':
      {
        console.log('Configuring TypeScript...')
        const answers = await inquirer.prompt([
          {
            type: 'list',
            name: 'target',
            message: 'Select the ECMAScript target version:',
            choices: ['ES5', 'ES6', 'ES2020', 'ES2021', 'ESNext'],
            default: 'ES6',
          },
          {
            type: 'list',
            name: 'module',
            message: 'Select the module system:',
            choices: ['CommonJS', 'ESNext', 'NodeNext'],
            default: 'CommonJS',
          },
          {
            type: 'confirm',
            name: 'strict',
            message: 'Enable strict type-checking?',
            default: true,
          },
          {
            type: 'confirm',
            name: 'esModuleInterop',
            message: 'Enable esModuleInterop?',
            default: true,
          },
        ])

        const tsConfig = {
          compilerOptions: {
            target: answers.target,
            module: answers.module.toLowerCase(),
            strict: answers.strict,
            esModuleInterop: answers.esModuleInterop,
            forceConsistentCasingInFileNames: true,
            skipLibCheck: true,
          },
        }

        fs.writeFileSync(
          join(absoluteTargetDir, 'tsconfig.json'),
          JSON.stringify(tsConfig, null, 2),
        )
        configGenerated = true

        const { installDeps } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'installDeps',
            message: 'Install TypeScript dependency?',
            default: true,
          },
        ])

        if (installDeps) {
          const spinner = ora('Installing TypeScript...').start()
          try {
            await execa('npm', ['install', '--save-dev', 'typescript'], {
              cwd: absoluteTargetDir,
            })
            spinner.succeed('TypeScript installed.')
            depsInstalled = true
          } catch (error) {
            spinner.fail('Failed to install TypeScript.')
            console.error(error)
          }
        }
      }
      break
    case 'gitignore':
      {
        console.log('Configuring .gitignore...')
        const { templates } = await inquirer.prompt([
          {
            type: 'checkbox',
            name: 'templates',
            message: 'Select .gitignore templates:',
            choices: ['node', 'visualstudiocode', 'windows', 'macos', 'linux', 'jetbrain'],
            default: ['node', 'visualstudiocode'],
          },
        ])

        if (templates.length > 0) {
          const spinner = ora('Fetching .gitignore content...').start()
          try {
            const url = `https://www.toptal.com/developers/gitignore/api/${templates.join(',')}`
            // We need to use a dynamic import for node-fetch
            const fetch = (await import('node-fetch')).default
            const response = await fetch(url)
            const content = await response.text()
            fs.writeFileSync(join(absoluteTargetDir, '.gitignore'), content)
            spinner.succeed('.gitignore file created.')
            configGenerated = true
          } catch (error) {
            spinner.fail('Failed to fetch .gitignore templates.')
            console.error(error)
          }
        }
      }
      break
  }

  if (configGenerated) {
    console.log('✔️ Configuration file generated successfully.')
  }
  if (depsInstalled) {
    console.log('✔️ Dependencies installed successfully.')
  }
}
