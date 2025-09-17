# @involvex/create-universe

`@involvex/create-universe` is a powerful command-line interface (CLI) tool designed to streamline and accelerate the setup of new JavaScript projects. It offers an interactive and comprehensive solution for project initialization, ensuring consistency and reducing manual setup. Our goal is to be the go-to solution for quickly building new projects.

## Features

*   **Interactive Project Setup**: Guides you through project creation with prompts for project name, template selection, and additional dependencies.
*   **Comprehensive Template Support**: Choose from predefined templates that provide a complete project configuration, including:
    *   **Dependencies**: Automatically installs necessary npm packages (both regular and dev dependencies) defined by the template.
    *   **Scripts**: Merges template-specific scripts into your `package.json`.
    *   **File Scaffolding**: Copies an entire initial file structure, including `src` directories, configuration files, and example code.
*   **Instruction File Generation**: Optionally generates an `INSTRUCTIONS.md` file in the new project with basic setup and usage steps.
*   **Comprehensive Project README**: Generates a detailed `README.md` for the new project, including setup, usage, and contribution guidelines.
*   **Dependency Management**: Beyond template-defined dependencies, you can select additional npm packages to install.
*   **Git Initialization**: Option to initialize a Git repository and make an initial commit, setting up version control from the start.
*   **Consistency and Speed**: Ensures projects are set up consistently and rapidly, accelerating developer onboarding and reducing boilerplate.

## Installation

To use `create-universe`, you need Node.js (version 22.0.0 or higher) installed on your system.

```bash
npm install -g @involvex/create-universe
```

## Usage

To create a new project, run the following command in your terminal:

```bash
create-universe
```

The CLI will then guide you through the following steps:

1.  **Project Name**: Enter the name for your new project.
2.  **Template Selection**: Choose a template from the available options. Each template will set up a complete initial project structure, including its own `package.json` configurations (dependencies, scripts) and files.
    *   `discord-bot`
    *   `nextjs`
    *   `node-api` (New!)
    *   `react-app` (New!)
    *   `vite`
    *   `vuejs`
    *   `webpack`
3.  **Additional Dependency Installation**: Select any *additional* npm packages you want to install. Note that template-specific dependencies will be installed automatically.
4.  **Git Initialization**: Confirm if you want to initialize a Git repository for your project.
5.  **Generate Instruction File**: Confirm if you want to generate an `INSTRUCTIONS.md` file with basic setup steps for your new project.

## Development

### Prerequisites

*   Node.js (>= 22.0.0)
*   npm

### Setup

1.  Clone the repository:
    ```bash
    git clone https://github.com/involvex/create-wizard/issues
    cd create-universe
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Scripts

*   **Build**: `npm run build` - Compiles the CLI tool.
*   **Run**: `npm start` - Executes the compiled CLI tool.
*   **Lint**: `npm run lint` - Checks code for style and quality issues.
*   **Lint Fix**: `npm run lint:fix` - Fixes linting issues automatically.
*   **Format Check**: `npm run format:check` - Checks code formatting.
*   **Format**: `npm run format` - Formats code automatically.
*   **Check**: `npm run check` - Runs linting and formatting checks.

## Contributing

Contributions are welcome! Please refer to the `LICENSE` file for details.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Support

-Donation to https://buymeacoffe.com/involvex