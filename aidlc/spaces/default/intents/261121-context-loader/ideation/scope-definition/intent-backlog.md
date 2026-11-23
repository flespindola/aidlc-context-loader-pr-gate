# Intent Backlog

## Upstream inputs

- `intent-statement` — loader-only first version; success metrics for CLI, 2–4 rules, <5 ms, <3 KB, 0 tokens
- `feasibility-assessment` — proceed; ranking and sparse-match behavior deferred to later stages
- `constraint-register` — TC-1..TC-5, OC-1, RC-1
- `scope-document` — MVP is loader + tests only; PR-gate and docs packaging out
- Answers in `scope-definition-questions.md` (Q1–Q3)

## Prioritization method

MoSCoW for a fixed, minimal release: one Must Have proto-Unit delivers the end-to-end loader; everything else is Won't Have for this piece of work. [scope-Q1] [scope-Q2]

## Proto-Units

| ID | Proto-Unit | MoSCoW | Value | Notes |
|---|---|---|---|---|
| PU-1 | Deterministic Tag & Stage Context Loader | Must Have | Agents get a small, deterministic rule set with zero selection-token cost | Includes CLI (`--stage` / `--agent` / `--tags`), selection against `fixtures/library`, compact index, performance/size success bar, and automated tests |
| PU-2 | Adversarial PR Review Plugin | Won't Have (this time) | Later challenge item | Explicitly out of this delivery [intent Q4] [scope-Q1] |
| PU-3 | Loader usage documentation (README packaging) | Won't Have (this time) | Convenience | Not required for done [scope-Q1] |

## Value stream (capability → outcome)

```
Existing rule library (fixtures/library)
        → deterministic tag/stage/agent selection
        → compact index of 2–4 rules
        → leaner agent/tool turns (no RAG, 0 selection tokens)
```

## Sequencing

Single Must Have slice (PU-1). No parallel or follow-on in-scope proto-Units for this piece of work. [scope-Q2]

## Deadline

None — release when PU-1 meets the success bar. [scope-Q3]

## Assumptions & Open Questions

- Exact tie-break / ranking when more than four rules match, and behavior when fewer than two match, are not backlog items of their own; they are acceptance details for PU-1 to resolve in requirements / domain design. [feasibility-assessment]
