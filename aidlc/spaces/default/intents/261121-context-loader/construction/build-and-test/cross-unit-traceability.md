# Cross-Unit Traceability

Zero-Unit / bugfix delivery — single Code Generation package under `construction/code-generation/`.

| Requirement | Built in | Evidence |
|---|---|---|
| FR1.1–FR1.8 | tools/context-loader.ts, tools/context-selector.ts | CG traceability + loader tests |
| FR2.1 | tools/rule-library.ts | rule-library.test.ts |
| FR3.1 | existing suite green | 16 tests passed |
| NFR1–NFR4 | selector + package.json + rule-library | sensor-traceability pass |

No cross-unit boundaries (Units Generation skipped).
