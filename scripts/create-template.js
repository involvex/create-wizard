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
import { join, dirname } from 'path'
import _fs from 'fs'
import { fileURLToPath } from 'url'
import { execa as _execa } from 'execa'

export async function main(deps) {
  const inquirer = deps.inquirer || _inquirer
  const fs = deps.fs || _fs
  const execa = deps.execa || _execa
  const templatesDir = deps.templatesDir

  const prompt = inquirer.prompt

  async function checkPackageExists(packageName) {
    try {
      const { stdout } = await execa('npm', ['view', packageName, 'version', '--json'])
      const versions = JSON.parse(stdout)
      // npm view returns a string for single version, array for multiple
      const latestVersion = Array.isArray(versions) ? versions[versions.length - 1] : versions
      return { exists: true, version: `^${latestVersion}` }
    } catch (error) {
      console.error(`Error checking package '${packageName}':`, error)
      return { exists: false, version: null }
    }
  }

  const answers = await prompt([
    {
      name: 'templateName',
      message: 'Enter the name of the new template:',
      validate: input => (input.length > 0 ? true : 'Template name cannot be empty.'),
    },
    {
      type: 'confirm',
      name: 'addDependencies',
      message: 'Do you want to add production dependencies to this template?',
      default: false,
    },
  ])

  const productionDependencies = answers.addDependencies
    ? await promptForPackages('production', checkPackageExists)
    : {}

  const devDependenciesAnswers = await prompt([
    {
      type: 'confirm',
      name: 'addDevDependencies',
      message: 'Do you want to add development dependencies to this template?',
      default: false,
    },
  ])

  const developmentDependencies = devDependenciesAnswers.addDevDependencies
    ? await promptForPackages('development', checkPackageExists)
    : {}

  const scriptAnswers = await prompt([
    {
      type: 'confirm',
      name: 'addScripts',
      message: 'Do you want to add npm scripts to this template?',
      default: false,
    },
  ])

  const scripts = scriptAnswers.addScripts ? await promptForScripts() : {}

  const configAnswers = await prompt([
    {
      type: 'confirm',
      name: 'includeTsconfig',
      message: 'Include tsconfig.json (for TypeScript projects)?',
      default: false,
    },
    {
      type: 'confirm',
      name: 'includeEslintConfig',
      message: 'Include eslint.config.js?',
      default: false,
    },
    {
      type: 'confirm',
      name: 'includePrettierConfig',
      message: 'Include .prettierrc?',
      default: false,
    },
  ])

  const newTemplatePath = join(templatesDir, answers.templateName)
  const newTemplateFilesPath = join(newTemplatePath, 'files')

  if (fs.existsSync(newTemplatePath)) {
    console.error(`Error: Template with name '${answers.templateName}' already exists.`)
    process.exit(1)
  }

  fs.mkdirSync(newTemplateFilesPath, { recursive: true })

  const templateConfig = {
    dependencies: productionDependencies,
    devDependencies: developmentDependencies,
    scripts: scripts,
  }

  fs.writeFileSync(join(newTemplatePath, 'template.json'), JSON.stringify(templateConfig, null, 2))

  if (configAnswers.includeTsconfig) {
    fs.writeFileSync(
      join(newTemplateFilesPath, 'tsconfig.json'),
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

  if (configAnswers.includeEslintConfig) {
    fs.writeFileSync(
      join(newTemplateFilesPath, 'eslint.config.js'),
      `import js from "@eslint/js";\nimport globals from "globals";\nexport default [\n  {languageOptions: { globals: { ...globals.node, ...globals.browser } }},\n  js.configs.recommended,\n];\n`,
    )
  }

  if (configAnswers.includePrettierConfig) {
    fs.writeFileSync(
      join(newTemplateFilesPath, '.prettierrc'),
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

  console.log(`Template '${answers.templateName}' created successfully!`)
  console.log(`You can now add your template files to '${newTemplateFilesPath}'.`)
}

async function promptForPackages(type, checkPackageExists) {
  const packages = {}
  let addMore = true

  while (addMore) {
    const { packageName } = await _inquirer.prompt({
      type: 'input',
      name: 'packageName',
      message: `Enter ${type} package name (leave empty to finish):`,
    })

    if (!packageName) {
      addMore = false
      continue
    }

    const { exists, version } = await checkPackageExists(packageName)

    if (exists) {
      packages[packageName] = version
      console.log(`  Added ${packageName}@${version}`)
    } else {
      console.log(`  Package '${packageName}' not found on NPM. Please check the name.`)
    }

    const { addAnother } = await _inquirer.prompt({
      type: 'confirm',
      name: 'addAnother',
      message: `Add another ${type} package?`,
      default: true,
    })
    addMore = addAnother
  }
  return packages
}

async function promptForScripts() {
  const scripts = {}
  let addMore = true

  while (addMore) {
    const { scriptName } = await _inquirer.prompt({
      type: 'input',
      name: 'scriptName',
      message: 'Enter script name (e.g., start, dev, build) (leave empty to finish): ',
    })

    if (!scriptName) {
      addMore = false
      continue
    }

    const { scriptCommand } = await _inquirer.prompt({
      type: 'input',
      name: 'scriptCommand',
      message: `Enter command for '${scriptName}':`,
    })

    scripts[scriptName] = scriptCommand

    const { addAnother } = await _inquirer.prompt({
      type: 'confirm',
      name: 'addAnother',
      message: 'Add another script?',
      default: true,
    })
    addMore = addAnother
  }
  return scripts
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  const templatesDir = join(__dirname, '../templates')
  main({ templatesDir })
}
