# Business Overview

## Purpose

`game` is a local TanStack Start application used as the brownfield base for an AI Engineering assessment. The live product surface is a single home page that confirms the app is running. Beside the UI, the repo carries a Markdown architecture-rule library under `fixtures/library/` that documents construction conventions for this app. A CLI in `tools/context-loader.ts` selects a small set of those rules for a stage, an agent, and tags.

## Domain Context

The loader selects applicable rules from that library by stage, agent role, and tags, using filesystem reads and in-process scoring. This run confirmed the CLI, the selector, and the rule reader. Behavior is in `api-documentation.md`. A plugins tree was not part of this scan.

## Key Functionality (as implemented today)

| Capability | Status | Evidence |
|---|---|---|
| Serve home page "The app is up" | Present | prior scan: `src/routes/index.tsx`, root shell `__root.tsx` (not re-opened) |
| Validate rule-file frontmatter | Present | prior scan: `src/lib/rule-check.ts` + tests (not re-opened) |
| Ship five starter architecture rules | Present | `fixtures/library/*.md` (re-read this run; tags in `component-inventory.md`) |
| Select rules by stage, agent, and tags | Present | `tools/context-loader.ts`; contract in `api-documentation.md` |
| Compact JSON index for callers | Present | stdout payload from the loader; size rule in `api-documentation.md` |

## Stakeholders / Consumers

- Local developer running `pnpm dev` / `pnpm build` (prior scan; commands not re-opened)
- Vitest suites that treat the library as a filesystem fixture, including the two suites under `tools/`
- Callers of `context-loader` that read JSON on stdout and warnings on stderr

## Non-Goals of Current Codebase

- Gameplay, accounts, scores, remote data, or multi-route product features
- Deployed production service (README: local-only; second build is the finish line)
