# Constraint Register

## Technical constraints

| ID | Constraint | Source |
|---|---|---|
| TC-1 | Runtime integration is limited to this repo’s AI-DLC plugin layout, existing `tools/context-loader.ts` + `fixtures/library`, `aidlc-plugin-validate.ts`, local git diffs / sample fixtures, and the TypeScript/pnpm toolchain — no hosted CI or external services in v1 | [Q1] |
| TC-2 | ADR compliance must reuse the existing context loader; rebuilding the Progressive Context Loader and its library fixtures is out of this delivery | Intent Q4; [Q1] |
| TC-3 | Package management uses pnpm, not npm | [memory:M1] |
| TC-4 | A full hosted CI product beyond the plugin, sample diffs, and local validation is out of this delivery | Intent Q4; [Q1] |

## Organizational constraints

| ID | Constraint | Source |
|---|---|---|
| OC-1 | No hard budget, timeline, or organizational blockers — deliver when the plugin, validation, and three sample-diff tests meet the success bar | [Q3] |

## Regulatory constraints

| ID | Constraint | Source |
|---|---|---|
| RC-1 | None for this first version (no PCI/HIPAA/SOC2/data-residency requirements on the plugin itself beyond the ADR rules it already loads) | [Q2] |

## Assumptions & Open Questions

None.
