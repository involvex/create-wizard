# Installation Guide for @involvex/create-universe

This document provides detailed instructions on how to install and set up the `@involvex/create-universe` CLI tool.

## Prerequisites

Before you can install and use `create-universe`, you need to have Node.js installed on your system.

*   **Node.js**: Version 22.0.0 or higher is required. You can download it from the official Node.js website: [https://nodejs.org/](https://nodejs.org/)

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

The recommended way to install `create-universe` is globally using npm (Node Package Manager). This makes the `create-universe` command available from any directory in your terminal.

```bash
npm install -g @involvex/create-universe
```

After installation, you can verify that the CLI tool is correctly installed by running:

```bash
create-universe --version
```

This should display the installed version of the `create-universe` tool.

## Local Installation (for Development)

If you plan to contribute to the `create-universe` project or want to run it locally without global installation, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/involvex/create-wizard.git
    cd create-universe
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
    node dist/create-universe.cjs
    ```
    Or, if you want to simulate global execution within the project directory:
    ```bash
    npm start
    ```

## Troubleshooting

*   **`command not found: create-universe`**:
    *   Ensure Node.js and npm are correctly installed and added to your system's PATH.
    *   Try reinstalling globally: `npm install -g @involvex/create-universe`.
    *   On some systems, you might need `sudo npm install -g @involvex/create-universe`.
*   **Permission errors during global installation**:
    *   This often indicates that npm doesn't have write permissions to the global installation directory. You can either:
        *   Use `sudo` (on macOS/Linux): `sudo npm install -g @involvex/create-wizard`.
        *   Change npm's default directory: Refer to npm's official documentation on "Fixing npm permissions".
