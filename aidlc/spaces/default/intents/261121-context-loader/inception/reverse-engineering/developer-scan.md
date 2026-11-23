## Developer Code Scan Results

### Scan Coverage
- **Analyzed deeply**:
  - ./package.json
  - ./pnpm-lock.yaml (dependency lock presence)
  - ./tsconfig.json
  - ./vite.config.ts
  - ./vitest.config.ts
  - ./eslint.config.js
  - ./.prettierrc.json
  - ./.prettierignore
  - ./.npmrc
  - ./.cta.json
  - ./tsr.config.json
  - ./README.md
  - ./INSTRUCTIONS.md
  - ./src/router.tsx
  - ./src/routeTree.gen.ts
  - ./src/styles.css
  - ./src/lib/rule-check.ts
  - ./src/lib/rule-check.test.ts
  - ./src/routes/__root.tsx
  - ./src/routes/index.tsx
  - ./src/routes/index.test.tsx
  - ./src/routes/home-and-rules.integration.test.tsx
  - ./fixtures/library/app-structure.md
  - ./fixtures/library/routing.md
  - ./fixtures/library/server-data.md
  - ./fixtures/library/styling.md
  - ./fixtures/library/testing.md
- **Skimmed only**:
  - ./.vscode/settings.json
  - ./AGENTS.md (AI-DLC marked sections only; not application source)
- **Left out**:
  - ./node_modules/
  - ./dist/
  - ./.cursor/
  - ./aidlc/
  - ./.git/
  - ./fixtures/.test-work/

### Packages Found
- game — application (private) — TypeScript / React — Local TanStack Start app with a single home route and a Markdown rule-library checker

### Build System
- **Type**: pnpm + Vite (TanStack Start plugin)
- **Config Files**: package.json, pnpm-lock.yaml, vite.config.ts, tsconfig.json, tsr.config.json, vitest.config.ts, eslint.config.js, .prettierrc.json, .npmrc, .cta.json
- **Build Dependencies**: single package; no workspace packages; `#/*` and `@/*` path aliases map to `./src/*`

### APIs Discovered
- Browser/SSR page surface — TanStack Start file routes (`/`) — 1 route (no REST/GraphQL API modules)
- Library function API — `src/lib/rule-check.ts` — `checkRuleLibrary(libraryDirectory?)` returns rules/failures/report (no CLI yet)
- Missing (intent gap) — `tools/context-loader.ts` — not present; no stage/agent/tag selector CLI

### Frameworks & Libraries
- @tanstack/react-router — 1.170.46 — file-based routing
- @tanstack/react-start — 1.169.7 — SSR/start plugin for Vite
- react / react-dom — ^19.2.0 — UI
- vite — ^8.0.0 — bundler/dev server
- vitest — ^5.1.1 — unit/integration tests
- typescript — ^6.0.2 — typecheck
- eslint + typescript-eslint — ^10.15.0 / ^8.73.0 — lint
- prettier — ^3.10.1 — format
- @vitejs/plugin-react — ^6.0.1 — React transform

### Test Coverage
- **Test Directories**: colocated under `src/lib/` and `src/routes/`
- **Test Frameworks**: Vitest (node environment); React rendered via `react-dom/server` `renderToStaticMarkup`
- **Coverage Config**: absent (no coverage thresholds in vitest.config.ts)

### Code Quality Indicators
- **Linting**: ESLint (typescript-eslint recommended) at `eslint.config.js`; ignores dist, node_modules, generated route tree, aidlc, .cursor, fixtures/.test-work
- **CI/CD**: none found (no `.github/workflows`)
- **Documentation**: README.md (run/build/test); INSTRUCTIONS.md (assessment brief naming context-loader); rule files are prose with YAML frontmatter

### Technical Debt Signals
- Intent target `tools/context-loader.ts` does not exist; selection by stage/agent/tags is unimplemented
- `checkRuleLibrary` validates required frontmatter keys but does not parse/filter tag or stage values for loading
- Generated `src/routeTree.gen.ts` is eslint-disabled / ts-nocheck (expected for TanStack Router codegen)
- No CI pipeline; quality relies on local `pnpm lint` / vitest commands in README

## Handoff Summary
- **Intent-relevant finding**: The brownfield app already ships `fixtures/library/*.md` with the required YAML keys (`tags`, `applicable_stages`, `applicable_agents`) and `src/lib/rule-check.ts` that lists Markdown files and validates those keys. There is no `tools/` directory and no deterministic selector CLI (`tools/context-loader.ts`) that accepts `--stage` / `--agent` / `--tags` and returns 2–4 rules plus a compact index — that is the gap this intent must close.
- **Risks / follow-up**: Preserve the existing frontmatter contract and rule-check behavior; new loader should read the same library without inventing a second rule schema. Home page is intentionally decoupled from the library (integration tests assert heading stability when library is empty or broken).
