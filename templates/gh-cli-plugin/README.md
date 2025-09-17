# GitHub CLI Plugin Template

This template provides a basic structure for creating a new GitHub CLI plugin.

## Structure

-   `gh-my-plugin`: The main executable script for your plugin.
-   `template.json`: The metadata for the `create-wizard` tool.

## Installation

To install this plugin, run the following command:

```bash
gh extension install <path-to-this-directory>
```

## Usage

Once installed, you can use the plugin with the following command:

```bash
gh my-plugin hello
```

## Development

To add new commands, edit the `gh-my-plugin` script and add new cases to the `case` statement.
