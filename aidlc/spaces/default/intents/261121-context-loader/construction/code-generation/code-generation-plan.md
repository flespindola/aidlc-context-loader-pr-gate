# Code Generation Plan — context-loader

## Summary

- Builds: deterministic Tag & Stage Context Loader CLI (`tools/context-loader.ts`) with RuleLibrary + ContextSelector
- Touches: `tools/` (new), loader unit tests under `tools/`; leaves `fixtures/library`, `src/lib/rule-check.ts`, and app routes unchanged
- Tests: ~12 Vitest unit tests for library load/select/CLI exit + JSON shape; existing suite stays green

## Design pins (accepted review risks)

- **rule-check stance (R-01):** RuleLibrary owns a separate frontmatter parse into typed `RuleDocument` under `tools/` (do not import/wrap `src/lib/rule-check.ts`). Leave `rule-check` and its tests unchanged.
- **No filters (R-02):** When `--stage`, `--agent`, and `--tags` are all omitted, every successfully loaded rule is a candidate; ranking still applies (score 0 for all → filename order → top 4).

## Steps

- [x] Step 1: Project structure. Add `tools/` with modules for RuleLibrary and ContextSelector plus CLI entry `tools/context-loader.ts` runnable via `pnpm exec tsx` or the project’s existing TypeScript execution path (prefer `pnpm exec vitest`-compatible imports; if a run script is required, add only a `package.json` script named for the loader without changing other person’s files beyond that). Requirements: FR1, NFR3.

- [x] Step 2: Verify test runner. Confirm Vitest already runs (`vitest.config.ts` present). Record the exact unit-scoped command in `unit-test-instructions.md`. Do not write new tests yet. Requirements: FR3.

- [x] Step 3: RuleLibrary — implement. Load `fixtures/library/*.md`, parse YAML frontmatter into `RuleDocument` (`filename`, `path`, `tags`, `applicableStages`, `applicableAgents`, `body`). Normalize scalar or list to trimmed string sets. Fail fast on unreadable/missing required fields (non-zero process exit when invoked through CLI; throw/result error for library API). Requirements: FR2, FR2.1.

- [x] Step 4: RuleLibrary — tests. Write and run happy-path + fail-fast cases in `tools/rule-library.test.ts` (or colocated under `tools/`). Requirements: FR2.1, FR3; happy path for RuleLibrary.

- [x] Step 5: ContextSelector — match/rank. Implement OR across provided filters; case-sensitive prefix for stage/agent; exact tag intersection; dimension score; ascending filename tie-break; cap 4; no-filters → all candidates. Requirements: FR1.1–FR1.4, FR1.8, NFR2.

- [x] Step 6: ContextSelector — emit + exit. Build JSON stdout (`selected` paths/ids, frontmatter summary, compact `index` &lt; 3 KB); stderr for diagnostics; exit 0 on completed selection including under-floor (stderr warn); non-zero only on hard failures. Assert selection duration budget in tests (&lt; 5 ms intent / NFR1). Requirements: FR1.5–FR1.7, NFR1.

- [x] Step 7: ContextSelector — tests. Write and run cases covering OR filter, prefix match, ranking/cap, under-floor exit 0 + warning, no-filters candidate set, index size. Requirements: FR1.2–FR1.7, FR3; happy path for ContextSelector.

- [x] Step 8: CLI wiring. Wire `tools/context-loader.ts` argv (`--stage`, `--agent`, `--tags`) to ContextSelector; keep diagnostics on stderr. Requirements: FR1.1, FR1.6.

- [x] Step 9: Existing suite green. Run the existing rule-check / home tests already in the repo (scoped command listed in unit-test-instructions) and keep them green. Requirements: FR3.1.

- [x] Step 10: Traceability + code-summary. Fill `traceability.json` and `code-summary.md` for this stage after code lands.

## What this plan does not do

- No PR-gate plugin, no README packaging as a done criterion, no changes to `fixtures/library` content, no wiring into AI-DLC agent turns.
- No database, API routes, or frontend changes.

## Testing Contract

