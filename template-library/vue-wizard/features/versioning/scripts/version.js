/** @format */

const fs = require('fs')
const path = require('path')
const semver = require('semver')

const packageJsonPath = path.resolve(__dirname, '../package.json')
const packageJson = require(packageJsonPath)

const newVersion = process.argv[2]

if (!semver.valid(newVersion)) {
  console.error(`Invalid version: ${newVersion}`)
  process.exit(1)
}

packageJson.version = newVersion

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n')

console.log(`Version updated to ${newVersion}`)
