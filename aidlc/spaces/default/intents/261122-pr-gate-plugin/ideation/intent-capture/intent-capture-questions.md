# Intent Capture Questions

## Sources

- [desc] Initial description: "let's move the cursor for a new intent: implement an Adversarial PR Review Plugin based in the following instructions @INSTRUCTIONS.md:39-44."
- [scope] Workflow-selected scope: `context-loader`.
- [memory:M1] `aidlc/spaces/default/memory/project.md#Corrections`: "Use pnpm instead of npm. (learned 2026-11-21)"

## Q1. [Product] What problem does this first version solve?

We need a clear problem statement before design. Your request points at an adversarial PR review plugin under `plugins/pr-gate/`.

A. As AI speeds up code generation, teams need an automated pre-review gate that blocks merges when acceptance criteria lack tests or when the diff violates loaded ADR rules, before human code review
B. We need a general-purpose code-review chatbot that comments on every PR with LLM-generated advice
C. We need to rebuild the deterministic context loader (`tools/context-loader.ts`) so agents select fewer architecture rules
D. Not yet defined
X. Other (please specify)

[Answer]: Build a valid AI-DLC plugin (`.aidlc-plugin/plugin.json`, `scopes/`, `stages/`, `sensors/`) that takes a `git diff` and the task's `spec.md`, and checks in two stages:

- **100% AC Coverage:** Verifies that every `AC-1..AC-N` in `spec.md` has a corresponding automated test in the diff.
- **ADR Compliance:** Verifies that the diff does not violate the rules loaded by `context-loader.ts` (e.g., making external HTTP calls inside a database transaction, logging unmasked PII/secrets, or introducing backward-incompatible OpenAPI changes).

## Q2. [Product] Who is the primary customer of this plugin?

Who consumes the gate verdict (JSON + Markdown) in day-to-day use?

A. CI / pre-merge pipelines and human reviewers who need a blocking, file-and-line-precise verdict before code review
B. AI-DLC agents mid-Construction that load architecture rules into their prompts
C. External open-source contributors reviewing public forks only
D. Not yet defined
X. Other (please specify)

[Answer]: A

## Q3. [Product] What does success look like for this first version?

Which outcomes should we treat as the bar for done?

A. A valid AI-DLC plugin at `plugins/pr-gate/` (`.aidlc-plugin/plugin.json`, `scopes/`, `stages/`, `sensors/`) with two stages — 100% AC coverage against `spec.md` and ADR compliance using rules from the existing `context-loader.ts` — emitting a structured JSON + Markdown verdict with file/line pinpointing that blocks the gate on violations; validated with `aidlc-plugin-validate.ts` and automated tests against at least 3 diffs (one clean, two with AC/ADR violations); suite green via pnpm
B. The plugin stages only, without `aidlc-plugin-validate.ts` or the three sample-diff tests
C. A spike that sketches the plugin layout, without working AC/ADR checks or a blocking verdict
D. Not yet defined
X. Other (please specify)

[Answer]: A

## Q4. [Product] What should this first version leave out?

The workflow plan is already chosen. This question is only about the product boundary for the first delivery.

A. Leave out rebuilding the Progressive Context Loader (`tools/context-loader.ts`) and its library fixtures — reuse the existing loader for ADR rules; leave out a full hosted CI product beyond the plugin, sample diffs, and local validation
B. Leave out ADR compliance and only ship the AC-coverage stage
C. Leave out nothing from the full Progressive Context Loader & Adversarial Pull Request Gate challenge — rebuild the context loader and the PR gate together now
D. Not applicable — the product boundary is already fixed elsewhere
X. Other (please specify)

[Answer]: A

## Assumption Confirmation

Assumptions still open in the draft artifacts:

1. Communication cadence and channel for this initiative were not set in the answers; they remain open until a later stage needs them.

A. Accept assumptions
B. Convert to follow-up questions

[Answer]: A. Accept assumptions
