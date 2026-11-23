# Code Structure

## Package / Module Organization

```
game/
├── package.json, pnpm-lock.yaml, tsconfig.json
├── vite.config.ts, vitest.config.ts, eslint.config.js
├── .prettierrc.json, .prettierignore, .npmrc, .cta.json, tsr.config.json
├── README.md, INSTRUCTIONS.md
├── src/
│   ├── router.tsx              # Router factory
│   ├── routeTree.gen.ts        # Generated route tree (do not edit)
│   ├── styles.css              # Global styles
│   ├── lib/
│   │   ├── rule-check.ts       # Rule library frontmatter validator
│   │   └── rule-check.test.ts
│   └── routes/
│       ├── __root.tsx          # Document shell + head
│       ├── index.tsx           # Home route
│       ├── index.test.tsx
│       └── home-and-rules.integration.test.tsx
├── tools/
│   ├── context-loader.ts       # CLI entry
│   ├── context-selector.ts     # Score and cap
│   ├── context-selector.test.ts
│   ├── rule-library.ts         # Read and parse rule files
│   └── rule-library.test.ts
└── fixtures/
    └── library/                # Architecture rule Markdown files
        ├── app-structure.md
        ├── routing.md
        ├── server-data.md
        ├── styling.md
        └── testing.md
```

The `src/` tree and root config list are the prior scan and were not re-opened. `tools/` and `fixtures/library/` were read this run. `plugins/` was not opened; the prior structure recorded it as absent, and this brief states it does not exist.

## File Classification

| Path | Category |
|---|---|
| `src/routes/__root.tsx`, `src/routes/index.tsx` | Controller/Handler (route UI) — prior scan |
| `src/router.tsx`, `src/routeTree.gen.ts` | Configuration / generated wiring — prior scan |
| `src/lib/rule-check.ts` | Service/UseCase (library validation) — prior scan |
| `src/styles.css` | Static/Asset — prior scan |
| `src/**/*.test.ts(x)` | Test — prior scan |
| `tools/context-loader.ts` | Controller/Handler (CLI) |
| `tools/context-selector.ts` | Service/UseCase (selection) |
| `tools/rule-library.ts` | Service/UseCase (library read) |
| `tools/*.test.ts` | Test |
| `fixtures/library/*.md` | Static/Asset (domain rules content) |
| Root `*.config.*`, `package.json`, `tsconfig.json` | Configuration — prior scan |

## Code Patterns

- **ESM** (prior scan): `"type": "module"`; TypeScript `verbatimModuleSyntax`.
- **TanStack file routes** (prior scan): `createFileRoute` / `createRootRoute`; tests excluded from router via `routeFileIgnorePattern: '\\.test\\.'`.
- **CLI module graph** (this run): `context-loader.ts` imports `./context-selector.ts`; that file imports `./rule-library.ts`. Test imports omit the `.ts` suffix. Edges are listed in `dependencies.md`.
- **Async FS read**: `node:fs/promises` + `path`. Default library path is in `api-documentation.md`.
- **Lightweight frontmatter parse** in `tools/rule-library.ts` (not a full YAML engine). Field rules are in `api-documentation.md`.
- **Colocated tests**: Vitest `describe`/`it` next to units. Tools tests create temp dirs under `fixtures/.test-work` and also call the real `fixtures/library` directory.

## Dependency Adjacency (application source)

Prior-scan edges (not re-opened):

- `router.tsx` → `routeTree.gen.ts` → `routes/__root`, `routes/index`
- `routes/__root.tsx` → `styles.css?url`
- `lib/rule-check.ts` → `node:fs/promises`, `node:path`
- Tests → corresponding modules + `vitest` / `react-dom/server`

Tools edges opened this run are in `dependencies.md`.
