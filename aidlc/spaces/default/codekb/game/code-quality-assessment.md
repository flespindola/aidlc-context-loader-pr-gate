# Code Quality Assessment

Ratings use good / fair / poor per the analysis guide. Rows marked prior were not re-checked against `src/`.

## Summary Scores

| Dimension | Rating | Notes |
|---|---|---|
| Naming clarity | good | Prior: `checkRuleLibrary`, route names. This run: `loadRuleLibrary`, `selectContext`, `runContextLoader` match their jobs |
| Function size | good | Prior helpers were small. This run: `parseFrontmatter` is the longest tools function and stays linear |
| Error handling | good | Library errors are structured and fail the whole load. CLI hard-fail returns 1. See the size-check note under Technical Debt |
| Test presence | good | Prior home and rule-check suites, plus Vitest suites beside the selector and the rule reader |
| Duplication | fair | Prior: temp-library helpers duplicated across two `src/` test files. This run: `makeLibrary` / temp-dir cleanup is duplicated again in `tools/context-selector.test.ts` and `tools/rule-library.test.ts` |
| Dead code | fair | `formatLibraryError` has two branches that return the same string |

## Testing

- **Framework**: Vitest, node environment (environment from the prior scan)
- **Suites (prior scan)**: `src/lib/rule-check.test.ts`, `src/routes/index.test.tsx`, `src/routes/home-and-rules.integration.test.tsx`
- **Suites (this run)**:
  - `tools/rule-library.test.ts` — loads `fixtures/library`, missing required field, unreadable frontmatter
  - `tools/context-selector.test.ts` — OR scoring against the real library, case-sensitive stage prefix, cap of four with filename tie-break, no-filter ordering, under-floor JSON with exit 0, byte size under the budget, malformed library exit 1
- **Coverage tooling**: not configured on the prior scan; not re-opened
- **README test command** (prior scan): `pnpm exec vitest run` listing the three `src/` files. The `tools/` suites were not in that note
- **Test-only signal**: the selector happy path comments an under-5 ms target and asserts under 50 ms. The production function records `durationMs` and does not enforce it

## Linting & Formatting

- ESLint + typescript-eslint recommended; Prettier with single quotes / no semicolons (prior scan)
- Generated `routeTree.gen.ts` and AI-DLC/fixture scratch paths ignored (prior scan)
- Scripts: `pnpm lint`, `pnpm format`, `pnpm format:check` (prior scan)
- Linter config was not re-opened. Opened tools sources use the same no-semicolon, single-quote style

## CI/CD

- No `.github/workflows` or other pipeline configs on the prior scan
- Those folders were not re-opened. Quality gate remains the prior local-only finding

## Documentation Quality

- README covers install, build, test, and `pnpm dev` (prior scan)
- INSTRUCTIONS.md describes assessment challenges (prior scan; not re-opened)
- Rule files re-read this run are readable prose with the three frontmatter keys (`component-inventory.md`)
- CLI usage is the stderr line from `--help` (`api-documentation.md`)

## Technical Debt

1. **Size budget is a warning** — at or over the limit the CLI still prints JSON and returns 0. Contract: `api-documentation.md`.
2. **Two frontmatter readers** — `tools/rule-library.ts` was read; `src/lib/rule-check.ts` was not. Parity is unverified.
3. **No CI** — prior scan; not re-opened.
4. **Test helper duplication** — temp-library setup in the two `tools/` test files, in addition to the prior `src/` duplication.
5. **Ignored argv** — unknown flags and missing option values are not rejected (`api-documentation.md`).

## Strengths

- Strict TypeScript settings (prior scan)
- Clear separation between UI and rule-library validation (prior scan)
- Fixture files match the three keys the tools reader requires
- Selector tests cover the real library, the cap, the under-floor exit, and a malformed file
