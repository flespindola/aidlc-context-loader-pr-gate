# Scope Definition Questions

## Sources

- [desc] Initial description: "let's build the first item from @INSTRUCTIONS.md, which is @INSTRUCTIONS.md (37-38) for the existent @fixtures/library."
- [scope] Workflow-selected scope: `bugfix`.
- intent-statement — loader-only first version; PR-gate plugin deferred
- feasibility-assessment — local fixtures + TypeScript/pnpm only; no hard blockers
- constraint-register — TC-1..TC-5, OC-1, RC-1

## Q1. [Product] What is the minimum viable scope for this first delivery?

A. Ship `tools/context-loader.ts` plus automated tests that prove selection of 2–4 rules from `fixtures/library`, under 5 ms, with a compact index under 3 KB — and nothing else
B. Also include docs-only packaging (README usage) as required for done
C. Also include the PR-gate plugin in the same delivery
D. Not yet defined
X. Other (please specify)

[Answer]: Ship `tools/context-loader.ts` plus automated tests that prove selection of 2–4 rules from `fixtures/library`, under 5 ms, with a compact index under 3 KB — and nothing else

## Q2. [Product] How should we sequence work if anything is deferred after the loader?

A. Value-first: finish the loader end-to-end before any later challenge items
B. Risk-first: spike ranking/edge-case behavior before the full CLI
C. Not applicable — only the loader is in scope for this piece of work
D. Not yet defined
X. Other (please specify)

[Answer]: Not applicable — only the loader is in scope for this piece of work

## Q3. [Delivery] Any hard deadline tied to a specific capability?

A. No hard deadline — done when the loader success bar is met
B. Yes — please specify the date and which capability it binds to
C. Not yet defined
X. Other (please specify)

[Answer]: No hard deadline — done when the loader success bar is met
