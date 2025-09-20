/** @format */

import { describe, it, expect, vi } from 'vitest'
import { main as createPlugin } from '../scripts/create-plugin.js'
import inquirer from 'inquirer'
import fs from 'fs'
import { execa } from 'execa'

vi.mock('inquirer')
vi.mock('fs')
vi.mock('execa')

describe('create-plugin', () => {
  it('should generate a .prettierrc file with the correct options', async () => {
    inquirer.prompt.mockResolvedValue({
      targetDir: '.',
      pluginType: 'formatter',
      semi: false,
      singleQuote: true,
      trailingComma: 'all',
      installDeps: false,
    })

    await createPlugin({ inquirer, fs, execa })

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining('.prettierrc'),
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
  })
})
