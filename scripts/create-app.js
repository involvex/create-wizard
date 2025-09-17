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

// Main function
export async function main(deps = {}) {
  const inquirer = deps.inquirer || _inquirer
  const execa = deps.execa || _execa
  const fs = deps.fs || _fs
  const fsExtra = deps.fsExtra || _fsExtra
  // In a real CLI execution, __dirname will be available. In tests, it will be injected.
  const templatesDir = deps.templatesDir || join(__dirname, '../templates')

  const prompt = inquirer.prompt

  async function applyTemplate(templateName, projectDir) {
    const templatePath = join(templatesDir, templateName)
    const templateConfigPath = join(templatePath, 'template.json')
    const templateFilesPath = join(templatePath, 'files')

    // Read template configuration
    let templateConfig = { dependencies: {}, devDependencies: {}, scripts: {} }
    if (fs.existsSync(templateConfigPath)) {
      templateConfig = JSON.parse(fs.readFileSync(templateConfigPath, 'utf-8'))
    }

    // Read project's package.json
    const projectPackageJsonPath = join(projectDir, 'package.json')
    let projectPackageJson = JSON.parse(fs.readFileSync(projectPackageJsonPath, 'utf-8'))

    // Merge dependencies and scripts
    projectPackageJson.dependencies = {
      ...projectPackageJson.dependencies,
      ...templateConfig.dependencies,
    }
    projectPackageJson.devDependencies = {
      ...projectPackageJson.devDependencies,
      ...templateConfig.devDependencies,
    }
    projectPackageJson.scripts = { ...projectPackageJson.scripts, ...templateConfig.scripts }

    // Write updated package.json
    fs.writeFileSync(projectPackageJsonPath, JSON.stringify(projectPackageJson, null, 2))

    // Copy template files
    if (fs.existsSync(templateFilesPath)) {
      fsExtra.copySync(templateFilesPath, projectDir, { overwrite: true })
    }
  }

  // Ask questions
  const answers = await prompt([
    { name: 'projectName', message: 'Project name:' },
    {
      type: 'list',
      name: 'template',
      message: 'Select a project template:',
      choices: fs.readdirSync(templatesDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name),
    },
    {
      type: 'checkbox',
      name: 'dependencies',
      message: 'Which packages should be installed?',
      choices: [
        { name: 'express' },
        { name: 'discord.js' },
        { name: 'axios' },
        { name: 'eslint' },
        { name: 'dotenv' },
      ],
    },
    {
      type: 'confirm',
      name: 'initGit',
      message: 'Initialize a Git repository?',
      default: true,
    },\n    {\n      type: \'confirm\',\n      name: \'createInstructionFile\',\n      message: \'Generate an INSTRUCTIONS.md file with basic setup steps?\',\n      default: true,\n    },\n  ])\n\n  const projectDir = join(process.cwd(), answers.projectName)\n  if (fs.existsSync(projectDir)) {\n    console.error(\'Error: Project folder already exists.\')\n    process.exit(1)\n  }\n\n  fs.mkdirSync(projectDir)\n\n  process.chdir(projectDir)\n\n  // npm init -y\n  await execa(\'npm\', [\'init\', \'-y\'])\n\n  // Apply selected template\n  await applyTemplate(answers.template, projectDir)\n\n  // Install packages\n  const allDependencies = [\n    ...answers.dependencies,\n    ...Object.keys(\n      JSON.parse(fs.readFileSync(join(projectDir, \'package.json\'), \'utf-8\')).dependencies || {},\n    ),\n  ]\n  const allDevDependencies = [\n    ...Object.keys(\n      JSON.parse(fs.readFileSync(join(projectDir, \'package.json\'), \'utf-8\')).devDependencies || {},\n    ),\n  ]\n\n  if (allDependencies.length > 0) {\n    await execa(\'npm\', [\'install\', ...new Set(allDependencies)])\n  }\n  if (allDevDependencies.length > 0) {\n    await execa(\'npm\', [\'install\', \'--save-dev\', ...new Set(allDevDependencies)])\n  }\n\n  // Initialize Git\n  if (answers.initGit) {\n    await execa(\'git\', [\'init\'])\n    await execa(\'git\', [\'add\', \'.\'])\n    await execa(\'git\', [\'commit\', \'-m\', \'Initial commit\'])\n  }\n\n  // Generate INSTRUCTIONS.md\n  if (answers.createInstructionFile) {\n    const instructionsContent = `# Project Setup Instructions for ${answers.projectName}\\n\\n` +\n      `This file provides basic instructions to get your project up and running.\\n\\n` +\n      `## Getting Started\\n\\n` +\n      `1. Navigate to your project directory:\\n` +\n      `   \`\`\`bash\\n` +\n      `   cd ${answers.projectName}\\n` +\n      `   \`\`\`\\n\\n` +\n      `2. Install dependencies (if not already installed):\\n` +\n      `   \`\`\`bash\\n` +\n      `   npm install\\n` +\n      `   \`\`\`\\n\\n` +\n      `## Running the Project\\n\\n` +\n      `Based on your selected template (${answers.template}), here are some common commands:\\n\\n`;\n\n    let templateSpecificInstructions = \'\';\n    switch (answers.template) {\n      case \'discord-bot\':\n        templateSpecificInstructions = `*   To start your Discord bot:\\n    \`\`\`bash\\n    npm start\\n    \`\`\`\\n`;\n        break;\n      case \'nextjs\':\n        templateSpecificInstructions = `*   To start the development server:\\n    \`\`\`bash\\n    npm run dev\\n    \`\`\`\\n*   To build for production:\\n    \`\`\`bash\\n    npm run build\\n    \`\`\`\\n*   To start the production server:\\n    \`\`\`bash\\n    npm run start\\n    \`\`\`\\n`;\n        break;\n      case \'vite\':\n      case \'vuejs\':\n        templateSpecificInstructions = `*   To start the development server:\\n    \`\`\`bash\\n    npm run dev\\n    \`\`\`\\n*   To build for production:\\n    \`\`\`bash\\n    npm run build\\n    \`\`\`\\n*   To preview the production build:\\n    \`\`\`bash\\n    npm run preview\\n    \`\`\`\\n`;\n        break;\n      case \'webpack\':\n        templateSpecificInstructions = `*   To build your project:\\n    \`\`\`bash\\n    npm run build\\n    \`\`\`\\n`;\n        break;\n      default:\n        templateSpecificInstructions = `*   Refer to your template\'s documentation for specific commands.\\n`;\n    }\n    fs.writeFileSync(join(projectDir, \'INSTRUCTIONS.md\'), instructionsContent + templateSpecificInstructions);\n  }\n\n  // Generate comprehensive README.md for the generated project\n  const projectReadmeContent = `# ${answers.projectName}\\n\\n` +\n    `This project was generated using [@involvex/create-universe](https://github.com/involvex/create-universe).\\n\\n` +\n    `## Project Overview\\n\\n` +\n    `This is a new project based on the **${answers.template}** template.\\n\\n` +\n    `## Setup\\n\\n` +\n    `1.  **Clone the repository (if applicable):**\\n` +\n    `    \`\`\`bash\\n` +\n    `    git clone <your-repo-url>\\n` +\n    `    cd ${answers.projectName}\\n` +\n    `    \`\`\`\\n` +\n    `2.  **Install dependencies:**\\n` +\n    `    \`\`\`bash\\n` +\n    `    npm install\\n` +\n    `    \`\`\`\\n\\n` +\n    `## Usage\\n\\n`;\n\n  let projectReadmeUsage = \'\';\n  switch (answers.template) {\n    case \'discord-bot\':\n      projectReadmeUsage = `To start your Discord bot:\\n\`\`\`bash\\nnpm start\\n\`\`\`\\n`;\n      break;\n    case \'nextjs\':\n      projectReadmeUsage = `To start the development server:\\n\`\`\`bash\\nnpm run dev\\n\`\`\`\\n\\nTo build for production:\\n\`\`\`bash\\nnpm run build\\n\`\`\`\\n\\nTo start the production server:\\n\`\`\`bash\\nnpm run start\\n\`\`\`\\n`;\n      break;\n    case \'vite\':\n    case \'vuejs\':\n      projectReadmeUsage = `To start the development server:\\n\`\`\`bash\\nnpm run dev\\n\`\`\`\\n\\nTo build for production:\\n\`\`\`bash\\nnpm run build\\n\`\`\`\\n\\nTo preview the production build:\\n\`\`\`bash\\nnpm run preview\\n\`\`\`\\n`;\n      break;\n    case \'webpack\':\n      projectReadmeUsage = `To build your project:\\n\`\`\`bash\\nnpm run build\\n\`\`\`\\n`;\n      break;\n    default:\n      projectReadmeUsage = `Refer to the template\'s documentation or the generated \`package.json\` for specific usage commands.\\n`;\n  }\n\n  const projectReadmeContribution = `## Contributing\\n\\n` +\n    `If you\'d like to contribute to this project, please follow standard open-source practices:\\n\\n` +\n    `1.  Fork the repository.\\n` +\n    `2.  Create a new branch for your feature or bug fix.\\n` +\n    `3.  Make your changes.\\n` +\n    `4.  Commit your changes with a clear and concise message.\\n` +\n    `5.  Push your branch and open a pull request.\\n\\n` +\n    `## License\\n\\n` +\n    `This project is licensed under the ISC License. See the \`LICENSE\` file in the project root for details.\\n`;\n\n  fs.writeFileSync(join(projectDir, \'README.md\'), projectReadmeContent + projectReadmeUsage + projectReadmeContribution);\n\n\n  console.log(\'Project successfully created!\')\n}\n\n// This block ensures the main function is called when the script is executed directly.\n// It uses a common pattern to detect direct execution in both CommonJS and ESM contexts.\nif (process.argv[1] && process.argv[1].endsWith(\'create-app.js\')) {\n  main();\n}
