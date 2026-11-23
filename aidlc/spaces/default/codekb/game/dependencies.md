# Dependencies

## External Runtime Dependencies (`package.json` → `dependencies`)

Prior scan; `package.json` not re-opened. The `tools/` files opened this run do not import these packages.

| Package | Declared version | Used for |
|---|---|---|
| @tanstack/react-router | 1.170.46 | Routing API (`createRouter`, `createFileRoute`, `createRootRoute`) |
| @tanstack/react-start | 1.169.7 | Vite plugin `tanstackStart`, Start type registration |
| react | ^19.2.0 | Components / JSX |
| react-dom | ^19.2.0 | DOM/server rendering |

## External Dev Dependencies

Prior scan; manifests not re-opened. This run saw `vitest` imported from `tools/*.test.ts` only.

| Package | Declared version | Used for |
|---|---|---|
| typescript | ^6.0.2 | Types / tooling |
| vite | ^8.0.0 | Build/dev |
| @vitejs/plugin-react | ^6.0.1 | React transform |
| vitest | ^5.1.1 | Tests |
| eslint | ^10.15.0 | Lint |
| typescript-eslint | ^8.73.0 | ESLint TS config |
| prettier | ^3.10.1 | Format |
| @types/node | ^22.10.2 | Node typings for FS tools |
| @types/react | ^19.2.0 | React typings |
| @types/react-dom | ^19.2.0 | React DOM typings |

Lockfile: `pnpm-lock.yaml` present (prior scan). `pnpm.onlyBuiltDependencies`: `esbuild`, `lightningcss`.

## Internal Cross-Module Dependencies

Prior scan (`src/` not re-opened):

| From | To |
|---|---|
| `src/router.tsx` | `src/routeTree.gen.ts` |
| `src/routeTree.gen.ts` | `src/routes/__root.tsx`, `src/routes/index.tsx` |
| `src/routes/__root.tsx` | `src/styles.css` |
| `src/lib/rule-check.test.ts` | `src/lib/rule-check.ts` |
| `src/routes/index.test.tsx` | `src/routes/index.tsx`, `src/routes/__root.tsx` |
| `src/routes/home-and-rules.integration.test.tsx` | `src/lib/rule-check.ts`, `src/routes/index.tsx` |
| `src/lib/rule-check.ts` | `fixtures/library/` (default path; filesystem, not import) |

This run (`tools/` and `fixtures/library/`):

| From | To |
|---|---|
| `tools/context-loader.ts` | `tools/context-selector.ts` |
| `tools/context-selector.ts` | `tools/rule-library.ts` |
| `tools/rule-library.ts` | `node:fs/promises`, `node:path`; default directory `fixtures/library/` (filesystem, not import) |
| `tools/context-loader.ts` | Node `Buffer` via `selectionJsonBytes`; `process` when run directly |
| `tools/context-selector.test.ts` | `tools/context-loader.ts`, `tools/context-selector.ts`, `node:fs/promises`, `node:path`, `vitest`; reads `fixtures/library/` |
| `tools/rule-library.test.ts` | `tools/rule-library.ts`, `node:fs/promises`, `node:path`, `vitest`; reads `fixtures/library/` |

No additional npm packages are imported by the opened `tools/` modules.

## Circular References

None observed among `tools/context-loader.ts`, `tools/context-selector.ts`, and `tools/rule-library.ts`. The prior scan reported none among hand-written application modules (not re-opened).
