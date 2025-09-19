import fs from 'fs-extra';
import path from 'path';

export const fileManager = {
  name: 'fileManager',
  description: 'Manages file system operations.',
  tools: [
    {
      name: 'read_file',
      description: 'Reads the content of a specified file.',
      parameters: {
        type: 'object',
        properties: {
          filePath: { type: 'string', description: 'The path to the file to read.' },
        },
        required: ['filePath'],
      },
      execute: async ({ filePath }) => {
        try {
          const content = await fs.readFile(filePath, 'utf8');
          return { success: true, content };
        } catch (error) {
          return { success: false, error: error.message };
        }
      },
    },
    {
      name: 'write_file',
      description: 'Writes content to a specified file. If the file exists, it will be overwritten.',
      parameters: {
        type: 'object',
        properties: {
          filePath: { type: 'string', description: 'The path to the file to write.' },
          content: { type: 'string', description: 'The content to write to the file.' },
        },
        required: ['filePath', 'content'],
      },
      execute: async ({ filePath, content }) => {
        try {
          await fs.outputFile(filePath, content);
          return { success: true, message: `File ${filePath} written successfully.` };
        } catch (error) {
          return { success: false, error: error.message };
        }
      },
    },
    {
      name: 'list_directory',
      description: 'Lists the names of files and subdirectories directly within a specified directory path.',
      parameters: {
        type: 'object',
        properties: {
          directoryPath: { type: 'string', description: 'The path to the directory to list.' },
        },
        required: ['directoryPath'],
      },
      execute: async ({ directoryPath }) => {
        try {
          const files = await fs.readdir(directoryPath);
          return { success: true, files };
        } catch (error) {
          return { success: false, error: error.message };
        }
      },
    },
  ],
};
