<!-- @format -->

# Installation Guide for @involvex/create-wizard

This document provides detailed instructions on how to install and set up the `@involvex/create-wizard` CLI tool.

## Prerequisites

Before you can install and use `create-wizard`, you need to have Node.js installed on your system.

- **Node.js**: Version 22.0.0 or higher is required. You can download it from the official Node.js website: [https://nodejs.org/](https://nodejs.org/)

To verify your Node.js installation, open your terminal or command prompt and run:

```bash
node -v
npm -v
```

You should see output similar to:

```
v22.x.x
10.x.x
```

## Global Installation

The recommended way to install `create-wizard` is globally using npm (Node Package Manager). This makes the `create-wizard` command available from any directory in your terminal.

```bash
npm install -g @involvex/create-wizard
```

After installation, you can verify that the CLI tool is correctly installed by running:

```bash
create-wizard --version
```

This should display the installed version of the `create-wizard` tool.

## Local Installation (for Development)

If you plan to contribute to the `create-wizard` project or want to run it locally without global installation, follow these steps:

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/involvex/create-wizard.git
    cd create-wizard
    ```

2.  **Install project dependencies**:

    ```bash
    npm install
    ```

3.  **Build the CLI tool**:

    ```bash
    npm run build
    ```

4.  **Run the CLI tool locally**:
    You can then run the CLI tool using `node` directly:
    ```bash
    node dist/create-wizard.cjs
    ```
    Or, if you want to simulate global execution within the project directory:
    ```bash
    npm start
    ```

## Troubleshooting

- **`command not found: create-wizard`**:
  - Ensure Node.js and npm are correctly installed and added to your system's PATH.
  - Try reinstalling globally: `npm install -g @involvex/create-wizard`.
  - On some systems, you might need `sudo npm install -g @involvex/create-wizard`.
- **Permission errors during global installation**:
  - This often indicates that npm doesn't have write permissions to the global installation directory. You can either:
    - Use `sudo` (on macOS/Linux): `sudo npm install -g @involvex/create-wizard`.
    - Change npm's default directory: Refer to npm's official documentation on "Fixing npm permissions".
