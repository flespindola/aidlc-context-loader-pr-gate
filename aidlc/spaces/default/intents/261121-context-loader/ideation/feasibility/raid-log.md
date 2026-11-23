# RAID Log

## Risks

| ID | Risk | Likelihood | Impact | Owner / mitigation |
|---|---|---|---|---|
| R-1 | Ambiguous ranking when more than four rules match | Medium | Medium | Decide deterministic order in requirements/domain design; cover with tests |
| R-2 | Ambiguous empty/partial match behavior when fewer than two rules match | Medium | Low | Decide return contract in requirements/domain design; cover with tests |
| R-3 | Malformed or incomplete YAML frontmatter in a library file | Low | Medium | Fail fast in the loader; assert frontmatter shape in tests |

## Assumptions

| ID | Assumption | Status |
|---|---|---|
| A-1 | Local filesystem access to `fixtures/library` is sufficient for all v1 inputs | Accepted from feasibility Q1 |
| A-2 | No compliance control applies to the loader binary or its local rule files in v1 | Accepted from feasibility Q2 |
| A-3 | Delivery can proceed without a fixed external deadline or freeze | Accepted from feasibility Q3 |

## Issues

| ID | Issue | Status |
|---|---|---|
| — | None open | — |

## Dependencies

| ID | Dependency | Status |
|---|---|---|
| D-1 | Existing `fixtures/library/*.md` rule files with usable frontmatter | Present in workspace |
| D-2 | Project TypeScript/pnpm toolchain | Present in workspace |

## Assumptions & Open Questions

- Ranking when more than four rules match remains open for requirements/domain design. [assumption]
- Behavior when fewer than two rules match remains open for requirements/domain design. [assumption]
