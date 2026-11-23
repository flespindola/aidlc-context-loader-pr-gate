## Review

**Verdict:** NOT-READY
**Reviewer:** aidlc-architecture-reviewer-agent
**Date:** 2026-11-22T23:35:14Z
**Iteration:** 1
**Verdict Dictated:** no

### Findings

| ID | Severity | Location | Finding | Required action | Status |
|---|---|---|---|---|---|
| R-01 | Critical | plugins/pr-gate/sensors/pr-gate.md > command | The check library is never what an installed plugin runs. The manifest is `sensors/pr-gate.md` with `id: pr-gate`. Install copies only sensor files named `aidlc-<id>.md` and drops any other name, so this file never lands in the sensor directory. The stage still declares `sensors: [pr-gate]` and `produces: []`. Graph compile rejects a stage that imports a sensor id that was not installed, and the bundled compose hook rolls that install back. The command does not perform a check either: `node --experimental-strip-types plugins/pr-gate/src/pr-gate-entry.ts` exits 0 and prints nothing. That module only exports `runPrGate`. The stage steps never name that function and do not say to stop when `blocking` is true. A gate sensor is also skipped when the stage declares no output, and `default_severity` is `advisory`, so a failure would not stop the gate. The 14 passing tests call the library directly. | Name the sensor manifest `aidlc-pr-gate.md` with `id: pr-gate` so install keeps it. Point its command at an entry the sensor runner can start, and have that entry call `runPrGate` with the diff and spec for the run and stop when the verdict blocks. Name that same call in the stage steps. Give the stage an output the gate can pass in, or another call path that actually receives the diff and spec. | New |
| R-02 | Minor | plugins/pr-gate/src/unified-diff.ts > classifySection | A test file that still exists, but whose hunk only deletes lines, is classified `deletion-only` and does not count as coverage. For spec text `AC-1 remains covered.` and a `.test.ts` hunk that only removes a line, `checkAcCoverage` returns `covered: false` and `blocking: true`. The same file with one line replaced is covered and does not block. Requirements count an automated test when it is added or its content changes, and exclude a deletion of the file, a rename with no content hunk, and a binary hunk. This hunk changes the file and leaves it in place, so a pull request that only removes lines from a test is blocked. | Count a `.test.ts`, `.test.tsx`, or `.spec.ts` path as coverage when the diff changes its content, including a hunk that only deletes lines. Keep a removed file, a rename with no content hunk, and a binary hunk uncovered. | New |

### Validation Tool Results

| Tool | Result | Interpretation |
|---|---|---|
| aidlc engine sensor-traceability --stage code-generation --output-path aidlc/spaces/default/intents/261122-pr-gate-plugin/construction/code-generation/traceability.json | PASS, exit 0. `{"pass":true,"gaps":[],"orphans":[],"missing_from_table":[],"missing_from_upstream_ids":[],"invalid_entries":[],"invalid_targets":[],"findings_count":0}` | Every coverage row has a target file that exists. That does not show the plugin runs those files as a gate. |
| pnpm exec vitest run plugins/pr-gate/tests/ac-coverage.test.ts plugins/pr-gate/tests/adr-compliance.test.ts plugins/pr-gate/tests/verdict.test.ts plugins/pr-gate/tests/pr-gate-entry.test.ts | PASS, exit 0. Vitest 5.1.1: 4 files passed, 14 tests passed. | The library matches the listed tests. Those tests do not install the plugin or execute the sensor command. |
| aidlc plugin validate plugins/pr-gate | PASS, exit 0. `Plugin validation: VALID`. Errors: 0. One warning: vendored compose hook is absent; the validator says no action is required because the build injects the bundled hook. | The package shape is valid. The validator does not check that the sensor file can be discovered or that its command runs the gate. |

### Summary

The acceptance-criteria, rule, and verdict functions are implemented and their 14 tests pass, but the plugin stage and sensor do not call them, and install drops the sensor while the stage still imports it. A test edit that only deletes lines is also reported as missing coverage.
