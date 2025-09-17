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

export async function main(deps) {
  const inquirer = deps.inquirer || _inquirer
  const fs = deps.fs || _fs
  const templatesDir = deps.templatesDir

  const prompt = inquirer.prompt

  const answers = await prompt([
    {
      name: 'templateName',
      message: 'Enter the name of the new template:',
      validate: input => (input.length > 0 ? true : 'Template name cannot be empty.'),
    },
    {
      type: 'confirm',
      name: 'addDependencies',
      message: 'Do you want to add dependencies to this template?',
      default: false,
    },
    {
      type: 'input',
      name: 'dependencies',
      message: 'Enter production dependencies (comma-separated, e.g., express,axios):',
      when: answers => answers.addDependencies,
      filter: input => (input ? input.split(',').map(dep => dep.trim()) : []),
    },
    {
      type: 'input',
      name: 'devDependencies',
      message: 'Enter development dependencies (comma-separated, e.g., nodemon,eslint):',
      when: answers => answers.addDependencies,
      filter: input => (input ? input.split(',').map(dep => dep.trim()) : []),
    },
    {
      type: 'confirm',
      name: 'addScripts',
      message: 'Do you want to add npm scripts to this template?',
      default: false,
    },
    {
      type: 'editor',
      name: 'scripts',
      message: 'Enter npm scripts in JSON format (e.g., {"start": "node index.js"}):',
      when: answers => answers.addScripts,
      validate: input => {
        try {
          JSON.parse(input)
          return true
        } catch (error) {
          console.error('Error parsing JSON for scripts:', error)
          return 'Invalid JSON format.'
        }
      },
      filter: input => JSON.parse(input),
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
    dependencies: answers.dependencies.reduce(
      (acc, dep) => ({
        ...acc,
        [dep]: '*',
      }),
      {},
    ),
    devDependencies: answers.devDependencies.reduce(
      (acc, dep) => ({
        ...acc,
        [dep]: '*',
      }),
      {},
    ),
    scripts: answers.scripts || {},
  }

  fs.writeFileSync(join(newTemplatePath, 'template.json'), JSON.stringify(templateConfig, null, 2))

  console.log(`Template '${answers.templateName}' created successfully!`)
  console.log(`You can now add your template files to '${newTemplateFilesPath}'.`)
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  const templatesDir = join(__dirname, '../templates')
  main({ templatesDir })
}
