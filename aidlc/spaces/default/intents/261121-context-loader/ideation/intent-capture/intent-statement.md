# Intent Statement

## Problem Statement

Agents and developer tools inject too many architecture rules into every turn, which bloats context and makes mandatory rules non-deterministic when selection relies on RAG. [Q1] This first version solves that with a deterministic tag-and-stage selector that returns only a small applicable set (2–4 rules) without a vector database and without spending tokens on selection. [Q1]

## Target Customer

The primary customers are AI-DLC agents and related developer tooling that need stage- and role-scoped architecture rules with zero LLM cost for selection. [Q2]

## Success Metrics

- A `tools/context-loader.ts` CLI accepts `--stage`, `--agent`, and `--tags`. [Q3]
- It selects 2–4 applicable rules from the existing `fixtures/library/*.md` library in under 5 ms. [Q3]
- It emits a compact index under 3 KB. [Q3]
- Selection uses no vector database and spends 0 tokens. [Q3]
- Automated tests for the loader are green. [Q3]

## Initiative Trigger

Context bloat from injecting full architecture libraries, plus non-determinism from vector RAG for mandatory rules, blocks lean agent turns; a deterministic local selector is needed now for the first slice of that challenge. [Q1] [Q3]

## Initial Scope Signal

- Workflow-selected scope: `bugfix` (workflow-selected) [scope]
- Product boundary for this first version: deliver only the deterministic context loader and its tests; leave out the adversarial PR Review Plugin (`plugins/pr-gate/`), its AC/ADR gate stages, and plugin validation against sample diffs for later work. [Q4]

## Assumptions & Open Questions

None.