```json
{
  "version": 1,
  "methodology": "test-after",
  "source": "team",
  "ordering": "Implement each applicable testable layer, then write and run that layer's tests.",
  "scope": "bugfix",
  "test_strategy": "minimal",
  "project_type": "brownfield",
  "applicable_notes": [
    {
      "layer": "org",
      "text": "We treat tests as a first-class deliverable in every Bolt. The specific\nmethodology (TDD, BDD, ATDD, or classic test-after) is affirmed at\npractices-discovery and recorded in `team.md` under this heading with explicit\n`Methodology` and `Ordering` fields; Code Generation resolves those fields\nindependently from coverage, tooling, and scope notes.\n\nWhen no posture has been affirmed, our default per scope is:\n- **Methodology**: test-after\n- **Ordering**: implement each applicable testable layer, then write and run\n  that layer's tests.\n- `mvp`, `enterprise`, `feature`, `infra` add an 80% line-coverage\n  floor and CI execution before merge.\n- `bugfix`, `security-patch` add a targeted regression for the specific\n  bug/vulnerability and require the existing suite to remain green.\n- `express` uses the Minimal strategy: requirement-driven unit tests (one per\n  requirement, with a happy-path floor per component); existing tests remain\n  green.\n- `poc`, `refactor`, `workshop`, `classic` add no extra new-test floor and require the\n  existing suite to remain green.\n\nThe active `Test Strategy` still applies in every scope and determines test\nvolume/types. Scope floors are additive; they never reduce or replace the\nselected strategy.\n\nBuild and Test verifies defined coverage floors and affirmed quality targets;\nthey may not be weakened to make a step pass.\n\nAffirm a stricter posture in `team.md` if the team commits to one."
    },
    {
      "layer": "team",
      "text": "- **Methodology**: test-after\n- **Methodology evidence**: The person chose to implement a layer, then write and run that layer's tests. The active test strategy is Standard. Classic adds no extra new-test floor; the existing suite stays green.\n- **Ordering**: Implement each applicable testable layer, then write and run that layer's tests.\n- **Coverage**: Classic adds no extra new-test floor. The existing suite stays green.\n- **Tooling**: Formatters, linters, and test runners follow the project configuration once it exists (Prettier and ESLint for style).\n- **Test types**: Standard volume: several tests per component, mostly unit tests, plus integration tests at important boundaries."
    }
  ],
  "obligations": {
    "strategy": "minimal",
    "strategy_volume": [
      "One verifiable test per requirement at the narrowest effective level.",
      "At least one happy-path unit test per component.",
      "Unit tests are the default; a bugfix/security scope floor may require an integration or E2E regression when that is the narrowest level that reproduces the defect."
    ],
    "scope_floor": [
      "Include a targeted regression for the bug or vulnerability.",
      "Keep the existing test suite green."
    ],
    "combination_rule": "Apply every selected-strategy obligation and every scope-floor obligation; neither replaces the other, and a targeted scope regression may add the narrowest necessary test type beyond the strategy default."
  },
  "plan_profile": {
    "methodology": "test-after",
    "runner_step": "Verify the existing test runner/configuration and record the exact unit-scoped command.",
    "runner_ready_before_first_test": true,
    "testable_layers": [
      "Data model / database behavior",
      "Repository / data access",
      "Business logic",
      "API / endpoint",
      "Frontend behavior"
    ],
    "steps": [
      "Project structure and production configuration skeleton.",
      "Verify the existing test runner/configuration and record the exact unit-scoped command.",
      "Data model / database behavior - implement.",
      "Data model / database behavior - write and run its tests after implementation.",
      "Repository / data access - implement.",
      "Repository / data access - write and run its tests after implementation.",
      "Business logic - implement.",
      "Business logic - write and run its tests after implementation.",
      "API / endpoint - implement.",
      "API / endpoint - write and run its tests after implementation.",
      "Frontend behavior - implement.",
      "Frontend behavior - write and run its tests after implementation.",
      "Environment/build configuration.",
      "Documentation and traceability."
    ]
  },
  "input_sha256": "sha256:5dc567bdf223933e7fb3053c7fa1124423fb0c2e9bed820b13242e517339ae43",
  "contract_sha256": "sha256:85ee12a7f124a8153947f42513e0a9f4380d6b51e4eff8fab9813f5e898b1b64"
}
```
