# Code Summary

## Files created

Plugin package:

- `plugins/pr-gate/.aidlc-plugin/plugin.json`
- `plugins/pr-gate/scopes/pr-gate-check.md`
- `plugins/pr-gate/stages/construction/pr-gate.md`
- `plugins/pr-gate/sensors/pr-gate.md`

Checks:

- `plugins/pr-gate/src/types.ts`
- `plugins/pr-gate/src/unified-diff.ts`
- `plugins/pr-gate/src/ac-coverage.ts`
- `plugins/pr-gate/src/adr-compliance.ts`
- `plugins/pr-gate/src/verdict.ts`
- `plugins/pr-gate/src/pr-gate-entry.ts`

Fixtures and tests:

- `plugins/pr-gate/tests/fixtures/checkable-rule.md`
- `plugins/pr-gate/tests/fixtures/prose-rule.md`
- `plugins/pr-gate/tests/ac-coverage.test.ts`
- `plugins/pr-gate/tests/adr-compliance.test.ts`
- `plugins/pr-gate/tests/verdict.test.ts`
- `plugins/pr-gate/tests/pr-gate-entry.test.ts`

No existing project files were modified. `tools/context-loader.ts`, `fixtures/library/`, `package.json`, `vitest.config.ts`, and `README.md` are unchanged.

## Decisions

- Acceptance-criteria ids are `AC-` plus a positive integer, collected in order, with duplicates kept once. One added or content-changed `.test.ts`, `.test.tsx`, or `.spec.ts` path covers every id. A deletion-only change, a rename with no content hunk, and a `Binary files` hunk do not.
- A returned rule is checkable only when its text has exactly one `diff-check` fence whose body is the single line `forbid <literal>`. The first added line that contains that literal is the only file and line stored for that rule. Any other returned rule is named and not checked.
- The JSON verdict and the Markdown verdict list the same finding strings. An uncovered id is `AC-<n> in spec.md`. A rule violation is `<file>:<line>`. `blocking` is true only when that list is non-empty.
- The entry calls acceptance-criteria coverage, then ADR compliance, then the verdict. It reads the diff and spec it is given. When the diff cannot be parsed, the spec is not text, or the loader call fails, it returns an empty verdict with `blocking: false` and does not throw.
- ADR compliance calls the real `runContextLoader`. It passes `--library <dir>` when the caller gives a library, and no flags otherwise. Both checks share `unified-diff.ts` so a deletion, a rename-only change, and a binary hunk are classified once.

## Test results

`pnpm exec vitest --version` reported `vitest/5.1.1 darwin-arm64 node-v23.3.0` before the new tests were added. `vitest.config.ts` already sets `environment: 'node'` and was not edited.

Unit command:

```bash
pnpm exec vitest run plugins/pr-gate/tests/ac-coverage.test.ts plugins/pr-gate/tests/adr-compliance.test.ts plugins/pr-gate/tests/verdict.test.ts plugins/pr-gate/tests/pr-gate-entry.test.ts
```

Result: 4 files passed, 14 tests passed.

Plugin validate, its own command:

```bash
aidlc plugin validate plugins/pr-gate
```

Result: exit 0. `Plugin validation: VALID`. Errors: 0. One warning: the vendored compose hook is absent, which the validator says needs no action.

No tests were left unrun. The 14 listed tests are the suite. The non-blocking path for a bad diff, a missing spec, or a failed loader call is implemented in the entry and is not a separate listed test.

## Deviations

The validator rejects a scope file named `pr-gate.md` (`scope filename must match pr-gate-<name>.md`). The scope file is `plugins/pr-gate/scopes/pr-gate-check.md` with `name: pr-gate-check`, and the stage lists `pr-gate-check`. Everything else follows the plan.
