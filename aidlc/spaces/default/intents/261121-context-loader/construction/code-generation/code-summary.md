# Code Summary — context-loader

## What was built

Deterministic Tag & Stage Context Loader under `tools/`:

| Path | Role |
|---|---|
| `tools/rule-library.ts` | RuleLibrary — load/parse `fixtures/library/*.md` into typed `RuleDocument`; fail-fast |
| `tools/context-selector.ts` | ContextSelector — OR filters, prefix stage/agent, tag match, score/rank/cap, JSON payload |
| `tools/context-loader.ts` | CLI entry (`--stage`, `--agent`, `--tags`, `--library`) |
| `tools/rule-library.test.ts` | RuleLibrary unit tests |
| `tools/context-selector.test.ts` | ContextSelector + CLI behavior tests |

`package.json` gained script `context-loader` → `node --experimental-strip-types tools/context-loader.ts`.

## How to run

```bash
pnpm run context-loader -- --stage construction --agent developer --tags routing
```

```bash
pnpm exec vitest run tools/rule-library.test.ts tools/context-selector.test.ts
```

## Behavior notes

- Under-floor (&lt;2 matches): JSON on stdout, warning on stderr, exit **0**
- Hard failures (parse/IO): non-zero exit, diagnostics on stderr
- No filters: all loaded rules are candidates; top 4 by filename
- Does not import `src/lib/rule-check.ts`

## Tests run

- Loader: 10 passed
- Existing suite (`rule-check` + home): 16 passed
