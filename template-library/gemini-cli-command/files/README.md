<!-- @format -->

# Gemini CLI Slash Command Template

This template provides a standardized structure for creating slash commands for the Gemini CLI using a `command.toml` definition file.

## File Structure

- `command.toml`: The core definition file for your slash command. It specifies the command's name, description, options, and handler script.
- `src/handler.js`: The JavaScript file that contains the execution logic for your command.
- `template.json`: Defines the template's metadata for the `create-wizard` tool.

## `command.toml` Schema

The `command.toml` file uses the following structure:

- `name` (string): The name of your slash command.
- `description` (string): A short description of what your command does.
- `handler` (string): The relative path to the JavaScript handler file.
- `[[options]]` (array of tables): Defines the arguments for your command.
  - `name` (string): The name of the option.
  - `description` (string): A description of the option.
  - `type` (string): The data type of the option. Valid types include `string`, `integer`, `boolean`, `user`, `channel`, and `role`.
  - `required` (boolean): Whether the option is required.

## MCP Interactive Builder

This template is designed to be used with the `mcp-builder` tool to compile and register your command with the Gemini CLI.

### Usage

1.  **Define your command**: Fill out the `command.toml` file with your desired command structure.
2.  **Write your logic**: Implement the command's logic in the `src/handler.js` file.
3.  **Build the command**: Run the `mcp-builder` tool, pointing it to your `command.toml` file.

    ```bash
    mcp-builder --toml command.toml
    ```

The builder will then process your `command.toml` and `handler.js` to generate the necessary files and register the command with the Gemini CLI, making it available for use.
