# Domain Design Questions

## Sources

- `requirements` — `aidlc/spaces/default/intents/261122-pr-gate-plugin/inception/requirements-analysis/requirements.md`
- `architecture` — `aidlc/spaces/default/codekb/game/architecture.md`
- `component-inventory` — `aidlc/spaces/default/codekb/game/component-inventory.md`
- FR4.1 — call the existing context loader; do not change it or the home app

## Q1. [Architect] How should the new plugin be split into building blocks?

The check behavior is already fixed. The open choice is how many pieces of code own it. The existing context loader, selector, and rule library stay as they are and are not new components.

A. One component, PrGate, owns the acceptance-criteria check, the ADR check, and the verdict
B. Three components: AcCoverage, AdrCompliance, and Verdict. A thin entry calls them in that order
C. Two components: RuleChecks owns both checks, and Verdict owns the JSON and Markdown result
D. Not yet defined
X. Other (please specify)

[Answer]: B
