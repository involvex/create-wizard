<!-- @format -->

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This project uses Bun as the package manager (though npm scripts also work).

### Building and Running

- `bun run build` - Build the CLI (runs prebuild checks: lint:fix + format)
- `bun start` - Run the CLI locally (executes `scripts/create-app.js` directly)
- `bun run debug` - Run CLI with debug logging enabled

### Code Quality

- `bun run check` - Run lint:fix and format (runs before build)
- `bun run lint` - Check for style issues with ESLint
- `bun run lint:fix` - Auto-fix linting issues
- `bun run format:check` - Check formatting with Prettier
- `bun run format` - Format code with Prettier

### Testing

- `bun test` - Run tests (builds first, then vitest; excludes template-library and e2e-test-project)
- `bun run test:e2e` - Run end-to-end tests
- `bun run coverage` - Generate test coverage report

### Template Management

- `bun run template:create` - Interactive wizard to create a new project template

### Other

- `bun run release` - Automated release script (versioning, tagging, pushing)
- `bun run review` - AI-powered code review using GitHub models

## Build Process

The CLI is built using esbuild:

- Source: `scripts/create-app.js`
- Output: `dist/create-wizard.js`
- Platform: Node.js 22+ (ESM)
- External dependencies are not bundled (listed in build script)

The built file is distributed as the `create-wizard` CLI command via the `bin` field in package.json.

## Architecture

### Entry Point and Execution Flow

**`scripts/create-app.js`** - Main CLI application

1. Parses CLI flags (`--help`, `--version`, `--plugin`, `--create-test`, `--license`, `--list-templates`, `--view-template`)
2. Runs interactive wizard using `@clack/prompts` for project creation
3. Discovers templates from `template-library/` directory
4. Applies selected template (copies files, optionally adds features)
5. Sets up optional tooling (TypeScript, ESLint, Prettier, Docker, CI/CD, Git)

### Key Scripts

| File                           | Purpose                                              |
| ------------------------------ | ---------------------------------------------------- |
| `scripts/create-app.js`        | Main CLI - project creation wizard                   |
| `scripts/create-plugin.js`     | Plugin configuration wizard (ESLint, Prettier, etc.) |
| `scripts/create-test-setup.js` | Test framework setup (Jest, Vitest, Mocha/Chai)      |
| `scripts/create-template.js`   | Template creation wizard                             |
| `scripts/generate-license.js`  | License header generator                             |
| `scripts/release.js`           | Release automation                                   |
| `scripts/e2e-test.js`          | End-to-end testing                                   |

### Template System

Templates are stored in `template-library/<template-name>/`:

```
template-library/
  discord-bot/
    files/           # Copied to all projects using this template
      src/
      package.json
    features/        # Optional - conditionally copied
      welcome/
      logging/
      moderation/
    template.json    # Template metadata (dependencies, scripts)
    README.md        # Template documentation
```

**Template metadata (`template.json`)** defines:

```json
{
  "dependencies": { "package": "^1.0.0" },
  "devDependencies": { "dev-package": "^1.0.0" },
  "scripts": { "start": "node src/index.js" }
}
```

**Feature-based templates** (like `discord-bot` and `vue-wizard`) support conditional copying of feature modules based on user prompts.

### Code Patterns

**Dependency Injection** - All functions accept a `deps` parameter for testability:

```javascript
export async function main(deps) {
  const execa = deps.execa || _execa
  const fs = deps.fs || _fs
  // ... use execa, fs
}
```

**Debug Logging** - Uses `debug` package with namespaces:

```javascript
import debug from 'debug'
const debugLog = debug('create-wizard:create-app')
debugLog('Some message')
```

Enable with `DEBUG=create-wizard:*` or `--debug=TRUE`.

**Error Handling** - Spinner-based feedback with debug logging:

```javascript
const spinner = p.spinner()
try {
  spinner.start('Doing something...')
  // ... operation
  spinner.stop('Done!')
} catch (error) {
  debugLog('Failed: %o', error)
  spinner.stop('Failed.')
  console.error(error)
  process.exit(1)
}
```

## ESM Project

This is an ES Module project (`"type": "module"` in package.json). Use `import`/`export` syntax. The `createRequire` function is used to load `package.json`:

```javascript
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const packageJson = require('../package.json')
```

## ESLint Configuration

The project uses modern flat config (`eslint.config.js`). Different file types have different rule sets:

- Scripts/CJS: Node globals, relaxed rules
- TypeScript: `typescript-eslint` recommended
- Docusaurus docs: React + Docusaurus rules
- Template library files: Browser globals, special var name allowances
