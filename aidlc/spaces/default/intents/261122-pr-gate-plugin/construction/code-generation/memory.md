<!-- INVARIANT: examples are single-line HTML comments so a fresh template parses to total=0 (MEMORY_EMPTY). Do NOT un-comment or split across lines. t100 guards this. -->
> This file is kept up to date automatically while the stage runs.

## Interpretations
<!-- example: 2026-05-29T10:14:32Z — chose REST over GraphQL; the consuming team only needs CRUD, revisit if subscriptions land -->
- 2026-11-22T22:43:30Z — a returned rule blocks only when its text has a diff-check fence; the domain design left the exact pattern open and the requirements bound it to a constraint the rule's own text states. A loader or input failure returns a non-blocking verdict so the run does not crash.

## Deviations
<!-- example: 2026-05-29T10:14:32Z — skipped the optional caching layer the stage prose suggested; the dataset is small enough that it adds risk -->
- 2026-11-22T23:44:03Z — the scope file is scopes/pr-gate-check.md, not scopes/pr-gate.md; the validator rejects a scope file whose name does not match pr-gate-<name>.md, and the package had to validate.

## Tradeoffs
<!-- example: 2026-05-29T10:14:32Z — picked TDD over BDD this run; the team is unit-first and the domain is well-understood -->
- 2026-11-22T22:43:30Z — omitted database, repository, API, and frontend steps; the plugin is a local check with in-memory results, and the testing contract allows dropping layers that do not apply.

## Open questions
<!-- example: 2026-05-29T10:14:32Z — confirm the retention window with compliance before the next stage hardens the schema -->
