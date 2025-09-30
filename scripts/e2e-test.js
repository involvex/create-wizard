/** @format */

import { execa } from 'execa'
import { join } from 'path'
import fs from 'fs-extra'

async function runE2ETest() {
  const projectName = 'e2e-test-project'
  const projectPath = join(process.cwd(), '..', projectName)

  // Cleanup previous test run
  if (fs.existsSync(projectPath)) {
    fs.removeSync(projectPath)
  }

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
    await execa('node', ['dist/create-wizard.js', projectName, `--answers=${answersJSON}`], {
      stdio: 'inherit',
    })

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
    // Cleanup
    if (fs.existsSync(projectPath)) {
      fs.removeSync(projectPath)
    }
  }
}

runE2ETest()
