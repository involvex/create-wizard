#!/usr/bin/env node
/**
 * ********************************************
 * Copyright Involvex
 * Copyright 2025
 * *********************************************
 *
 * @format
 */

import * as p from '@clack/prompts'
import { execa as _execa } from 'execa'
import { join } from 'path'
import _fs from 'fs'

export async function main(deps) {
  // Dependency injection for easier testing
  const execa = deps.execa || _execa
  const fs = deps.fs || _fs

  p.intro('Interactive Plugin Setup Wizard')

  const { targetDir } = await p.group(
    {
      targetDir: () =>
        p.text({
          message:
            'Enter the target directory for the configuration (leave empty for current directory):',
          initialValue: '.',
        }),
    },
    {
      onCancel: () => {
        p.cancel('Operation cancelled.')
        process.exit(0)
      },
    },
  )

  const absoluteTargetDir = join(process.cwd(), targetDir)
  if (!fs.existsSync(absoluteTargetDir)) {
    fs.mkdirSync(absoluteTargetDir, { recursive: true })
  }

  const { pluginType } = await p.group(
    {
      pluginType: () =>
        p.select({
          message: 'Which type of plugin do you want to configure?',
          options: [
            { value: 'formatter', label: 'formatter' },
            { value: 'linter', label: 'linter' },
            { value: 'typescript', label: 'typescript' },
            { value: 'gitignore', label: 'gitignore' },
          ],
        }),
    },
    {
      onCancel: () => {
        p.cancel('Operation cancelled.')
        process.exit(0)
      },
    },
  )

  let configGenerated = false
  let depsInstalled = false

  switch (pluginType) {
    case 'formatter':
      {
        p.log.step('Configuring Prettier...')
        const answers = await p.group(
          {
            semi: () => p.confirm({ message: 'Use semicolons?', initialValue: false }),
            singleQuote: () => p.confirm({ message: 'Use single quotes?', initialValue: true }),
            trailingComma: () =>
              p.select({
                message: 'Use trailing commas?',
                options: [
                  { value: 'none', label: 'none' },
                  { value: 'es5', label: 'es5' },
                  { value: 'all', label: 'all' },
                ],
                initialValue: 'all',
              }),
          },
          {
            onCancel: () => {
              p.cancel('Operation cancelled.')
              process.exit(0)
            },
          },
        )

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

        const { installDeps } = await p.group(
          {
            installDeps: () =>
              p.confirm({ message: 'Install Prettier dependency?', initialValue: true }),
          },
          {
            onCancel: () => {
              p.cancel('Operation cancelled.')
              process.exit(0)
            },
          },
        )

        if (installDeps) {
          const spinner = p.spinner()
          spinner.start('Installing Prettier...')
          try {
            await execa('npm', ['install', '--save-dev', 'prettier'], {
              cwd: absoluteTargetDir,
            })
            spinner.stop('Prettier installed.')
            depsInstalled = true
          } catch (error) {
            spinner.stop('Failed to install Prettier.')
            p.log.error(error)
          }
        }
      }
      break
    case 'linter':
      {
        p.log.step('Configuring ESLint...')
        const answers = await p.group(
          {
            env: () =>
              p.multiselect({
                message: 'Select the environments your code will run in:',
                options: [
                  { value: 'browser', label: 'browser' },
                  { value: 'node', label: 'node' },
                ],
                initialValue: ['browser', 'node'],
              }),
            extendPrettier: () =>
              p.confirm({
                message: 'Extend Prettier configuration (if you use Prettier)?',
                initialValue: true,
              }),
          },
          {
            onCancel: () => {
              p.cancel('Operation cancelled.')
              process.exit(0)
            },
          },
        )

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

        const { installDeps } = await p.group(
          {
            installDeps: () =>
              p.confirm({ message: 'Install ESLint dependencies?', initialValue: true }),
          },
          {
            onCancel: () => {
              p.cancel('Operation cancelled.')
              process.exit(0)
            },
          },
        )

        if (installDeps) {
          const spinner = p.spinner()
          spinner.start('Installing ESLint dependencies...')
          const deps = ['eslint', '@eslint/js', 'globals']
          if (answers.extendPrettier) {
            deps.push('eslint-config-prettier')
          }
          try {
            await execa('npm', ['install', '--save-dev', ...deps], {
              cwd: absoluteTargetDir,
            })
            spinner.stop('ESLint dependencies installed.')
            depsInstalled = true
          } catch (error) {
            spinner.stop('Failed to install ESLint dependencies.')
            p.log.error(error)
          }
        }
      }
      break
    case 'typescript':
      {
        p.log.step('Configuring TypeScript...')
        const answers = await p.group(
          {
            target: () =>
              p.select({
                message: 'Select the ECMAScript target version:',
                options: ['ES5', 'ES6', 'ES2020', 'ES2021', 'ESNext'],
                initialValue: 'ES6',
              }),
            module: () =>
              p.select({
                message: 'Select the module system:',
                options: ['CommonJS', 'ESNext', 'NodeNext'],
                initialValue: 'CommonJS',
              }),
            strict: () => p.confirm({ message: 'Enable strict type-checking?', initialValue: true }),
            esModuleInterop: () =>
              p.confirm({ message: 'Enable esModuleInterop?', initialValue: true }),
          },
          {
            onCancel: () => {
              p.cancel('Operation cancelled.')
              process.exit(0)
            },
          },
        )

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

        const { installDeps } = await p.group(
          {
            installDeps: () =>
              p.confirm({ message: 'Install TypeScript dependency?', initialValue: true }),
          },
          {
            onCancel: () => {
              p.cancel('Operation cancelled.')
              process.exit(0)
            },
          },
        )

        if (installDeps) {
          const spinner = p.spinner()
          spinner.start('Installing TypeScript...')
          try {
            await execa('npm', ['install', '--save-dev', 'typescript'], {
              cwd: absoluteTargetDir,
            })
            spinner.stop('TypeScript installed.')
            depsInstalled = true
          } catch (error) {
            spinner.stop('Failed to install TypeScript.')
            p.log.error(error)
          }
        }
      }
      break
    case 'gitignore':
      {
        p.log.step('Configuring .gitignore...')
        const { templates } = await p.group(
          {
            templates: () =>
              p.multiselect({
                message: 'Select .gitignore templates:',
                options: [
                  'node',
                  'visualstudiocode',
                  'windows',
                  'macos',
                  'linux',
                  'jetbrain',
                ],
                initialValue: ['node', 'visualstudiocode'],
              }),
          },
          {
            onCancel: () => {
              p.cancel('Operation cancelled.')
              process.exit(0)
            },
          },
        )

        if (templates.length > 0) {
          const spinner = p.spinner()
          spinner.start('Fetching .gitignore content...')
          try {
            const url = `https://www.toptal.com/developers/gitignore/api/${templates.join(',')}`
            // We need to use a dynamic import for node-fetch
            const fetch = (await import('node-fetch')).default
            const response = await fetch(url)
            const content = await response.text()
            fs.writeFileSync(join(absoluteTargetDir, '.gitignore'), content)
            spinner.stop('.gitignore file created.')
            configGenerated = true
          } catch (error) {
            spinner.stop('Failed to fetch .gitignore templates.')
            p.log.error(error)
          }
        }
      }
      break
  }

  if (configGenerated) {
    p.log.success('Configuration file generated successfully.')
  }
  if (depsInstalled) {
    p.log.success('Dependencies installed successfully.')
  }
  p.outro('Done!')
}