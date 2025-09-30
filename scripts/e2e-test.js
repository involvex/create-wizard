/** @format */

import { execa } from 'execa'
import { resolve } from 'path'
import fs from 'fs-extra'

async function runE2ETest() {
  const originalCwd = process.cwd()
  const projectName = 'e2e-test-project'
  const projectPath = resolve(originalCwd, '..', projectName)

  console.log(`Cleaning up test directory: ${projectPath}`)
  fs.removeSync(projectPath)

  const answers = {
    projectName,
    template: 'vue-wizard',
    addLicense: true,
    addFunding: true,
    addDocs: true,
    useGhPages: true,
    initGit: true,
  }

  const answersJSON = JSON.stringify(answers)

  try {
    console.log(`Running create-wizard for project: ${projectName}`)
    await execa(
      'node',
      [resolve(originalCwd, 'dist/create-wizard.js'), projectName, `--answers=${answersJSON}`],
      {
        cwd: resolve(originalCwd, '..'),
        stdio: 'inherit',
      },
    )

    process.chdir(projectPath)

    console.log('Installing dependencies...')
    await execa('npm', ['install'], { stdio: 'inherit' })

    console.log('Running tests...')
    await execa('npm', ['test'], { stdio: 'inherit' })

    console.log('Building project...')
    await execa('npm', ['run', 'build'], { stdio: 'inherit' })

    console.log('E2E test passed!')
  } catch (error) {
    console.error('E2E test failed:', error)
    process.exit(1)
  } finally {
    console.log(`Cleaning up test directory: ${projectPath}`)
    process.chdir(originalCwd)
    fs.removeSync(projectPath)
  }
}

runE2ETest()
