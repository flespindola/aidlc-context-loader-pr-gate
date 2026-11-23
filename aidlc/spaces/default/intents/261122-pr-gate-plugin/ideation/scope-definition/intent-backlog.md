# Intent Backlog

## Upstream inputs

- `intent-statement` — PR-gate plugin; AC + ADR stages; JSON/Markdown blocking verdict; validate + ≥3 diffs; pnpm
- `feasibility-assessment` — proceed; AC matching and ADR detectors deferred to later stages
- `constraint-register` — TC-1..TC-4, OC-1, RC-1
- `scope-document` — MVP is plugin + validate + three diffs; hosted CI and loader rebuild out
- Answers in `scope-definition-questions.md` (Q1–Q3)

## Prioritization method

MoSCoW for a fixed, minimal release: one Must Have proto-Unit delivers the end-to-end PR-gate plugin; hosted CI and context-loader rebuild are Won't Have for this piece of work. [Q1] [Q2]

## Proto-Units

| ID | Proto-Unit | MoSCoW | Value | Notes |
|---|---|---|---|---|
| PU-1 | Adversarial PR Review Plugin | Must Have | CI/reviewers get a blocking, file-and-line-precise AC + ADR verdict before human review | Includes `plugins/pr-gate/` package, AC-coverage stage, ADR-compliance stage (via existing context-loader), JSON+Markdown verdict, `aidlc-plugin-validate.ts`, and ≥3 fixture diffs |
| PU-2 | Hosted CI product / live Actions wiring | Won't Have (this time) | Later operationalization | Explicitly out of this delivery [Q1] [Q2] |
| PU-3 | Rebuild Progressive Context Loader | Won't Have (this time) | Already delivered | Reuse existing `tools/context-loader.ts` [Q2] |

## Value stream (capability → outcome)

```
spec.md + git diff (+ existing context-loader rules)
        → AC coverage check + ADR compliance check
        → structured JSON + Markdown verdict (file/line)
        → gate blocks on violations → safer pre-human review
```

## Sequencing

Single Must Have slice (PU-1). No parallel or follow-on in-scope proto-Units for this piece of work. [Q2]

## Deadline

None — release when PU-1 meets the success bar. [Q3]

## Assumptions & Open Questions

- Exact AC↔test matching rule and ADR violation detectors per loaded rule class are not separate backlog items; they are acceptance details for PU-1 to resolve in requirements / domain design. [feasibility-assessment]
