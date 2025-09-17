/***********************************************
 * Copyright Involvex
 * Copyright 2025
 ***********************************************/ 

import js from "@eslint/js";
import globals from "globals";
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
// import vitest from '@vitest/eslint-plugin';
import licenseHeader from 'eslint-plugin-license-header';

import docusaurus from '@docusaurus/eslint-plugin';

import path from 'node:path';
import url from 'node:url';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

// --- ESM way to get __dirname ---
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = __dirname;


export default [
  {
    ignores: [
      'node_modules/*',
      '.integration-tests/**',
      'eslint.config.js',
      'packages/**/dist/**',
      'bundle/**',
      'package/bundle/**',
      'dist/**',
      'docs-backup/**',
      'copyright.js',
      'docs/build/**',
      'docs/.docusaurus/**',
    ],
  },
  { 
    files: ["**/*.{js,mjs,cjs}"],
    plugins: {
      import: importPlugin,
      // vitest,
    }, 
    languageOptions: { globals: { ...globals.node } },
    rules: {
      ...js.configs.recommended.rules,
      "semi": "error",
      "no-undef": "error",
      "no-unused-vars": "warn",
      // 'license-header/header': ['error', './copyright.js'],
    },
  },
  {
    files: ["tests/**/*.js"], // Target test files
    languageOptions: {
      globals: {
        ...globals.jest, // Add Jest globals
        ...globals.node, // Node.js globals are also relevant for tests
      },
    },
    rules: {
      // You might want to adjust rules specifically for test files
      "no-undef": "off", // Turn off no-undef for test files as Jest globals are handled
      "no-unused-vars": "off", // Often test files have unused vars for clarity
    },
  },
  {
    files: ["docs/**/*.{js,jsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
  prettierConfig,
];
