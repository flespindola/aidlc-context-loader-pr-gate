# Code Generation Plan Approval

AI-DLC writes this file when it asks you to approve the plan. To answer here
instead of in chat, write your answer after `[Answer]:` and tell me in chat when you are done.

## Plan Approval

Approve the code plan?

- Builds: deterministic Tag & Stage Context Loader CLI (`tools/context-loader.ts`) with RuleLibrary + ContextSelector
- Touches: `tools/` (new), loader unit tests under `tools/`; leaves `fixtures/library`, `src/lib/rule-check.ts`, and app routes unchanged
- Tests: ~12 Vitest unit tests for library load/select/CLI exit + JSON shape; existing suite stays green

Full plan: aidlc/spaces/default/intents/261121-context-loader/construction/code-generation/code-generation-plan.md
Test instructions: aidlc/spaces/default/intents/261121-context-loader/construction/code-generation/unit-test-instructions.md

[Approval Fingerprint]: sha256:v3:9a76fa1fe967229b0dde658d761c110987ba045c6aa1f971b49b5500601dcdf4
[Planned Source]: 531acb39d1cf317427bca88529d62d5ba5922e876c92bd5f3e11d57a118251ca

- A. Approve Plan
- B. Request Changes
- C. I'll edit the files

[Answer]: A. Approve Plan
