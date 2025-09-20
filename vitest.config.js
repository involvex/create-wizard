import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  test: {
    css: true,
    plugins: [react()],
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
    environment: 'node',
    preview: {
      port: 3000,
      host: 'localhost',
    },
    setupFiles: ['./vitest-setup.js'],
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', 'mjs'],
  },
});
