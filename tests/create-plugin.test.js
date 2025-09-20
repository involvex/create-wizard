/** @format */

import { describe, it, expect, vi } from 'vitest'
import { main as createPlugin } from '../scripts/create-plugin.js'
import fs from 'fs'
import { execa } from 'execa'
import * as p from '@clack/prompts'

vi.mock('@clack/prompts', () => ({
  intro: vi.fn(),
  outro: vi.fn(),
  group: vi.fn(),
  select: vi.fn(),
  confirm: vi.fn(),
  spinner: vi.fn(() => ({
    start: vi.fn(),
    stop: vi.fn(),
  })),
  log: {
    step: vi.fn(),
    error: vi.fn(),
    success: vi.fn(),
  },
}))
vi.mock('fs')
vi.mock('execa')

describe('create-plugin', () => {
  it('should generate a .prettierrc file with the correct options', async () => {
    p.group.mockResolvedValue({
      targetDir: '.',
      pluginType: 'formatter',
      semi: false,
      singleQuote: true,
      trailingComma: 'all',
      installDeps: false,
    })

    await createPlugin({ fs, execa })

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