# Code Generation Plan

## Summary

- Builds: a local `plugins/pr-gate/` plugin. A returned rule blocks only when its own text has a `diff-check` fence; otherwise it is named and not checked. A loader or input failure still returns a non-blocking verdict and does not crash.
- Touches: `plugins/pr-gate/` (manifest, scope, stage, sensor, four check modules, tests, one fixture rule). No change to `tools/context-loader.ts`, `fixtures/library/`, `package.json`, or `vitest.config.ts`.
- Tests: 14 unit tests in four files, run with pnpm through vitest on those files only, plus `aidlc plugin validate plugins/pr-gate` as its own command.

No user stories were produced. Each step maps to the requirement it implements. Database, repository, API, and frontend layers are omitted: the plugin has no database, no HTTP API, and no UI. The check results are in-memory objects, created in the business-logic step.

Testing contract: test-after. Implement the check, then write and run its tests. The existing vitest runner is verified before those tests.

## Steps

- [x] Step 1. Plugin package skeleton (FR1.1). Create `plugins/pr-gate/.aidlc-plugin/plugin.json` (`name` `pr-gate`, `dependencies` `["core"]`, contributes `stages/`, `scopes/`, `sensors/`), `plugins/pr-gate/scopes/pr-gate.md`, `plugins/pr-gate/stages/construction/pr-gate.md`, and `plugins/pr-gate/sensors/pr-gate.md`. The stage and scope are the package the validator requires. The sensor manifest points at the entry. This step does not implement a check.

- [x] Step 2. Test runner (FR6.3, NFR2). Confirm `vitest.config.ts` already runs in `node` and do not edit it. Record the unit command in `unit-test-instructions.md`: `pnpm exec vitest run` with the four test files listed there. Record `aidlc plugin validate plugins/pr-gate` as a separate command. Run `pnpm exec vitest --version` to confirm the runner before any new test exists.

- [x] Step 3. Business logic (FR2.1, FR3.1–FR3.4, FR4.1–FR4.5, FR5.1–FR5.3, NFR1, NFR3). Create these modules and these objects:
  - `plugins/pr-gate/src/types.ts` — `AcceptanceCriterion` (`id`, `covered`), `RuleCheck` (`rulePath`, `outcome`, `file`, `line`), `GateVerdict` (`blocking`, `findings`, `notChecked`). One verdict per run. No separate key.
  - `plugins/pr-gate/src/ac-coverage.ts` — collect every `AC-<positive integer>` in the given spec. An automated test is a diff path ending in `.test.ts`, `.test.tsx`, or `.spec.ts` that is added or whose content changes. One such change covers every id. No such change lists every id and blocks. No ids passes. A deletion-only change, a rename-only change, and a binary hunk are not coverage.
  - `plugins/pr-gate/src/adr-compliance.ts` — call `runContextLoader` from `tools/context-loader.ts`. Pass `--library <dir>` when the caller gives a library; otherwise call it with no flags. Do not modify the loader or `fixtures/library/`. Read each returned rule file. A rule is checkable only when its text contains one fence whose info string is `diff-check` and whose body is one line `forbid <literal>`. The first added diff line that contains that literal is a violation: record that file and line, and block. A rule with no such fence is not checked and does not block. A constraint the returned rules do not state, including the three challenge examples, does not block. A rename-only change and a binary hunk are not rule evidence. The first violation is the only file and line stored for that rule.
  - `plugins/pr-gate/src/verdict.ts` — one JSON verdict and one Markdown verdict with the same findings. `blocking` is true only when an acceptance criterion is uncovered or a returned rule is violated. A not-checked rule does not make it true. An acceptance-criteria miss names the id and `spec.md`. A rule violation names the file and line.
  - `plugins/pr-gate/src/pr-gate-entry.ts` — take the diff text and the spec text the caller passes. Do not search the repo for them. Call AcCoverage, then AdrCompliance, then Verdict. Return both texts. Do not modify the diff or the spec. The same inputs produce the same verdict. No language-model call and no network call. When the diff cannot be parsed, the spec is missing, or the loader call fails, still return a verdict, do not crash, and do not block.
  - `plugins/pr-gate/tests/fixtures/checkable-rule.md` — a fixture rule whose text has a `diff-check` fence. Not placed in `fixtures/library/`.
  - `plugins/pr-gate/tests/fixtures/prose-rule.md` — a fixture rule with no fence, so a clean run still has a not-checked name.

- [x] Step 4. Business-logic tests (FR3, FR4, FR5, FR6.1, FR6.2, NFR1, NFR3). After Step 3, write and run the 14 tests in `unit-test-instructions.md`. Use the real loader with the fixture library for the ADR cases. Do not mock a rule result. Run the unit command and leave it green.

- [x] Step 5. Plugin validation (FR1.2, FR6.3). Run `aidlc plugin validate plugins/pr-gate` and leave it green. Do not add a package script.

- [x] Step 6. Notes and traceability (FR1–FR6, NFR1–NFR3). Write `code-summary.md` and `traceability.json` under this stage directory. Map each requirement to the source file that implements it. Do not edit `README.md`.

## Testing Contract

```json
{
  "version": 1,
  "methodology": "test-after",
  "source": "team",
  "ordering": "Implement each applicable testable layer, then write and run that layer's tests.",
  "scope": "context-loader",
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
      "Keep the existing test suite green.",
      "This scope adds no extra new-test floor beyond the selected test strategy."
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
  "input_sha256": "sha256:fb3f9969bbbc5b6c015e0cec43468a9d56f798aaf32e360fb0aad472ebf63e00",
  "contract_sha256": "sha256:cf1a60a029a0c6d2a5674e63913340e71992dda25ea994f6c530bbfa41593d72"
}
```
