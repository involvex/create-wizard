<!-- @format -->

## 0.0.6 (2025-09-17)

### Features

*   **CLI Enhancements:**
    *   Added explicit dependency versioning for common packages.
    *   Introduced TypeScript support with `tsconfig.json` generation.
    *   Implemented ESLint and Prettier integration with config file generation.
    *   Added Docker support with `Dockerfile` and `.dockerignore` generation.
    *   Included CI/CD workflow generation for GitHub Actions and GitLab CI/CD.
*   **Template Creation Script (`npm run template:create`):**
    *   Enhanced interactive package selection with NPM registry validation and latest version fetching.
    *   Improved script input with interactive name and command prompts.
    *   Added options to auto-generate `tsconfig.json`, `eslint.config.js`, and `.prettierrc` for new templates.
*   **Documentation Overhaul:**
    *   Applied a new "hacker" themed dark color scheme with UI animations.
    *   Created detailed documentation for custom template creation.
    *   Provided comprehensive guides for all existing templates.
    *   Documented theme customization options.

### Bug Fixes

*   Resolved `SyntaxError` in `scripts/create-template.js` due to a missing array bracket.
*   Fixed various ESLint errors and warnings across the codebase, including JSX parsing and unused variable issues.

## 0.0.3 (2025-09-17)

### Features

- Implement comprehensive template system and update documentation ([a2de91b](https://github.com/involvex/create-wizard/commit/a2de91b996fff42e1dee902dd73354632d3fb618))