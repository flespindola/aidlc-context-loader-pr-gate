# Intent Capture Questions

## Sources

- [desc] Initial description: "let's build the first item from @INSTRUCTIONS.md, which is @INSTRUCTIONS.md (37-38) for the existent @fixtures/library."
- [scope] Workflow-selected scope: `bugfix`.
- [memory:M1] `aidlc/spaces/default/memory/project.md#Corrections`: "Use pnpm instead of npm. (learned 2026-11-21)"

## Q1. [Product] What problem does this first version solve?

We need a clear problem statement before design. Your request points at a deterministic tag-and-stage context loader for an existing rule library.

A. Agents and tools inject too many architecture rules into every turn; we need a deterministic selector that returns only the few applicable rules (2–4) without RAG or extra tokens
B. We need a reusable CLI that scores and ranks every rule in `fixtures/library` for later plugin work
C. We need a full AI-DLC plugin that reviews pull requests against ADRs and acceptance criteria
D. Not yet defined
X. Other (please specify)

[Answer]: Agents and tools inject too many architecture rules into every turn; we need a deterministic selector that returns only the few applicable rules (2–4) without RAG or extra tokens

## Q2. [Product] Who is the primary customer of this loader?

Who consumes the selected rules and compact index in day-to-day use?

A. AI-DLC agents and related developer tooling that need stage- and role-scoped architecture rules with zero LLM cost for selection
B. Human architects reviewing ADRs in a browser
C. CI jobs that block merges (the adversarial PR gate), as the only consumer in this first version
D. Not yet defined
X. Other (please specify)

[Answer]: AI-DLC agents and related developer tooling that need stage- and role-scoped architecture rules with zero LLM cost for selection

## Q3. [Product] What does success look like for this first version?

Which outcomes should we treat as the bar for done?

A. A `tools/context-loader.ts` CLI accepting `--stage`, `--agent`, and `--tags`; selecting 2–4 applicable rules from `fixtures/library/*.md` in under 5 ms; emitting a compact index under 3 KB; no vector DB; 0 tokens for selection; automated tests green
B. The loader plus the adversarial PR-gate plugin and three validation diffs all ship together
C. A spike that proves selection is possible, without performance or size bounds
D. Not yet defined
X. Other (please specify)

[Answer]: A `tools/context-loader.ts` CLI accepting `--stage`, `--agent`, and `--tags`; selecting 2–4 applicable rules from `fixtures/library/*.md` in under 5 ms; emitting a compact index under 3 KB; no vector DB; 0 tokens for selection; automated tests green

## Q4. [Product] What should this first version leave out?

The workflow plan is already chosen. This question is only about the product boundary for the first delivery.

A. Leave out the adversarial PR Review Plugin (`plugins/pr-gate/`), its AC/ADR gate stages, and plugin validation against sample diffs; those are later work
B. Leave out automated tests for the loader itself
C. Leave out nothing from the full Progressive Context Loader & Adversarial Pull Request Gate challenge — build items 1–3 now
D. Not applicable — the product boundary is already fixed elsewhere
X. Other (please specify)

[Answer]: Leave out the adversarial PR Review Plugin (`plugins/pr-gate/`), its AC/ADR gate stages, and plugin validation against sample diffs; those are later work

## Assumption Confirmation

Assumptions still open in the draft artifacts:

1. Communication cadence and channel for this initiative were not set in the answers; they remain open until a later stage needs them.

A. Accept assumptions
B. Convert to follow-up questions

[Answer]: A. Accept assumptions
