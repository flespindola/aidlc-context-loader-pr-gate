# Test Results

Run on 2026-11-21 from the repo root. The commands are the ones in `build-instructions.md` and `unit-test-instructions`.

## Build

`pnpm build` exited 0. Vite 8.3.8 built the client (139 modules) and the server (116 modules). Output is under `dist/client` and `dist/server`.

## Tests

Command, run once:

```bash
pnpm exec vitest run src/lib/rule-check.test.ts src/routes/index.test.tsx src/routes/home-and-rules.integration.test.tsx
```

Vitest 5.1.1. Test files 3 passed. Tests 16 passed. Failed 0. Skipped 0. Duration 131ms. Exit 0.

The home-page and integration tests render with `renderToStaticMarkup` in Node (`vitest.config.ts` sets `environment: 'node'`). That is Node evidence. It is not a DOM emulator and not a browser run.

## Browser check

A real Chrome tab opened `http://localhost:3000/`. The document title was "The app is up". The page had one heading, level 1, with that same sentence, and no buttons, links, or other controls.

## Coverage

Classic sets no line-coverage floor. No coverage command was run, and none is required.

## Failures

None.
