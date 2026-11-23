# RAID Log

## Risks

| ID | Risk | Likelihood | Impact | Owner / mitigation |
|---|---|---|---|---|
| R-1 | Ambiguous AC ↔ test correspondence causes false pass or fail | Medium | High | Decide matching rule in requirements/domain design; cover with fixture diffs |
| R-2 | ADR detectors miss or over-flag relative to loaded rules | Medium | High | Scope detectors to loaded rules; fixture per violation class |
| R-3 | Unsupported or awkward git-diff shapes break pinpointing | Medium | Medium | Document supported shapes; clear failure mode; fixture coverage |
| R-4 | Plugin package fails `aidlc-plugin-validate.ts` late | Low | High | Scaffold to validate contract early; keep validate in the suite |

## Assumptions

| ID | Assumption | Status |
|---|---|---|
| A-1 | Local plugin layout, context loader, fixtures, and sample diffs are sufficient for all v1 inputs | Accepted from feasibility Q1 |
| A-2 | No additional compliance control applies to the plugin beyond loaded ADR rules in v1 | Accepted from feasibility Q2 |
| A-3 | Delivery can proceed without a fixed external deadline or freeze | Accepted from feasibility Q3 |

## Issues

| ID | Issue | Status |
|---|---|---|
| — | None open | — |

## Dependencies

| ID | Dependency | Status |
|---|---|---|
| D-1 | Existing `tools/context-loader.ts` and `fixtures/library` | Present in workspace |
| D-2 | `aidlc-plugin-validate.ts` / AI-DLC plugin tooling | Present under `.cursor/tools/` |
| D-3 | Project TypeScript/pnpm toolchain | Present in workspace |

## Assumptions & Open Questions

- Exact AC-to-test matching rule remains open for requirements/domain design. [assumption]
- Exact ADR violation detectors per loaded rule class remain open for requirements/domain design. [assumption]
