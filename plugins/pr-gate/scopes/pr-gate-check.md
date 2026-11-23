---
name: pr-gate-check
plugin: pr-gate
depth: Standard
keywords:
  - pr-gate
  - pull-request
description: Check one diff and one spec for acceptance-criteria coverage and returned architecture rules
---

# pr-gate-check scope

Use this scope to run the local PR gate. The gate takes the diff and the spec the caller passes. It does not search the repository for either file.
