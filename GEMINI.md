<!-- @format -->

# Project: @involvex/create-universe

## Project Overview

The `@involvex/create-universe` project is a command-line interface (CLI) tool designed to streamline the setup of new JavaScript projects. It provides an interactive experience, guiding users through the process of naming their project, selecting essential dependencies (such as `express`, `discord.js`, `axios`, `eslint`, and `dotenv`), and optionally initializing a Git repository. Upon completion, the tool creates the project directory, sets up a `package.json` file, installs the chosen dependencies, generates a basic `src/index.js` file, and performs an initial Git commit if requested.

## Main Technologies

- **Node.js**: The primary runtime environment for the CLI tool.
- **Inquirer.js**: Used for creating interactive command-line user interfaces and prompting users for input.
- **Execa**: Facilitates the execution of external processes and shell commands within the Node.js environment.
- **ESBuild**: Employed for bundling the CLI tool into a single CommonJS file for distribution.
- **ESLint**: A static code analysis tool used for identifying problematic patterns found in JavaScript code.
- **Prettier**: An opinionated code formatter that ensures consistent code style across the project.

## Building and Running

The project includes several npm scripts for common development tasks:

- **Build**: `npm run build`
  - Compiles the `scripts/create-app.js` file into `dist/create-universe.cjs` using `esbuild`, targeting Node.js v22.
- **Run**: `npm start`
  - Executes the bundled CLI tool located at `dist/create-universe.cjs`.
- **Lint**: `npm run lint`
  - Runs ESLint to check for code quality and style issues.
- **Lint Fix**: `npm run lint:fix`
  - Runs ESLint and automatically fixes any fixable issues.
- **Format Check**: `npm run format:check`
  - Uses Prettier to check if code formatting adheres to the defined style.
- **Format Fix**: `npm run format`
  - Uses Prettier to automatically reformat code according to the defined style.
- **Check (Lint & Format)**: `npm run check`
  - A convenience script that first runs `lint:fix` and then `format`.

## Development Conventions

- **Code Formatting**: The project enforces code style using Prettier. Configuration details are found in `.prettierrc`, including settings like `semi: false`, `singleQuote: true`, and `trailingComma: "all"`.
- **Linting**: ESLint is configured via `eslint.config.js` to maintain code quality. It integrates with `eslint-config-prettier` to avoid conflicts with Prettier and uses `eslint-plugin-import` for import-related rules.
- **Copyright Headers**: Copyright headers are managed and enforced, as indicated by `eslint-plugin-license-header` in `eslint.config.js` and the `copyright-config.json` file. The current copyright year is set to 2025.
- **Module System**: The project utilizes ES Modules (`"type": "module"` in `package.json`).
- **Node.js Version**: Development and execution require Node.js version 22.0.0 or higher.

## Futureplans

-allow adding custom Templates to the project from '/templates' folder
-create Github pages and add a also a config to templates
-add workflows to the project
-add workflow creation to cli
-add more templates to the project

## NPM Publishing

-when package is published to npm, it should be published with the name '@involvex/create.universe'
-ensured build is clean and all errors are fixed before publishing
