# Constraint Register

## Technical constraints

| ID | Constraint | Source |
|---|---|---|
| TC-1 | Runtime integration is limited to local `fixtures/library/*.md` and this project's TypeScript/pnpm toolchain — no external services in v1 | [feasibility-Q1] |
| TC-2 | Selection must be deterministic, with no vector database and 0 tokens spent on selection | Intent Q1/Q3 |
| TC-3 | Selection must complete in under 5 ms and emit a compact index under 3 KB | Intent Q3 |
| TC-4 | Package management uses pnpm, not npm | [memory:M1] |
| TC-5 | Adversarial PR-gate plugin, AC/ADR gate stages, and plugin validation diffs are out of this delivery | Intent Q4 |

## Organizational constraints

| ID | Constraint | Source |
|---|---|---|
| OC-1 | No hard budget, timeline, or organizational blockers — deliver when the loader and tests meet the success bar | [feasibility-Q3] |

## Regulatory constraints

| ID | Constraint | Source |
|---|---|---|
| RC-1 | None for this first version (no PCI/HIPAA/SOC2/data-residency requirements on the loader itself) | [feasibility-Q2] |

## Assumptions & Open Questions

None.
