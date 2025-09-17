---
id: custom-templates
title: Creating Custom Templates
sidebar_label: Custom Templates
---

This guide explains how to create your own custom templates for `@involvex/create-wizard` using the `npm run template:create` command.

## Using `npm run template:create`

To start creating a new template, run the following command in the root of the `@involvex/create-wizard` project:

```bash
npm run template:create
```

The CLI will guide you through a series of questions:

1.  **Template name:** The name of your new template (e.g., `my-custom-app`). This will be the directory name under `templates/`.
2.  **Add dependencies:** Whether you want to define production and development dependencies for your template.
3.  **Production dependencies:** A comma-separated list of production dependencies (e.g., `express,axios`).
4.  **Development dependencies:** A comma-separated list of development dependencies (e.g., `nodemon,eslint`).
5.  **Add npm scripts:** Whether you want to define custom npm scripts for your template.
6.  **npm scripts:** An interactive editor will open for you to enter npm scripts in JSON format (e.g., `{"start": "node index.js"}`).
7.  **Include tsconfig.json:** Whether to include a basic `tsconfig.json` file (for TypeScript projects).
8.  **Include eslint.config.js:** Whether to include a basic `eslint.config.js` file.
9.  **Include .prettierrc:** Whether to include a basic `.prettierrc` file.

After answering these questions, the script will create a new directory under `templates/` with your specified name. Inside, it will generate a `template.json` file and a `files/` directory.

## Template Structure

Each template must follow this structure:

```
templates/
└── your-template-name/
    ├── template.json
    └── files/
        ├── src/
        │   └── index.js
        ├── package.json.template (optional)
        └── ... (your boilerplate files)
```

### `template.json`

This file defines the metadata, dependencies, and scripts for your template. It's a JSON file with the following structure:

```json
{
  "dependencies": {
    "dependency-name": "^version"
  },
  "devDependencies": {
    "dev-dependency-name": "^version"
  },
  "scripts": {
    "start": "node src/index.js",
    "dev": "your-dev-command"
  }
}
```

-   `dependencies`: An object where keys are production dependency names and values are their versions.
-   `devDependencies`: An object where keys are development dependency names and values are their versions.
-   `scripts`: An object where keys are npm script names and values are the commands to execute.

### `files/` Directory

This directory contains all the boilerplate files that will be copied into the user's new project. You can include any files and folders here that you want to be part of your template. For example:

-   `src/index.js`: Your main application entry point.
-   `public/index.html`: An HTML file for web projects.
-   `.gitignore`, `.env.example`, etc.

**Important:** The `template:create` script will automatically generate `tsconfig.json`, `eslint.config.js`, and `.prettierrc` inside this `files/` directory if you selected those options during template creation.

## Variables in Templates (Future Enhancement)

Currently, templates do not support dynamic variables. However, future enhancements will allow you to use placeholders (e.g., `{{projectName}}`) in your template files that will be replaced with actual values during project creation. Stay tuned for updates!
