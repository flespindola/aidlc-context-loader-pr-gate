# Test Results

## Build

`pnpm exec tsc --noEmit` exited 0.

`pnpm build` exited 0. Vite wrote the client and server bundles in about 75ms and 49ms.

## Tests

| Command | Total | Passed | Failed | Skipped |
|---|---|---|---|---|
| `pnpm exec vitest run plugins/pr-gate/tests/ac-coverage.test.ts plugins/pr-gate/tests/adr-compliance.test.ts plugins/pr-gate/tests/verdict.test.ts plugins/pr-gate/tests/pr-gate-entry.test.ts` | 14 | 14 | 0 | 0 |
| `pnpm exec vitest run` | 40 | 40 | 0 | 0 |
| `aidlc plugin validate plugins/pr-gate` | 1 | 1 | 0 | 0 |

The scoped command reported 4 files passed. The full suite reported 9 files passed, which includes those 4 plus the tests that were already in the project. No assertion failed. No test was skipped.

Plugin validate printed `Plugin validation: VALID`, 0 errors, and one warning that the vendored compose hook is absent. The validator says that warning needs no action.

## Coverage

No coverage report. This scope sets no line-coverage floor, and the unit command does not collect coverage.

## Target Verification Matrix

| Target ID | Source | Expected | Actual | Evidence | Owning Stage | Verdict |
|---|---|---|---|---|---|---|
| BT-NFR1 | requirements.md NFR1 | Same inputs, same verdict, no language model | 14 passed, including the second identical run | Scoped vitest command above | build-and-test | Met |
| BT-NFR2 | requirements.md NFR2 | Local run, no network call | No `fetch` or URL call under `plugins/pr-gate/src` | Search of that directory | build-and-test | Met |
| BT-NFR3 | requirements.md NFR3 | Diff and spec are not modified | 14 passed, including the unchanged-input test | Scoped vitest command above | build-and-test | Met |
| BT-UNIT | unit-test-instructions | 14 plugin tests pass | 14 passed | Scoped vitest command above | build-and-test | Met |
| BT-SUITE | code-generation-plan Testing Contract | Existing suite stays green | 40 passed | `pnpm exec vitest run` | build-and-test | Met |
| BT-VALIDATE | unit-test-instructions | Plugin validate exits 0 | Exit 0, VALID | `aidlc plugin validate plugins/pr-gate` | build-and-test | Met |
| BT-TYPES | tsconfig.json | `tsc --noEmit` exits 0 | Exit 0 | `pnpm exec tsc --noEmit` | build-and-test | Met |
| BT-BUILD | build-instructions.md | `pnpm build` exits 0 | Exit 0 | `pnpm build` | build-and-test | Met |
