# Unit Test Instructions

## Framework

Vitest, already configured in `vitest.config.ts` with `environment: 'node'`. Do not change that file. Package manager is pnpm. No new test runner and no coverage threshold: this scope adds no line-coverage floor. Build and Test does not apply an 80% floor to this work.

## How to run

Unit command, these files only:

```bash
pnpm exec vitest run plugins/pr-gate/tests/ac-coverage.test.ts plugins/pr-gate/tests/adr-compliance.test.ts plugins/pr-gate/tests/verdict.test.ts plugins/pr-gate/tests/pr-gate-entry.test.ts
```

Plugin validate, its own command:

```bash
aidlc plugin validate plugins/pr-gate
```

Confirm the runner before the first new test with `pnpm exec vitest --version`.

## Coverage

Minimal strategy: one verifiable test per requirement behavior below, and one happy path inside each component's file. No project line-coverage floor. The unit command does not collect coverage.

## Tests

14 unit tests.

`plugins/pr-gate/tests/ac-coverage.test.ts`

1. Happy path. A spec with two `AC-<n>` ids and a diff that adds one `.test.ts` file covers every id.
2. The same ids and a diff with no added or changed test list every id and block.
3. A spec with no `AC-<n>` id passes.
4. A deletion-only test path, a rename-only test path, and a binary hunk do not count as coverage.

`plugins/pr-gate/tests/adr-compliance.test.ts`

5. Happy path. The fixture rule's `diff-check` fence forbids a literal, the diff adds that literal, and the result names that file and line and blocks.
6. The prose fixture has no fence, so it is named not-checked and does not block.
7. A diff that logs a secret does not block when no returned rule states that constraint.
8. The check calls `runContextLoader` with the fixture library and does not modify that library.

`plugins/pr-gate/tests/verdict.test.ts`

9. Happy path. The JSON and the Markdown list the same findings.
10. An uncovered id names the id and `spec.md`. A rule violation names the file and line.
11. `blocking` is true for an uncovered id or a rule violation, and false when the only extra row is not-checked.

`plugins/pr-gate/tests/pr-gate-entry.test.ts`

12. Happy path. The entry uses the diff and spec it is given, leaves both unchanged, and does not read the repo to find them.
13. Three diffs against the fixture library: a clean diff passes and still names the prose rule as not-checked; a diff with ids and no test change blocks; a diff that contains the forbidden literal blocks.
14. The same diff, spec, and library produce the same verdict on a second run.

## Mocking

Do not mock the loader and do not stub a selected rule. Pass the fixture directory to the real `runContextLoader`. The acceptance-criteria and verdict tests may call their own functions with strings; they do not need the loader.

## Test data

Diffs and specs are strings in the test files. The two rule documents live in `plugins/pr-gate/tests/fixtures/`. They are not copies into `fixtures/library/`.
