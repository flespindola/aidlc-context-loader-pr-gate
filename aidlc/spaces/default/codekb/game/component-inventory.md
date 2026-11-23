# Component Inventory

## Context Loader

- **Path**: `tools/context-loader.ts`
- **Responsibility**: Parse CLI flags and print the selector result as JSON, with warnings on stderr
- **Depends on**: `tools/context-selector.ts` (`selectContext`, `selectionJsonBytes`)
- **Consumers**: direct Node run; `tools/context-selector.test.ts`
- **Contract**: `api-documentation.md`

## Context Selector

- **Path**: `tools/context-selector.ts`
- **Responsibility**: Load rules, score them against stage, agent, and tags, and return a bounded selection plus an index
- **Depends on**: `tools/rule-library.ts`
- **Consumers**: `tools/context-loader.ts`; `tools/context-selector.test.ts`
- **Contract**: `api-documentation.md`

## Rule Library

- **Path**: `tools/rule-library.ts`
- **Responsibility**: Read a directory of Markdown rule files into typed documents, or return structured frontmatter errors
- **Depends on**: Node `fs/promises`, `path`
- **Consumers**: `tools/context-selector.ts`; `tools/rule-library.test.ts`
- **Contract**: `api-documentation.md`
- **Note**: Distinct from `Rule Library Checker` below, which was not re-opened

## Rule Library Checker

- **Path**: `src/lib/rule-check.ts`
- **Responsibility**: List Markdown rule files, parse/validate required YAML frontmatter keys, return rules and failure report
- **Depends on**: Node `fs/promises`, `path`
- **Consumers**: `rule-check.test.ts`, `home-and-rules.integration.test.tsx` (prior scan)
- **Exports**: `checkRuleLibrary`, `RULE_LIBRARY_DIRECTORY`, types `Rule`, `RuleFailure`, `RuleCheckResult`
- **Note**: Prior scan. Not re-opened. Not called by `tools/`

## Home Route

- **Path**: `src/routes/index.tsx`
- **Responsibility**: File route `/` rendering a single heading; sets page title
- **Depends on**: `@tanstack/react-router` (`createFileRoute`)
- **Consumers**: generated route tree; unit and integration tests
- **Notes**: Prior scan. No data fetch; no rule-library coupling. Not re-opened

## Root Route Shell

- **Path**: `src/routes/__root.tsx`
- **Responsibility**: HTML document shell, head meta/links, Scripts; loads global CSS
- **Depends on**: `@tanstack/react-router`, `../styles.css?url`
- **Consumers**: generated route tree
- **Notes**: Prior scan. Not re-opened

## Router Factory

- **Path**: `src/router.tsx` (+ generated `src/routeTree.gen.ts`)
- **Responsibility**: Create TanStack router with scroll restoration and preload settings; register router type
- **Depends on**: `@tanstack/react-router`, generated route tree
- **Consumers**: TanStack Start runtime
- **Notes**: Prior scan. Not re-opened

## Architecture Rule Library

- **Path**: `fixtures/library/*.md`
- **Responsibility**: Human-authored architecture rules. Each file has scalar frontmatter `tags`, `applicable_stages`, and `applicable_agents`, then a short prose body
- **Files** (re-read this run):

| File | tags | applicable_stages | applicable_agents | Rule in one line |
|---|---|---|---|---|
| `app-structure.md` | structure | construction | developer | New code stays in the TanStack Start layout; no second top-level source tree |
| `routing.md` | routing | construction | developer | Each screen is a route; this phase has the home page at `src/routes/index.tsx` |
| `server-data.md` | server | construction | developer | Server-only data stays in server functions; the home page does not fetch |
| `styling.md` | presentation | construction | developer | One styling approach; this phase does not name or add a second |
| `testing.md` | testing | construction | developer | Tests are written after the code they cover |

- **Depends on**: none (content only)
- **Consumers**: `loadRuleLibrary` (this run); `checkRuleLibrary` (prior scan)

## Package Build Configuration

- **Path**: root configs (`package.json`, `vite.config.ts`, `vitest.config.ts`, `tsconfig.json`, `eslint.config.js`, Prettier, `.cta.json`)
- **Responsibility**: Tooling for pnpm install, Vite/TanStack Start build/dev, Vitest, lint/format, TypeScript strictness
- **Depends on**: declared npm dependencies
- **Consumers**: developers and local scripts
- **Notes**: Prior scan. Not re-opened
