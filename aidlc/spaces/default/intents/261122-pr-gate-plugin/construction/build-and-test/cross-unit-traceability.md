# Cross-Unit Traceability

Verdict: pass. `aidlc engine sensor-traceability --stage build-and-test` returned `pass: true` and `uncovered: []`. This run has no Units. Every requirement is built in Code Generation.

| ID | Covered | Owning stage | Target file |
|---|---|---|---|
| FR1.1 | yes | code-generation | plugins/pr-gate/.aidlc-plugin/plugin.json |
| FR1.2 | yes | code-generation | plugins/pr-gate/stages/construction/pr-gate.md |
| FR2.1 | yes | code-generation | plugins/pr-gate/src/pr-gate-entry.ts |
| FR3.1 | yes | code-generation | plugins/pr-gate/src/ac-coverage.ts |
| FR3.2 | yes | code-generation | plugins/pr-gate/src/ac-coverage.ts |
| FR3.3 | yes | code-generation | plugins/pr-gate/src/ac-coverage.ts |
| FR3.4 | yes | code-generation | plugins/pr-gate/src/ac-coverage.ts |
| FR4.1 | yes | code-generation | plugins/pr-gate/src/adr-compliance.ts |
| FR4.2 | yes | code-generation | plugins/pr-gate/src/adr-compliance.ts |
| FR4.3 | yes | code-generation | plugins/pr-gate/src/adr-compliance.ts |
| FR4.4 | yes | code-generation | plugins/pr-gate/src/adr-compliance.ts |
| FR4.5 | yes | code-generation | plugins/pr-gate/src/adr-compliance.ts |
| FR5.1 | yes | code-generation | plugins/pr-gate/src/verdict.ts |
| FR5.2 | yes | code-generation | plugins/pr-gate/src/verdict.ts |
| FR5.3 | yes | code-generation | plugins/pr-gate/src/verdict.ts |
| FR6.1 | yes | code-generation | plugins/pr-gate/tests/pr-gate-entry.test.ts |
| FR6.2 | yes | code-generation | plugins/pr-gate/tests/pr-gate-entry.test.ts |
| FR6.3 | yes | code-generation | plugins/pr-gate/tests/ac-coverage.test.ts |
| NFR1 | yes | code-generation | plugins/pr-gate/src/pr-gate-entry.ts |
| NFR2 | yes | code-generation | plugins/pr-gate/src/adr-compliance.ts |
| NFR3 | yes | code-generation | plugins/pr-gate/src/pr-gate-entry.ts |

Uncovered: none.
