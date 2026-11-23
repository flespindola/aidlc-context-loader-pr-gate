# Scope Document

## Upstream inputs

- `intent-statement` — `aidlc/spaces/default/intents/261122-pr-gate-plugin/ideation/intent-capture/intent-statement.md`
- `feasibility-assessment` — `aidlc/spaces/default/intents/261122-pr-gate-plugin/ideation/feasibility/feasibility-assessment.md`
- `constraint-register` — `aidlc/spaces/default/intents/261122-pr-gate-plugin/ideation/feasibility/constraint-register.md`
- Answers in `scope-definition-questions.md` (Q1–Q3)

## Problem & value

Teams need an automated pre-review gate that blocks merges when acceptance criteria lack matching tests or when a diff violates loaded ADR rules, before human code review. This delivery ships a valid AI-DLC plugin under `plugins/pr-gate/` that checks AC coverage and ADR compliance and emits a blocking, file-and-line-precise verdict. [intent-statement]

## In scope (minimum viable)

Must ship for this piece of work to be done: [Q1]

| Capability | Why it is in |
|---|---|
| Valid AI-DLC plugin at `plugins/pr-gate/` (`.aidlc-plugin/plugin.json`, `scopes/`, `stages/`, `sensors/`) | Core success metric from the intent statement |
| 100% AC coverage stage against `spec.md` (`AC-1..AC-N` ↔ automated tests in the diff) | Explicit Must Have [Q2] |
| ADR compliance stage using rules from existing `context-loader.ts` | Explicit Must Have [Q2]; reuses loader (TC-2) |
| Structured JSON + Markdown verdict with file/line pinpointing that blocks the gate on violations | Explicit Must Have [Q2] |
| `aidlc-plugin-validate.ts` green and automated tests against ≥3 diffs (one clean, two with AC/ADR violations) via pnpm | Explicit success metrics; [memory:M1] |

## Out of scope

| Item | Why it is out |
|---|---|
| Rebuilding `tools/context-loader.ts` and its library fixtures | Intent Q4; Won't Have [Q2]; TC-2 |
| Full hosted CI product / live GitHub/GitLab Actions wiring as a done criterion | Intent Q4; excluded from MVP [Q1]; TC-1 / TC-4 |
| External services or remote rule stores | TC-1 — local plugin layout, loader, fixtures, sample diffs, TypeScript/pnpm only |
| Additional compliance packaging beyond loaded ADR rules | RC-1 — none for this first version |

## Sequencing & deadline

- Must Have slices are AC coverage, ADR compliance, blocking verdict, plugin validate, and three fixture diffs; Won't Have are hosted CI and rebuilding the context loader. [Q2]
- No hard deadline — done when the plugin success bar is met. [Q3] [OC-1]

## Constraints carried forward

- TC-1 … TC-4, OC-1, RC-1 from the constraint register remain binding on this scope.
- Open items from feasibility (exact AC↔test matching rule; exact ADR detectors per loaded rule class) stay open for requirements / domain design; they do not expand or shrink this scope boundary.

## Assumptions & Open Questions

None for the scope boundary itself. AC↔test matching and ADR detector details remain deferred to later stages as noted above.
