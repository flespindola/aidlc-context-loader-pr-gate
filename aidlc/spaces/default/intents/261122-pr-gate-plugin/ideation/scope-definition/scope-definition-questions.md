# Scope Definition Questions

## Sources

- [desc] Initial description: "let's move the cursor for a new intent: implement an Adversarial PR Review Plugin based in the following instructions @INSTRUCTIONS.md:39-44."
- [scope] Workflow-selected scope: `context-loader`.
- [memory:M1] `aidlc/spaces/default/memory/project.md#Corrections`: "Use pnpm instead of npm. (learned 2026-11-21)"
- intent-statement — PR-gate plugin first version; reuse context-loader; leave out hosted CI
- feasibility-assessment — local plugin + loader + validate/tests feasible; no hard blockers
- constraint-register — TC-1..TC-4, OC-1, RC-1

## Q1. [Product] What is the minimum viable scope for this first delivery?

A. Ship a valid `plugins/pr-gate/` AI-DLC plugin (plugin.json, scopes, stages, sensors) with AC-coverage and ADR-compliance stages, JSON+Markdown verdict that blocks on violations, `aidlc-plugin-validate.ts` green, and automated tests against ≥3 diffs (one clean, two with AC/ADR violations) via pnpm — and nothing else
B. Also require a live GitHub/GitLab Actions workflow wired into a real repository as part of done
C. Also rebuild `tools/context-loader.ts` in the same delivery
D. Not yet defined
X. Other (please specify)

[Answer]: A

## Q2. [Product] How should we prioritize / sequence the plugin slices?

A. Must: AC coverage stage + ADR compliance stage + structured blocking verdict + plugin validate + three fixture diffs; Won't: hosted CI product, rebuilding the context loader
B. Must: AC coverage only; defer ADR compliance and validate to a later delivery
C. Must: plugin scaffolding only; defer working checks to later
D. Not yet defined
X. Other (please specify)

[Answer]: A

## Q3. [Delivery] Any hard deadline tied to a specific capability?

A. No hard deadline — done when the plugin success bar is met
B. Yes — please specify the date and which capability it binds to
C. Not yet defined
X. Other (please specify)

[Answer]: A
