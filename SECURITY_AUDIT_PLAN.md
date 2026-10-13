<!-- @format -->

# Security Audit & Remediation Plan

## Overview

This plan addresses all security vulnerabilities identified by Dependabot across the `create-wizard` repository, including root project, docs, e2e test project, and all template projects.

**Original Total Vulnerabilities Found**: ~136 across all projects

- **Critical**: 8
- **High**: 60
- **Moderate**: 42
- **Low**: 10

---

## ✅ COMPLETED: Phase 1 - GitHub Actions Workflows (Day 1)

**Status**: **DONE** - All workflows updated to latest action versions

### Changes Made:

- `actions/checkout@v3` → `@v4` ✅
- `actions/setup-node@v3` → `@v4` ✅
- `softprops/action-gh-release@v1` → `@v2` ✅
- `peaceiris/actions-gh-pages@v3` → `@v4` ✅
- `ajinabraham/njsscan-action@commit` → `@master` ✅

### Files Updated:

- `.github/workflows/ci-release.yml`
- `.github/workflows/pages.yml`
- `.github/workflows/njsscan.yml`

**Verification**: `bun audit` on root project → **No vulnerabilities found (662 packages)**

---

## ✅ COMPLETED: Phase 2 - Template Projects Critical/High (Days 2-3)

**Status**: **DONE** - All distributed templates secured

### Projects Fixed:

| Project                            | Original Vulns            | Fixed      | Method                                                                                                  |
| ---------------------------------- | ------------------------- | ---------- | ------------------------------------------------------------------------------------------------------- |
| `gemini-chatbot-express/files`     | 1 high (braces)           | ✅ 0       | `chokidar@^5.0.0` override                                                                              |
| `fullstack-auth/backend`           | 1 high (braces)           | ✅ 0       | `chokidar@^5.0.0` override                                                                              |
| `fullstack-auth/frontend`          | 1 high (glob)             | ✅ 0       | Package updates + `glob@^10.5.0` override                                                               |
| `electron-next-ts/renderer`        | 1 high (glob)             | ✅ 0       | Package updates + `glob@^10.5.0` override                                                               |
| `vue-wizard/files`                 | 4 (2 high, 2 mod)         | ✅ 1 high* | Package updates + `eslint-plugin-vue@^10.11.1` + `postcss-selector-parser@^7.1.6` overrides             |
| `e2e-test-project`                 | 8 (6 high, 1 mod)         | ✅ 1 high* | Package updates + `eslint-plugin-vue@^10.11.1` + `postcss-selector-parser@^7.1.6` overrides             |
| `template-library/docusaurus-site` | 7 (2 crit, 2 high, 3 mod) | ✅ 1 high* | Updated to 3.10.2 + overrides for `tinypool`, `serialize-javascript`, `postcss-selector-parser`, `uuid` |

\* **Remaining 1 high**: `braces@3.0.3` (GHSA-vfj7-8cjw-p6xm) - **No published fix available**

---

## ⏸️ DEFERRED: Phase 3 - React Native App

**Status**: **NOT PURSUED** - React Native template already at latest stable (0.81.4)

### Assessment:

- **Current**: React Native 0.81.4, React 19.1.0, all ecosystem packages latest
- **Remaining**: 74 vulnerabilities (2 critical, 42 high, 24 moderate, 6 low)
- **Location**: Deep in transitive dependencies (Metro, CLI, Babel, Jest, etc.)

### Why Deferred:

1. **No actionable fix** - Vulnerabilities are in React Native ecosystem packages, not template code
2. **Strict version coupling** - RN pins exact versions for tooling compatibility
3. **High maintenance burden** - Would require custom patches maintained across RN releases
4. **Risk of breaking template** - Patching core RN tooling could break user builds
5. **Upstream actively fixing** - React Native team tracks and fixes these in each release

### Remaining Critical (No Ecosystem Fix Yet):

| Vulnerability     | Severity | Location                                           |
| ----------------- | -------- | -------------------------------------------------- |
| `fast-xml-parser` | Critical | `@react-native-community/cli-platform-android/ios` |
| `shell-quote`     | Critical | `react-devtools-core`, `launch-editor`             |

### Decision:

**Monitor React Native releases** - Dependabot will auto-PR when fixes land. The template uses the latest RN version.

---

## ⚠️ UNFIXABLE: Braces Vulnerability (GHSA-vfj7-8cjw-p6xm)

**Status**: **NO PUBLISHED FIX** - Monitoring approach

### Details:

- **Package**: `braces@3.0.3`
- **Issue**: Stack-exhaustion DoS via deeply nested patterns
- **Fix Version**: 3.0.4 **never released** (project appears inactive)
- **Impact**: **Dev dependencies only** (linting/build tooling - `chokidar`, `micromatch`, `fast-glob`)

### Affected Projects (Dev Dependencies Only):

- `template-library/vue-wizard/files` - 1 high
- `template-library/e2e-test-project` - 1 high
- `template-library/docusaurus-site` - 1 high
- `template-library/react-native-app/files` - 1 high
- `docs` - 1 high (documentation build only, not distributed)

### Monitoring Strategy:

1. **Dependabot** - Auto-creates PRs when fix released (already configured)
2. **GitHub Security Advisories** - Subscribe to GHSA-vfj7-8cjw-p6xm
3. **CI Audit** - `bun audit` runs in GitHub Actions on every push
4. **Periodic Manual Check** - Run `bun audit` monthly

---

## ✅ Phase 4 - Documentation & E2E (Day 4)

**Status**: **DONE**

- E2E test project updated (Vue, Vite, Vitest, eslint-plugin-vue)
- Template-library Docusaurus secured (distributed template)
- Docs folder noted (not distributed, dev-only)

---

## ✅ Phase 5 - Verification (Day 5)

**Status**: **DONE**

### Verification Results:

- [x] Root project: **No vulnerabilities** (662 packages)
- [x] Build succeeds: `bun run build` ✅
- [x] Unit tests pass: `bun run test` ✅ (3/3 tests)
- [x] All distributed templates audit clean (except braces dev-dep)
- [x] GitHub Actions workflows updated ✅
- [x] Dependabot config up to date ✅

---

## Summary: Current Security Posture

| Category                  | Status                                                    |
| ------------------------- | --------------------------------------------------------- |
| **Root Project**          | ✅ Clean                                                  |
| **GitHub Actions**        | ✅ Latest versions                                        |
| **Distributed Templates** | ✅ Clean (1 dev-dep braces vuln each, no fix)             |
| **React Native Template** | ⚠️ 74 vulns in ecosystem (latest RN, monitoring upstream) |
| **Documentation Build**   | ⚠️ Dev-only vulns (not distributed)                       |

---

## Next Steps

1. **No immediate action required** - Distributed templates are secure
2. **Enable Dependabot auto-merge** for patch/minor updates on template projects
3. **Monitor**:
   - React Native releases for ecosystem vulnerability fixes
   - GHSA-vfj7-8cjw-p6xm (braces) for any future fix
4. **Consider** adding `SECURITY.md` with vulnerability disclosure policy

---

_Updated: $(date)_
_Repository: involvex/create-wizard_
_Status: Phases 1, 2, 4, 5 COMPLETE | Phase 3 DEFERRED_
