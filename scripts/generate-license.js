#!/usr/bin/env node
/**
 * ********************************************
 * Copyright Involvex
 * Copyright 2025
 * *********************************************
 *
 * @format
 */

import _inquirer from 'inquirer';
import _fs from 'fs';
import { join } from 'path';
import ora from 'ora';

export async function main(deps) {
  const inquirer = deps.inquirer || _inquirer;
  const fs = deps.fs || _fs;

  console.log('License Header Generation Wizard');

  const { copyrightHolder } = await inquirer.prompt([
    {
      name: 'copyrightHolder',
      message: 'Enter the copyright holder name:',
      default: 'Involvex',
    },
  ]);

  const { targetDir } = await inquirer.prompt([
    {
      name: 'targetDir',
      message: 'Enter the target directory (leave empty for current directory):',
      default: '.',
    },
  ]);

  const absoluteTargetDir = join(process.cwd(), targetDir);

  const licenseHeader = `/**
 * ********************************************
 * Copyright ${copyrightHolder}
 * Copyright ${new Date().getFullYear()}
 * *********************************************
 *
 * @format
 */`;

  const spinner = ora('Adding license headers...').start();
  let filesModified = 0;

  function scanDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        scanDirectory(filePath);
      } else if (new RegExp('\\.(js|ts|jsx|tsx)').test(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        if (!content.includes('Copyright')) {
          fs.writeFileSync(filePath, `${licenseHeader}\n\n${content}`);
          filesModified++;
        }
      }
    }
  }

  try {
    scanDirectory(absoluteTargetDir);
    spinner.succeed(`Added license headers to ${filesModified} files.`);
  } catch (error) {
    spinner.fail('Failed to add license headers.');
    console.error(error);
  }
}
