# Unit Test Instructions — context-loader

## Framework

Vitest is already configured at the repo root (`vitest.config.ts`). New loader tests live under `tools/` and import the library/selector modules directly. No browser install and no remote service.

## Command

Run only this work’s loader tests (after the test files exist):

```bash
pnpm exec vitest run tools/rule-library.test.ts tools/context-selector.test.ts
```

Keep the existing suite green with this separate command (do not fold into the loader-only command):

```bash
pnpm exec vitest run src/lib/rule-check.test.ts src/routes/index.test.tsx src/routes/home-and-rules.integration.test.tsx
```

## Coverage

Bugfix / Minimal: no project-wide line-coverage floor for this Unit-scoped run. Build and Test checks any whole-project floor on the full suite. Include a targeted regression for missing deterministic selection (the loader itself).

## What the tests cover

- `tools/rule-library.test.ts`: load valid fixtures; fail-fast on missing required frontmatter / unreadable frontmatter (FR2.1); happy path for RuleLibrary.
- `tools/context-selector.test.ts`: OR filter; stage/agent prefix match; tag exact match; score + filename tie-break + top 4; under-floor exit 0 with stderr warning; no filters → all candidates then top 4 by filename; compact index under 3 KB; selection timing budget (NFR1).

## Test data

Prefer the real `fixtures/library/*.md` for happy-path selection. Use temporary directories/files for malformed frontmatter and sparse-match cases. Do not modify the five starter rule files.

## Mocking

Do not mock the filesystem for happy-path library loads against `fixtures/library`. Do not call a vector DB or network. Stub only what is needed for isolating stderr/exit in CLI-level assertions if tested via a function API rather than spawning a process.
