import { describe, it, expect } from 'vitest';
import { execa } from 'execa';
import path from 'path';
import fs from 'fs-extra';

const CLI_PATH = path.resolve(__dirname, '../dist/create-wizard.mjs');
const TEMP_DIR = path.resolve(__dirname, 'temp');

describe('CLI Integration Tests', () => {
  it('should create a new project with the default options', async () => {
    const projectName = 'test-project';
    const projectDir = path.join(TEMP_DIR, projectName);
    fs.ensureDirSync(TEMP_DIR);

    const input = [
      projectName, // Project name
      '', // Template (default)
      '', // Dependencies (none)
      'n', // Initialize Git? (no)
      '', // Optional features (none)
      'n', // TypeScript? (no)
      'n', // ESLint? (no)
      'n', // Prettier? (no)
      'n', // Docker? (no)
      'n', // GitHub Actions? (no)
      'n', // GitLab CI? (no)
    ].join('\n');

    const { stdout } = await execa('node', [CLI_PATH], { input });

    expect(stdout).toContain('Project successfully created!');
    expect(fs.existsSync(projectDir)).toBe(true);
    expect(fs.existsSync(path.join(projectDir, 'package.json'))).toBe(true);

    fs.removeSync(TEMP_DIR);
  }, 20000); // Increase timeout for integration tests
});