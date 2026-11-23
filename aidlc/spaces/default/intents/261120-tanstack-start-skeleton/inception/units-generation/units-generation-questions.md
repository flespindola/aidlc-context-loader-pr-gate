# Units Generation Questions

The two building blocks do not call each other, and this phase does not deploy. The thin slice is one local run: the app builds, the home page responds, and the rule files parse. That is already settled by `requirements.md`, `stories.md`, `components.md`, and `decisions.md`.

## Boundary

One unit holds both HomeApp and RuleLibrary. Two units with no link would make the first unit only half of that slice. The components stay separate inside the unit. They are not merged back into one component.

## Kind

No single kind fits. `ui` would skip the rule entity and the rules. `library` would skip the home-page screen. The unit is left untagged so construction designs both.

## Dependencies

There is one unit, so there is no edge. This stage does not pick a build order.

## Deployment

The unit runs on the developer's machine. It is not deployed in this phase.

## Plan Approval

One unit, `u1-skeleton` (U1). It contains the home page and the rule-file check. It has no dependency. It is untagged. Every story is assigned to it.

A. Approve Plan
B. Revise Plan
X. Other (please specify)

[Answer]: A. Approve Plan
