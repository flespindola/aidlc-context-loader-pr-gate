# Technology Stack

This run re-read `tools/*.ts` and `fixtures/library/*.md` only. Those files name no new language, framework, or version. The version table is the prior scan (`package.json` not re-opened).

## Languages & Runtimes

| Technology | Version / note | Role |
|---|---|---|
| TypeScript | ^6.0.2 | Application, `tools/`, and test source |
| JavaScript (ESM) | Node via Vite | Runtime for SSR/build tooling |
| CSS | plain CSS | Global layout/typography |

`tools/context-loader.ts` is a Node CLI (`#!/usr/bin/env node`) implemented in TypeScript. It uses Node built-ins only (see `dependencies.md`).

## Frameworks & UI

| Technology | Version | Role |
|---|---|---|
| React | ^19.2.0 | UI components |
| React DOM | ^19.2.0 | Server/static markup in tests; client DOM |
| @tanstack/react-router | 1.170.46 | File-based routing |
| @tanstack/react-start | 1.169.7 | Start/SSR Vite integration |

The opened `tools/` modules do not import React or TanStack.

## Build & Package Management

| Technology | Version | Role |
|---|---|---|
| pnpm | 10.33.2 (packageManager pin) | Install/lockfile; project mandates pnpm over npm |
| Vite | ^8.0.0 | Dev server and production build |
| @vitejs/plugin-react | ^6.0.1 | React plugin |
| TypeScript compiler options | ES2022, strict, bundler resolution | `tsconfig.json` |

## Quality Tooling

| Technology | Version | Role |
|---|---|---|
| Vitest | ^5.1.1 | Unit/integration tests (`environment: 'node'` on the prior scan). This run saw Vitest imports in `tools/*.test.ts` |
| ESLint | ^10.15.0 | Lint via `typescript-eslint` recommended |
| typescript-eslint | ^8.73.0 | TS lint rules |
| Prettier | ^3.10.1 | Format (`semi: false`, `singleQuote: true`) |

## Infrastructure / Cloud

None in-repo on the prior scan (no Docker, CDK, serverless templates, or CI workflows). Local-only per README. CI and infra folders were not re-opened.
