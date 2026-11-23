# Scope Document

## Upstream inputs

- `intent-statement` — `aidlc/spaces/default/intents/261121-context-loader/ideation/intent-capture/intent-statement.md`
- `feasibility-assessment` — `aidlc/spaces/default/intents/261121-context-loader/ideation/feasibility/feasibility-assessment.md`
- `constraint-register` — `aidlc/spaces/default/intents/261121-context-loader/ideation/feasibility/constraint-register.md`
- Answers in `scope-definition-questions.md` (Q1–Q3)

## Problem & value

Agents and tooling inject too many architecture rules into every turn. This delivery ships a deterministic tag-and-stage selector so only a small applicable set (2–4 rules) is returned, with no vector database and no tokens spent on selection. [intent-statement]

## In scope (minimum viable)

Must ship for this piece of work to be done: [scope-Q1]

| Capability | Why it is in |
|---|---|
| Deterministic context loader CLI (`tools/context-loader.ts`) accepting `--stage`, `--agent`, and `--tags` | Core success metric from the intent statement |
| Selection against the existing `fixtures/library/*.md` library | Local-only integration; success bar is measured on that library |
| Return of 2–4 applicable rules with a compact index under 3 KB | Success metrics |
| Selection completing in under 5 ms, with 0 tokens and no vector DB | Success metrics and TC-2 / TC-3 |
| Automated tests that prove the selection and performance/size bar | Explicit success metric; required for done |

## Out of scope

| Item | Why it is out |
|---|---|
| Adversarial PR Review Plugin (`plugins/pr-gate/`), AC/ADR gate stages, and plugin validation against sample diffs | Deferred by intent (Q4) and TC-5; not part of minimum viable scope [scope-Q1] |
| README / docs packaging as a required done criterion | Explicitly excluded from MVP [scope-Q1] |
| External services, cloud APIs, or remote rule stores | TC-1 — local fixtures and this project's TypeScript/pnpm toolchain only |
| Compliance / regulatory packaging for the loader itself | RC-1 — none for this first version |

## Sequencing & deadline

- Only the loader is in scope for this piece of work; there is no deferred in-scope capability to sequence after it. [scope-Q2]
- No hard deadline — done when the loader success bar is met. [scope-Q3] [OC-1]

## Constraints carried forward

- TC-1 … TC-5, OC-1, RC-1 from the constraint register remain binding on this scope.
- Open items from feasibility (deterministic ranking when >4 matches; behavior when <2 matches) stay open for requirements / domain design; they do not expand or shrink this scope boundary.

## Assumptions & Open Questions

None for the scope boundary itself. Ranking and sparse-match behavior remain deferred to later stages as noted above.
