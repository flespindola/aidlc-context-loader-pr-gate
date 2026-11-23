# Functional Design — u1-skeleton

## Interpretation

2026-11-21T10:24:08Z: The unit is one local slice. HomeApp shows "The app is up" and does not read rules. RuleLibrary checks markdown files under fixtures/library. Frontmatter value kinds, directory names beyond fixtures/library, and the styling approach stay unnamed, as the approved requirements left them.

## Deviations

None.

## Tradeoffs

One Rule entity, with filename as identity. The five starter statements are rules about those files, not five entity types.

## Open questions

The requirements' assumptions about a missing library directory, odd filenames, and applicable_agents behavior stay assumptions. They are not business rules.
