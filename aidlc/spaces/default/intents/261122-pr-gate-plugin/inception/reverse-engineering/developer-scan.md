## Developer Code Scan Results

### Scan Coverage
- **Analyzed deeply**:
  - `tools/` — `context-loader.ts`, `context-selector.ts`, `context-selector.test.ts`, `rule-library.ts`, `rule-library.test.ts`
  - `fixtures/library/` — `app-structure.md`, `routing.md`, `server-data.md`, `styling.md`, `testing.md`
- **Skimmed only**: none
- **Left out**: the rest of the repo, including the app under `src/` and the AI-DLC install

### Packages Found
- No package manifest was opened. These files are TypeScript modules and Markdown fixtures inside the existing app package.

### Build System
- **Type**: pnpm (workspace brief; manifests not opened)
- **Config Files**: not opened this run
- **Build Dependencies**: not opened this run

### APIs Discovered
- CLI — `tools/context-loader.ts` — argv parse plus `runContextLoader` (JSON on stdout, warnings on stderr)
- In-process — `tools/context-selector.ts` — `selectContext`, `selectionJsonBytes`
- In-process — `tools/rule-library.ts` — `loadRuleLibrary`
- Field-level contracts live in `api-documentation.md`

### Frameworks & Libraries
- TypeScript — version not in these files — loader, selector, and rule reader
- Node built-ins `node:fs/promises`, `node:path`, `Buffer` — read rules and count UTF-8 bytes
- Vitest — version not in these files — colocated unit tests

### Test Coverage
- **Test Directories**: `tools/` (`context-selector.test.ts`, `rule-library.test.ts`)
- **Test Frameworks**: Vitest
- **Coverage Config**: not opened

### Code Quality Indicators
- **Linting**: not opened this run
- **CI/CD**: not opened this run
- **Documentation**: each fixture is short prose plus frontmatter; `--help` prints a one-line usage string. No other docs were in the opened set.

### Technical Debt Signals
- `formatLibraryError` (`tools/context-selector.ts`) has two branches that return the same string.
- A payload at or over the size budget is warned and still printed (`tools/context-loader.ts`). See `api-documentation.md`.
- `tools/rule-library.ts` parses a frontmatter subset itself. `src/lib/rule-check.ts` was not re-opened, so parser parity was not checked.
- Unknown CLI flags are ignored.

## Handoff Summary
- **Intent-relevant finding**: `tools/context-loader.ts` (from the `runContextLoader` entry) loads `fixtures/library` through `loadRuleLibrary` and `selectContext`, then writes `{ selected, index }` JSON. The five fixture files share stage `construction` and agent `developer`, with one tag each. `plugins/` was not opened; the brief states it does not exist.
- **Risks / follow-up**: An under-floor match still exits 0. The size check warns and does not fail the process. Stage and agent matching is a case-sensitive prefix (`entry.startsWith(request)`).
