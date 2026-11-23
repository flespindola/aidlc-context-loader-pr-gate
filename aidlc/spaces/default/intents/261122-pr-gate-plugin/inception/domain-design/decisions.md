# Architecture Decisions

## Upstream inputs

- `requirements` — `aidlc/spaces/default/intents/261122-pr-gate-plugin/inception/requirements-analysis/requirements.md`
- Q1 answer B in `domain-design-questions.md`

## ADR-001: Three check owners and a thin entry

### Status
Proposed

### Context
The plugin must check acceptance criteria, check architecture rules, and emit a blocking verdict. Those three concerns can live in one component or in several. The requirements already fix the behaviour. The open choice was only the split. [requirements]

### Decision
We will write three components, AcCoverage, AdrCompliance, and Verdict, and a thin entry, PrGateEntry, that calls them in that order. The entry owns the plugin package and the sequence. It does not apply a check rule.

### Consequences
- Each check can be tested without the other.
- The entry is the only place that knows the order, so a change to the order is one edit.
- More files than a single component, for a plugin that still ships as one package.
- Security: the entry does not log the diff. A finding cites a file and a line. The plugin does not send the diff anywhere. There is no compliance regime on the plugin beyond the rules the loader returns.

### Alternatives Rejected
- One component owns all three concerns. Rejected because the person chose separate owners so the match rule and the rule check can change apart.
- Two components, with both checks in one and the verdict in another. Rejected because the person kept the acceptance-criteria check and the ADR check apart.

## ADR-002: The context loader stays outside the plugin

### Status
Proposed

### Context
ADR compliance needs the rules the existing context loader returns. That loader, its selector, and the rule library already exist. The requirements forbid changing them. [requirements]

### Decision
AdrCompliance calls the existing context loader as an external dependency. The loader, the selector, and the rule library are not components this plugin writes. The home app is not a component of this plugin.

### Consequences
- The plugin breaks if the loader's result shape changes, and we do not control that shape here.
- We do not take on a second implementation of rule loading.
- Security: the loader reads local files only. This plugin does not add a network call or a remote rule store.

### Alternatives Rejected
- Treat the loader as a component we own. Rejected because the requirements say to call it and not rebuild it, and the person kept it out of the new building blocks.

## ADR-003: The checks do not call each other

### Status
Proposed

### Context
Something must pass the acceptance-criteria result and the ADR result into the verdict. Either the verdict calls the checks, or the entry does.

### Decision
PrGateEntry calls AcCoverage, then AdrCompliance, then Verdict. The three do not call each other. Verdict only receives the two results.

### Consequences
- The call graph is a star. There is no cycle.
- Verdict can be tested with two fixed results and no loader.
- The entry must understand both result shapes.

### Alternatives Rejected
- Verdict calls the two checks. Rejected because the person said the thin entry calls them in that order.
