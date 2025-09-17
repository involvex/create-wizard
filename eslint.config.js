/***********************************************
 * Copyright Involvex
 * Copyright 2025
 ***********************************************/ 

import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import globals from "globals";
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
// import vitest from '@vitest/eslint-plugin';
import licenseHeader from 'eslint-plugin-license-header';
import path from 'node:path';
import url from 'node:url';

// --- ESM way to get __dirname ---
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = __dirname;


export default defineConfig([
  {
    ignores: [
      'node_modules/*',
      '.integration-tests/**',
      'eslint.config.js',
      'packages/**/dist/**',
      'bundle/**',
      'package/bundle/**',
      '.integration-tests/**',
      'dist/**',
    ],
  },
  { 
    files: ["**/*.{js,mjs,cjs}"],
    plugins: {
      import: importPlugin,
      'license-header': licenseHeader,
      // vitest,
      prettier: prettierConfig,
    }, 
    extends: [js.configs.recommended],
    languageOptions: { globals: { ...globals.node } },
    rules: {
      "semi": "error",
      "no-undef": "error",
      "no-unused-vars": "warn",
    }
  }
]
);
