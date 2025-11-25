import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue'; // Added import
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  test: {
    css: true,
    plugins: [
      react(),
      vue() // Added vue plugin
    ],
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
    transformMode: {
      web: [/\.vue$/],
    },
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', 'mjs', '.vue'], // Added .vue
    alias: {
      '@': fileURLToPath(new URL('./e2e-test-project/src', import.meta.url))
    },
  },
});
