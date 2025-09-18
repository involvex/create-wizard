import inquirer from 'inquirer';
import { execa } from 'execa';

async function main() {
  const { command } = await inquirer.prompt([
    {
      type: 'list',
      name: 'command',
      message: 'Select an ADB command:',
      choices: ['devices', 'reboot', 'shell'],
    },
  ]);

  try {
    const { stdout } = await execa('adb', [command]);
    console.log(stdout);
  } catch (error) {
    console.error('Error executing ADB command:', error);
  }
}

main();
