# Requirements Analysis Questions

## Sources

- [desc] Initial description: "let's move the cursor for a new intent: implement an Adversarial PR Review Plugin based in the following instructions @INSTRUCTIONS.md:39-44."
- [scope] Workflow-selected scope: `context-loader`.
- intent-statement — plugin at `plugins/pr-gate/`, AC coverage, ADR check via `context-loader.ts`, blocking JSON + Markdown verdict
- scope-document — Must Have slices; loader rebuild and hosted CI are out
- feasibility-assessment — AC-to-test match and ADR detectors left open
- INSTRUCTIONS.md — challenge item 2 names example violations (HTTP inside a database transaction, unmasked PII in logs, backward-incompatible OpenAPI)

## Q1. [Product] How should a test in the diff count as covering an acceptance criterion?

The gate blocks when `spec.md` lists `AC-1` through `AC-N` and the diff has no matching automated test. The match rule is still open, and a loose rule will let a change pass without a real test.

A. The test's name or a comment in the diff contains the exact id, such as `AC-1`
B. `spec.md` itself names the test file or test name for each AC id
C. Any added or changed test in the diff covers every AC id in `spec.md`
D. Not yet defined
X. Other (please specify)

[Answer]: C

## Q2. [Product] Which architecture rules can block the gate?

The challenge brief names three example violations: an external HTTP call inside a database transaction, unmasked PII or secrets in logs, and a backward-incompatible OpenAPI change. The context loader returns two to four rules from `fixtures/library/`, which today are app structure, routing, server data, styling, and testing.

A. Only the rules the context loader returns for that run, checked against what those rule files actually say
B. Always the three examples in the challenge brief, whether or not the loader returned them
C. The loaded rules and the three examples
D. Not yet defined
X. Other (please specify)

[Answer]: A

## Q3. [Product] What should the gate do when a loaded rule has no check the code can apply?

Some rules are prose. A check that cannot see a violation should not invent one, and a silent skip can hide a miss.

A. Do not block. Say in the verdict that the rule was not checked
B. Block, and say the rule could not be checked
C. Not yet defined
X. Other (please specify)

[Answer]: A 
