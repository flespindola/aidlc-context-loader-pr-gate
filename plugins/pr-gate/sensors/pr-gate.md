---
id: pr-gate
kind: deterministic
command: node --experimental-strip-types plugins/pr-gate/src/pr-gate-entry.ts
default_severity: advisory
description: Run the PR gate entry on the caller-supplied diff and spec
category: code-quality
fire_on: gate
---

# pr-gate sensor

The command is the PR gate entry. It checks the diff and the spec the caller passes and returns one JSON verdict and one Markdown verdict.
