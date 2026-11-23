# Code Generation Plan — u1-skeleton

## Summary

- Builds: a local TanStack Start app with one home route and a rule-file check
- Touches: the TanStack Start starter in the repo root with pnpm, `src/routes`, `src/lib`, `fixtures/library`, Vitest, Prettier, and ESLint
- Tests: 16 tests: 6 unit tests for the home page, 8 unit tests for the rule check, 2 integration tests at the boundary

## Testing contract

Methodology is test-after. For each applicable layer, implement it, then write and run that layer's tests. The test runner is bootstrapped before the first test runs. Classic adds no extra coverage floor. Standard volume applies: several unit tests per component, plus integration tests where the page and the check meet.

Database behavior and an API layer do not apply. There is no database and no endpoint other than the home route.

## Steps

- [x] Step 1: Project structure. Scaffold TanStack Start in the repo root with `pnpm dlx @tanstack/cli create . --blank -y --package-manager pnpm --no-git --force`. Keep `.gitignore` and `AGENTS.md` as they are. The blank starter supplies the framework layout (`src/routes`, including the home route) and omits Tailwind, examples, and a test stack. Stories: US1.1, US1.2, US5.1.

- [x] Step 2: Test runner. Add Vitest with pnpm and the smallest config that can import the app. Record the unit command in `unit-test-instructions.md`. Do not write the tests yet. Stories: US4.1.

- [x] Step 3: Rule-file reader. Implement reading `fixtures/library/*.md` only. Each file's identity is its filename. A markdown file anywhere else is not a rule. An empty directory reports that there are no rule files and is not a failed parse. The value kinds of `tags`, `applicable_stages`, and `applicable_agents` stay unspecified; the reader only needs the fields to be present. Stories: US2.1, US2.2, US3.3.

- [x] Step 4: Rule-file reader tests. Write and run the reader cases in `src/lib/rule-check.test.ts`: two filenames are two rules, a file outside `fixtures/library` is not a rule, and an empty directory is not a failed parse. Stories: US2.1, US3.3, US4.2.

- [x] Step 5: Rule check. Implement the check. A file with `tags`, `applicable_stages`, and `applicable_agents` present is valid. A missing field fails, names the file and the field, and is not counted as a rule. Unreadable frontmatter fails, names the file and that the frontmatter is unreadable, and is not counted. A valid file beside it stays valid. The check result is not shown on the home page. Stories: US2.3, US2.4, US3.1, US3.2.

- [x] Step 6: Rule check tests. Write and run the remaining cases in `src/lib/rule-check.test.ts`: missing `tags` names the file and the field, unreadable frontmatter names the file, a valid neighbor stays valid, and the body is accepted as prose without a required heading. Eight unit tests in that file in total. Stories: US2.3, US2.4, US3.1, US3.2, US4.2.

- [x] Step 7: Starter rules. Add `fixtures/library/app-structure.md`, `routing.md`, `server-data.md`, `styling.md`, and `testing.md`. Each has the three frontmatter fields and prose that states the approved one-line rule, why it exists, and a short example. The app-structure example does not add a second top-level source tree. The styling file does not name a styling system. Stories: US2.2, US2.5, US2.6, US2.7, US2.8, US2.9.

- [x] Step 8: Home page. Replace the starter home route so the page shows one heading, "The app is up", inside `main`. The browser tab uses the same sentence. The document language is English. There is no nav, button, image, rule list, sign-in, or remote request. Do not add a CSS framework. Stories: US1.3, US5.2.

- [x] Step 9: Home page tests. Write and run `src/routes/index.test.tsx` with six unit tests: the route responds with that heading, the tab title matches, the page has no gameplay, account, score, or saved progress, there is no sign-in, and the page makes no remote request. Stories: US1.3, US4.3, US5.2.

- [x] Step 10: Boundary. Write and run `src/routes/home-and-rules.integration.test.tsx` with two integration tests: an empty library still lets the home page respond, and an invalid rule file does not change the heading. Stories: US3.3, US4.3.

- [x] Step 11: Local commands. Add Prettier and ESLint with pnpm, and scripts so `pnpm build` finishes and a second build finishes. No deploy script. Stories: US1.2, US5.1.

- [x] Step 12: Documentation. Add a short README with the local build, test, and open-the-page commands. No staging or production steps. Stories: US5.1.

## What this plan does not do

- No gameplay, accounts, scores, saved progress, or a second route.
- No database, cache, queue, or cloud resource.
- No pipeline and no deploy.
- No second source tree and no second styling system.
- The missing-directory case, odd filenames, and any behavior of `applicable_agents` beyond the field being present stay assumptions. They are not steps.

## Testing Contract

```json
{
  "version": 1,
  "methodology": "test-after",
  "source": "team",
  "ordering": "Implement each applicable testable layer, then write and run that layer's tests.",
  "scope": "classic",
  "test_strategy": "standard",
  "project_type": "greenfield",
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
    "strategy": "standard",
    "strategy_volume": [
      "Five to eight tests per component.",
      "Unit tests plus integration tests for key boundaries.",
      "Add E2E, performance, or security tests when requirements demand them."
    ],
    "scope_floor": [
      "Keep the existing test suite green.",
      "This scope adds no extra new-test floor beyond the selected test strategy."
    ],
    "combination_rule": "Apply every selected-strategy obligation and every scope-floor obligation; neither replaces the other, and a targeted scope regression may add the narrowest necessary test type beyond the strategy default."
  },
  "plan_profile": {
    "methodology": "test-after",
    "runner_step": "Bootstrap the minimal test runner/configuration and record the exact unit-scoped command.",
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
      "Bootstrap the minimal test runner/configuration and record the exact unit-scoped command.",
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
  "input_sha256": "sha256:d255f266b8988778c1b946e60f51ed89c105702c0095d48cd3d40e570f986707",
  "contract_sha256": "sha256:b796962cb94cb88ee0841720be4c1981d4f4fe7a4a3cd4feffa23bfa6d04487f"
}
```
