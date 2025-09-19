import fs from 'fs/promises';
import path from 'path';

const vitestCacheDir = path.join(process.cwd(), 'node_modules', '.vitest');

async function clearVitestCache() {
  try {
    await fs.rm(vitestCacheDir, { recursive: true, force: true });
    console.log(`Successfully cleared Vitest cache at ${vitestCacheDir}`);
  } catch (error) {
    console.error(`Failed to clear Vitest cache at ${vitestCacheDir}:`, error);
  }
}

clearVitestCache();