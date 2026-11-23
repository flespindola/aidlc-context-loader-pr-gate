# Intent Statement

## Problem Statement

As AI speeds up code generation, teams need an automated pre-review gate that blocks merges when acceptance criteria lack matching automated tests or when a diff violates loaded ADR rules, before human code review. [Q1] This first version builds a valid AI-DLC plugin under `plugins/pr-gate/` that takes a `git diff` and the task's `spec.md`, and checks in two stages: 100% AC coverage (`AC-1..AC-N` each have a corresponding automated test in the diff) and ADR compliance against rules loaded by `context-loader.ts`. [Q1]

## Target Customer

The primary customers are CI / pre-merge pipelines and human reviewers who need a blocking, file-and-line-precise verdict before code review. [Q2]

## Success Metrics

- A valid AI-DLC plugin at `plugins/pr-gate/` includes `.aidlc-plugin/plugin.json`, `scopes/`, `stages/`, and `sensors/`. [Q3]
- Two stages run: 100% AC coverage against `spec.md`, and ADR compliance using rules from the existing `context-loader.ts`. [Q3]
- The plugin emits a structured JSON + Markdown verdict with file/line pinpointing and blocks the gate on violations. [Q3]
- The plugin validates with `aidlc-plugin-validate.ts` and has automated tests against at least 3 diffs (one clean, two with AC/ADR violations). [Q3]
- The test suite is green via pnpm. [Q3] [memory:M1]

## Initiative Trigger

AI-accelerated code generation increases merge risk without an automated pre-review gate for AC test coverage and ADR compliance; this plugin is the next slice after the deterministic context loader. [Q1] [Q3]

## Initial Scope Signal

- Workflow-selected scope: `context-loader` (workflow-selected) [scope]
- Product boundary for this first version: deliver the adversarial PR review plugin, its sample-diff tests, and local validation; leave out rebuilding the Progressive Context Loader (`tools/context-loader.ts`) and its library fixtures — reuse the existing loader for ADR rules; leave out a full hosted CI product beyond the plugin, sample diffs, and local validation. [Q4]

## Assumptions & Open Questions

None.
