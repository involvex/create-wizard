---
id: discord-bot-template
title: Discord Bot Template
sidebar_label: Discord Bot
---

<!-- @format -->

This template provides a basic setup for creating a Discord bot using `discord.js`.

## Features

- **`discord.js`**: The official Node.js module for interacting with the Discord API.
- **`dotenv`**: For loading environment variables from a `.env` file.
- **`nodemon`**: Automatically restarts the bot when file changes are detected during development.
- **Basic Command Handler**: A simple structure to handle Discord slash commands.

## Files Included

- `src/index.js`: The main entry point for your bot. It initializes the Discord client, loads commands, and handles interactions.
- `src/config.json`: (You'll need to create this) Contains your bot's token and other configuration.
- `src/commands/`: A directory to store your bot's slash command files.
- `.env.example`: An example environment file. Rename this to `.env` and fill in your Discord bot token.
- `.gitignore`: Configured to ignore `node_modules`, `.env`, and other common files.
- `package.json`: Configured with `start` and `dev` scripts, and necessary dependencies.

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the bot in production mode.
- `npm run dev`: Runs the bot in development mode using `nodemon` for automatic restarts.

## Getting Started

1.  **Install Dependencies**: After creating your project, install the dependencies:
    ```bash
    npm install
    ```
2.  **Configure Your Bot**: Create a `config.json` file in the `src` directory with your bot's token:
    ```json
    {
      "token": "YOUR_DISCORD_BOT_TOKEN"
    }
    ```
    Alternatively, rename `.env.example` to `.env` and add `DISCORD_TOKEN=YOUR_DISCORD_BOT_TOKEN`.
3.  **Create Commands**: Add your slash command files to the `src/commands/` directory.
4.  **Run the Bot**: Start your bot using `npm start` or `npm run dev`.
