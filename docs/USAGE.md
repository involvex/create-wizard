# Usage Guide for @involvex/create-wizard

This document provides a detailed guide on how to use the `@involvex/create-wizard` CLI tool to create new JavaScript projects. This tool is designed to provide a comprehensive, all-in-one project configuration, streamlining project initialization, reducing manual setup, ensuring consistency, and accelerating developer onboarding.

## Creating a New Project

To create a new project, navigate to the directory where you want your new project to be created and run the `create-wizard` command:

```bash
create-wizard
```

The CLI will then guide you through a series of interactive prompts:

### 1. Project Name

Enter the desired name for your new project. This name will be used to create a new directory for your project and will also be set as the `name` in your `package.json`.

**Example:**

```
? Project name: my-awesome-project
```

### 2. Template Selection

Choose one of the available project templates. Each template provides a complete, pre-configured project setup, including its own set of dependencies, npm scripts, and initial file structures.

**Example:**

```
? Select a project template: (Use arrow keys)
> discord-bot
  nextjs
  node-api
  react-app
  vite
  vuejs
  webpack
```

The selected template will scaffold the entire project structure. Here's a brief overview of each template:

*   **`discord-bot`**: Sets up a basic Discord bot project with necessary `discord.js` dependencies and a starting `src/index.js`. Ideal for quickly getting a Discord bot development environment ready.
*   **`nextjs`**: Configures a minimal Next.js application, including React, Next.js dependencies, and standard Next.js scripts (`dev`, `build`, `start`, `lint`). Perfect for starting server-rendered React applications.
*   **`node-api`**: Provides a simple Node.js API structure, typically using Express. Includes basic routing and server setup. Great for backend development.
*   **`react-app`**: Initializes a basic React application using Vite for fast development. Includes core React dependencies and a simple component structure.
*   **`vite`**: Sets up a general-purpose Vite project. Vite is a fast build tool that provides a lean and efficient development experience.
*   **`vuejs`**: Configures a Vue.js project, often integrated with Vite for rapid development. Includes core Vue dependencies and a basic application structure.
*   **`webpack`**: Provides a foundational Webpack project setup. Useful for understanding and customizing build processes from scratch.

### 3. Additional Dependency Installation

You can select any *additional* npm packages you want to install beyond those provided by the chosen template. Template-specific dependencies (both regular and dev dependencies) will be automatically installed as part of the template application process.

**Example:**

```
? Which packages should be installed? (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
❯◯ express
 ◯ discord.js
 ◯ axios
 ◯ eslint
 ◯ dotenv
```

The selected packages will be installed using `npm install`.

### 4. Initialize Git Repository

Decide whether you want to initialize a Git repository for your new project.

**Example:**

```
? Initialize a Git repository? (Y/n)
```

If you confirm (default is `Yes`), a new Git repository will be initialized, all project files will be added, and an initial commit will be made with the message "Initial commit".

### 5. Generate Instruction File

Confirm if you want to generate an `INSTRUCTIONS.md` file within your new project. This file will contain basic setup steps and common commands relevant to your chosen template, helping you get started quickly.

**Example:**

```
? Generate an INSTRUCTIONS.md file with basic setup steps? (Y/n)
```

## Project Structure After Creation

After successfully running `create-wizard`, your new project directory (`my-awesome-project` in the example above) will contain:

*   **`package.json`**: Fully configured with the project name, merged dependencies (from both template and your selections), and template-defined npm scripts.
*   **`node_modules/`**: Contains all installed npm dependencies.
*   **Template-specific files and folders**: The complete file structure provided by the chosen template (e.g., `src/`, `public/`, configuration files).
*   **`INSTRUCTIONS.md`** (if generated): A markdown file with quick setup and usage instructions.
*   **`README.md`**: A comprehensive `README.md` file for your new project, including project overview, setup, usage, and contribution guidelines.
*   **`.git/`** (if Git initialization was selected): The Git repository.

## Example Workflow

```bash
# Navigate to your desired projects directory
cd ~/my-projects

# Run the CLI tool
create-wizard

# Follow the prompts:
# ? Project name: my-react-app
# ? Select a project template: react-app
# ? Which packages should be installed? (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
# ❯◉ axios
#  ◯ dotenv
# ? Initialize a Git repository? (Y/n) Yes
# ? Generate an INSTRUCTIONS.md file with basic setup steps? (Y/n) Yes

# Project successfully created!

# Navigate into your new project
cd my-react-app

# Start developing!
npm run dev
```