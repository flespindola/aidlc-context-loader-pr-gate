# Delivery Planning Questions

No open questions. There is one unit, so there is one build pass. The choices below are already settled by `requirements.md`, `stories.md`, `team-practices.md`, and `unit-of-work-dependency.md`.

## What to build first

The team already chose a thin end-to-end slice first: the app builds, the home page responds, and the rule files parse. That slice is the only unit, `u1-skeleton`. There is no second piece of work to rank ahead of it.

## Scoring

A value-against-size score does not apply. There is nothing to rank.

## How big one build pass is

One build pass covers the one unit. It is not split, and nothing is bundled with it.

## At the same time or one after another

One pass. Nothing runs beside it. Construction is already set to go unit by unit, one at a time.

## Outside hold-ups

None. This phase is local. There is no external API, no other team's hand-off, and no deploy approval. Contract design was skipped because there is no contract to pin down.

## What to tackle early

The slice itself is the early work. Frontmatter value types and the styling approach stay unnamed, as the approved requirements left them. This plan does not pick them.
