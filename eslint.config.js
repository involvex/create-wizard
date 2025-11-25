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

import tseslint from 'typescript-eslint';

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
  ...tseslint.configs.recommended, // Spread recommended TypeScript config
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: {
      import: importPlugin,
      // vitest,
    },
    languageOptions: { globals: { ...globals.node } },
    rules: {
      ...js.configs.recommended.rules,
      // "semi": "error",
      "no-undef": "error",
      "no-unused-vars": ["warn", { "caughtErrors": "none" }],
      // 'license-header/header': ['error', './copyright.js'],
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        // project: true, // Removed as there is no root tsconfig.json
        // tsconfigRootDir: import.meta.dirname, // Removed for flexibility
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      // Any specific TypeScript ESLint rules here
      "no-unused-vars": "off",
    },
  },
  {
    files: ["docs/**/*.{js,jsx,ts,tsx}"], // Target docs files, including TypeScript
    plugins: {
      react,
      "react-hooks": reactHooks,
      "@docusaurus": docusaurus, // Correctly register docusaurus plugin
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
      ...docusaurus.configs.recommended.rules, // Extend docusaurus recommended rules
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
  {
    files: ["template-library/**/*.{js,jsx}"],
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
      "no-undef": "off",
      "no-unused-vars": ["warn", { "varsIgnorePattern": "^(Head|React|App|Link|Layout|HomepageFeatures|HomepageHeader|Heading|Feature|Svg)$" }],
    },
  },
  {
    files: [
      "**/*.cjs",
      "scripts/**/*.js",
      "template-library/**/*.js",
    ],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  prettierConfig,
];
