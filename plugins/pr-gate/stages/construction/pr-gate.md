---
slug: pr-gate
name: PR Gate
plugin: pr-gate
phase: construction
execution: CONDITIONAL
condition: Execute when the pr-gate scope is selected for the current workflow.
lead_agent: aidlc-developer-agent
support_agents: []
mode: inline
produces: []
consumes: []
requires_stage: []
sensors:
  - pr-gate
scopes:
  - pr-gate-check
inputs: The git diff and spec text the caller passes to the PR gate entry
outputs: One JSON verdict and one Markdown verdict for that run
---

# PR Gate

Run the PR gate on the diff and the spec the caller supplies. Do not search the repository for either input.

## Steps

1. Read the diff text and the spec text given for this run.
2. Check acceptance-criteria coverage, then the architecture rules the context loader returns, then build one verdict.
3. Report the JSON verdict and the Markdown verdict. Leave the diff and the spec unchanged.
