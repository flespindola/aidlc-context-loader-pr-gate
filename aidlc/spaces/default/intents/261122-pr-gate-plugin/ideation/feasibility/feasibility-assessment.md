# Feasibility Assessment

## Upstream inputs

- `intent-statement` — `aidlc/spaces/default/intents/261122-pr-gate-plugin/ideation/intent-capture/intent-statement.md`

## Summary

Building a local adversarial PR-gate AI-DLC plugin that reuses the existing `tools/context-loader.ts` is **feasible** for this first version. Integration is limited to this repo’s plugin layout, the local context loader and rule library, `aidlc-plugin-validate.ts`, sample git diffs, and the TypeScript/pnpm toolchain — with no hosted CI, no external services, no additional compliance regime on the plugin itself, and no hard delivery blockers. [Q1] [Q2] [Q3]

## Technical viability

| Area | Assessment | Basis |
|---|---|---|
| Plugin package shape | Viable — AI-DLC already ships plugin create/validate tooling (`.aidlc-plugin/plugin.json`, scopes, stages, sensors) that this delivery can target under `plugins/pr-gate/` | Intent success bar; Feasibility Q1 |
| AC coverage check | Viable — parse `spec.md` for `AC-1..AC-N` and scan the provided git diff / test files for corresponding automated tests; unit-testable with fixture diffs | Intent Q1/Q3; Feasibility Q1 |
| ADR compliance check | Viable — reuse existing `tools/context-loader.ts` + `fixtures/library` for loaded rules; scan the diff for rule violations with file/line pinpointing | Intent Q1/Q3/Q4; Feasibility Q1 |
| Verdict / gate blocking | Viable — emit structured JSON + Markdown and fail the gate when violations exist; cover with clean vs violating fixtures | Intent Q3; Feasibility Q1 |
| Validation & tests | Viable — run `aidlc-plugin-validate.ts` and at least three fixture diffs (one clean, two with AC/ADR violations); suite via pnpm | Intent Q3; [memory:M1]; Feasibility Q1 |
| Out of scope risk | Contained — rebuilding the context loader and a full hosted CI product are deferred | Intent Q4; Feasibility Q1 |

## Risk analysis

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Ambiguous AC ↔ test correspondence (false pass/fail) | Medium | High | Define explicit matching rules in requirements/domain design; cover with positive and negative fixture diffs |
| ADR violation detectors miss or over-flag patterns | Medium | High | Scope detectors to the loaded rules’ concrete examples; fixtures for each known violation class |
| Diff / path parsing edge cases (renames, binary, partial hunks) | Medium | Medium | Document supported diff shapes; fail clearly on unsupported input; fixture coverage |
| Plugin layout rejected by `aidlc-plugin-validate.ts` | Low | High | Scaffold against current validate contract early; keep validate green in the suite |

## Recommendation

**Proceed.** No technical, regulatory, or organizational blocker prevents delivering the PR-gate plugin, local validation, and sample-diff tests.

## Assumptions & Open Questions

- Exact AC-to-test matching rule (how a test “corresponds” to `AC-N`) is not yet fixed; it must be decided in requirements or domain design. [assumption]
- Exact ADR violation detectors for each loaded rule class are not yet fixed beyond the examples in the challenge brief; they must be decided in requirements or domain design. [assumption]
