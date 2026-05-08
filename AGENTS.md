<!-- @format -->

# AGENTS.md

Executable source of truth: `package.json`, `CLAUDE.md`, build/workflow configs.

## Critical Environment

- **Node.js >= 22.0.0** (enforced in package.json `engines`)
- **Bun** is the primary package manager (CI uses `setup-bun@v2`)
- CLI entry: `scripts/create-app.js` → built to `dist/create-wizard.js`

## Essential Commands

```bash
# Development workflow
bun run build          # esbuild build (runs lint:fix + format via prebuild)
bun start              # Run CLI directly without building
bun test               # Build + vitest (excludes template-library/, e2e-test-project/)
bun run test:e2e       # End-to-end test (creates vue-wizard project with --answers)
bun run lint:fix       # ESLint auto-fix
bun run format         # Prettier format
bun run check          # lint:fix + format (runs before build)
bun run release <type> # Automated release: version bump, changelog, push
bun run debug          # Run with DEBUG=TRUE logging
```

**Important:** `bun run build` must succeed before `bun test` (prebuild runs check).

## Architecture

- **Single entry point:** `scripts/create-app.js` handles all CLI flags and wizard flow
- **Templates:** `template-library/<name>/` with `files/` (always copied) and `features/` (conditional)
- **Template metadata:** `template.json` defines `dependencies`, `devDependencies`, `scripts`
- Feature-based templates: `discord-bot` and `vue-wizard` support conditional features via prompts
- **Build:** esbuild bundles to ESM, keeps dependencies external (see build script external list)
- **Dependency injection pattern:** all module exports accept `deps` parameter for testability
- **Debug:** set `DEBUG=create-wizard:*` or use `--debug=TRUE` flag

## Testing

- Vitest with `vitest.config.js` (React + Vue plugins enabled)
- Test alias: `@` → `e2e-test-project/src`
- Setup file: `vitest-setup.js` loads `vitest-preview` only when `VITEST` env is set
- E2E uses `--answers=` JSON flag to bypass interactivity
- No unit tests in `scripts/` — test coverage is on generated projects (e2e-test-project)

## Style & Linting

- ESLint flat config (`eslint.config.js`) with per-directory rules:
  - `scripts/**` and CJS: Node globals, relaxed
  - TypeScript: `typescript-eslint` recommended (no project mode)
  - `docs/**`: React + Docusaurus plugin
  - `template-library/**`: Browser globals, special `no-unused-vars` allowances for Vue component names
- Prettier 3.x — run `bun run format` after changes
- License header plugin configured but commented out

## Build Artifacts

- Output: `dist/create-wizard.js` (shebang + ESM)
- Published files: `dist/`, `README.md`, `LICENSE`, `template-library/`
- Do not commit `dist/` changes without building first

## Template Discovery

Templates are auto-discovered from `template-library/` directory by listing subdirectories. Adding a new template only requires creating a folder with `template.json` and `files/` — no registry updates needed.

## Release Process

`bun run release <type>` (patch/minor/major/pre\*):

1. Requires clean working directory on `main` branch
2. Fetches remote, checks for divergence/behind
3. Runs `conventional-changelog` to update `CHANGELOG.md`
4. `git add .`, `npm version`, `git push --follow-tags`
5. GitHub Actions publishes to npm and creates release on version tag

## CI/CD

Workflow: `.github/workflows/ci-release.yml`

- Build job runs on push to `main` or tags `v*.*.*`
- Test job needs build artifact, runs `bun run test`
- Publish job only on version tags, uses `setup-node@v3` for npm publish

## Gotchas

- Windows PowerShell: use `Get-ChildItem`, `Remove-Item`, `Copy-Item` (not `ls`, `rm`, `cp`)
- ESM project: `createRequire` used to load `package.json` from CommonJS context
- `npm start` runs source directly (`bun run scripts/create-app.js`), not the built CLI
- E2E test hardcodes `vue-wizard` template and specific feature flags (`addLicense`, `addFunding`, `addDocs`, `useGhPages`, `initGit`)
- Test excludes: `--exclude "template-library/**" --exclude "e2e-test-project/**"` — generated project tests are not part of CLI test suite

## Important Files

| Path                           | Purpose                                                         |
| ------------------------------ | --------------------------------------------------------------- |
| `scripts/create-app.js`        | Main CLI — wizard logic, template application, Git init         |
| `scripts/create-template.js`   | Interactive template scaffolding tool                           |
| `scripts/create-plugin.js`     | Plugin config wizard (Prettier, ESLint, TypeScript, gitignore)  |
| `scripts/create-test-setup.js` | Test framework installer (Jest/Vitest/Mocha)                    |
| `scripts/release.js`           | Release automation (conventional-changelog, version bump, push) |
| `scripts/e2e-test.js`          | End-to-end validation runner                                    |
| `eslint.config.js`             | Flat ESLint config — per-directory overrides                    |
| `vitest.config.js`             | Test config with React/Vue plugins, alias `@`                   |
| `template-library/`            | All available project templates                                 |
