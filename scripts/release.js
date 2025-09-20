#!/usr/bin/env node
/**
 * ********************************************
 * Copyright Involvex
 * Copyright 2025
 * *********************************************
 *
 * @format
 */

import { execa } from 'execa'
import ora from 'ora'

async function run(command, args) {
  try {
    await execa(command, args, { stdio: 'inherit' })
  } catch (error) {
    console.error(`Error executing: ${command} ${args.join(' ')}`)
    throw error
  }
}

async function main() {
  const args = process.argv.slice(2)
  const versionType = args[0] || 'patch'
  const validTypes = ['patch', 'minor', 'major', 'premajor', 'preminor', 'prepatch', 'prerelease']

  if (!validTypes.includes(versionType)) {
    console.error(`Invalid version type: ${versionType}`)
    console.error(`Valid types are: ${validTypes.join(', ')}`)
    process.exit(1)
  }

  const spinner = ora(`Creating a new ${versionType} release...`).start()

  try {
    spinner.text = 'Generating changelog...'
    await run('npx', ['conventional-changelog', '-p', 'angular', '-i', 'CHANGELOG.md', '-s'])

    spinner.text = 'Staging changelog...'
    await run('git', ['add', 'CHANGELOG.md'])

    // Check if CHANGELOG.md has actual changes before committing
    const gitStatusOutput = await execa('git', ['status', '--porcelain', 'CHANGELOG.md'])
    if (gitStatusOutput.stdout.trim().length > 0) {
      spinner.text = 'Committing changelog...'
      await run('git', ['commit', '-m', 'docs: Update CHANGELOG.md for release'])
    } else {
      spinner.text = 'No new changelog entries. Skipping changelog commit.'
    }

    spinner.text = 'Checking git status before versioning...'
    await run('git', ['status'])

    spinner.text = 'Bumping version...'
    await run('npm', ['version', versionType, '-m', `chore(release): %s`])

    spinner.text = 'Pushing to remote...'
    await run('git', ['push', '--follow-tags'])

    spinner.text = 'Publishing to npm...'
    await run('npm', ['publish'])

    spinner.succeed(`Successfully released new ${versionType} version!`)
  } catch (error) {
    spinner.fail('Release failed.')
    process.exit(1)
  }
}

main()
