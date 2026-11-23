# Feasibility Questions

## Sources

- [desc] Initial description: "let's move the cursor for a new intent: implement an Adversarial PR Review Plugin based in the following instructions @INSTRUCTIONS.md:39-44."
- [scope] Workflow-selected scope: `context-loader`.
- [memory:M1] `aidlc/spaces/default/memory/project.md#Corrections`: "Use pnpm instead of npm. (learned 2026-11-21)"
- [Q1] Intent Capture Q1: Build a valid AI-DLC plugin that takes a git diff and spec.md and checks 100% AC coverage plus ADR compliance via context-loader.ts
- [Q2] Intent Capture Q2: Primary customers are CI / pre-merge pipelines and human reviewers
- [Q3] Intent Capture Q3: Valid plugins/pr-gate/ with two stages, JSON+Markdown verdict, aidlc-plugin-validate.ts, ≥3 diffs, suite green via pnpm
- [Q4] Intent Capture Q4: Reuse existing context-loader; leave out rebuilding it and a full hosted CI product

## Q1. [Architecture] What must this plugin integrate with in this first version?

We need to know which existing systems are in or out before judging technical risk.

A. Only this repo’s AI-DLC plugin layout, the existing `tools/context-loader.ts` + `fixtures/library`, `aidlc-plugin-validate.ts`, local git diffs / sample fixtures, and the TypeScript/pnpm toolchain — no hosted CI or external services in v1
B. Also a live GitHub/GitLab API and a running CI provider that must be called for every check
C. Also a remote vector or document store for ADR rules (instead of the local context loader)
D. Not yet defined
X. Other (please specify)

[Answer]: A

## Q2. [Architecture] Are there regulatory or compliance constraints for this first version?

The plugin reviews diffs for AC/ADR rules locally; say if compliance changes that.

A. None for this first version (no PCI/HIPAA/SOC2/data-residency requirements on the plugin itself beyond the ADR rules it already loads)
B. Yes — name which regimes apply (please specify under Other if not listed)
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Q3. [Delivery] Any budget, timeline, or organizational blockers we must plan around?

A. No hard blockers — deliver when the plugin, validation, and three sample-diff tests meet the success bar
B. Yes — fixed deadline or change freeze (please specify)
C. Competing priority that could pause this work (please specify)
D. Not yet defined
X. Other (please specify)

[Answer]: A

## Assumption Confirmation

Assumptions still open in the draft artifacts:

1. Exact AC-to-test matching rule (how a test “corresponds” to `AC-N`) is not yet fixed; it must be decided in requirements or domain design.
2. Exact ADR violation detectors for each loaded rule class are not yet fixed beyond the examples in the challenge brief; they must be decided in requirements or domain design.

A. Accept assumptions
B. Convert to follow-up questions

[Answer]: A. Accept assumptions
