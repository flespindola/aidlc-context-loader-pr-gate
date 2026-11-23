# Feasibility Questions

## Sources

- [desc] Initial description: "let's build the first item from @INSTRUCTIONS.md, which is @INSTRUCTIONS.md (37-38) for the existent @fixtures/library."
- [scope] Workflow-selected scope: `bugfix`.
- [memory:M1] `aidlc/spaces/default/memory/project.md#Corrections`: "Use pnpm instead of npm. (learned 2026-11-21)"
- [Q1] Intent Capture Q1: Agents and tools inject too many architecture rules; need a deterministic selector returning 2–4 rules without RAG or extra tokens
- [Q2] Intent Capture Q2: Primary customers are AI-DLC agents and related developer tooling
- [Q3] Intent Capture Q3: `tools/context-loader.ts` with `--stage`/`--agent`/`--tags`, 2–4 rules from `fixtures/library/*.md`, under 5 ms, index under 3 KB, no vector DB, 0 tokens, tests green
- [Q4] Intent Capture Q4: Leave out the adversarial PR Review Plugin and plugin validation for later work

## Q1. [Architecture] What must this loader integrate with in this first version?

We need to know which existing systems are in or out before judging technical risk.

A. Only the local `fixtures/library/*.md` files and this project's TypeScript/pnpm toolchain — no external services in v1
B. Also a remote document store or vector index that the loader must call at runtime
C. Also CI/CD or PR systems (the adversarial gate path) in this same delivery
D. Not yet defined
X. Other (please specify)

[Answer]: Only the local `fixtures/library/*.md` files and this project's TypeScript/pnpm toolchain — no external services in v1

## Q2. [Architecture] Are there regulatory or compliance constraints for this first version?

A local deterministic selector is planned; say if compliance changes that.

A. None for this first version (no PCI/HIPAA/SOC2/data-residency requirements on the loader itself)
B. Yes — name which regimes apply (please specify under Other if not listed)
C. Not yet defined
X. Other (please specify)

[Answer]: None for this first version (no PCI/HIPAA/SOC2/data-residency requirements on the loader itself)

## Q3. [Delivery] Any budget, timeline, or organizational blockers we must plan around?

A. No hard blockers — deliver when the loader and its tests meet the success bar
B. Yes — fixed deadline or change freeze (please specify)
C. Competing priority that could pause this work (please specify)
D. Not yet defined
X. Other (please specify)

[Answer]: No hard blockers — deliver when the loader and its tests meet the success bar
