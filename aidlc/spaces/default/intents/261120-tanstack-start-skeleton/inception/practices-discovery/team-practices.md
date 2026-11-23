# Team Practices

## Way of Working

We use short-lived feature branches. Each branch is merged into main with a pull request. This replaces trunk-based development as the way we work.

- **Integration branch**: main

## Walking Skeleton

We always build a thin end-to-end slice first: a minimal version that runs the whole way through, built before the rest of the features, to prove the pieces connect. This stance is on. The yes overrides the classic scope's `skeleton: off`.

## Testing Posture

- **Methodology**: test-after
- **Methodology evidence**: The person chose to implement a layer, then write and run that layer's tests. The active test strategy is Standard. Classic adds no extra new-test floor; the existing suite stays green.
- **Ordering**: Implement each applicable testable layer, then write and run that layer's tests.
- **Coverage**: Classic adds no extra new-test floor. The existing suite stays green.
- **Tooling**: Formatters, linters, and test runners follow the project configuration once it exists (Prettier and ESLint for style).
- **Test types**: Standard volume: several tests per component, mostly unit tests, plus integration tests at important boundaries.

## Deployment

Staging updates on every merge. Production waits for a separate manual approval.

## Code Style

We follow the project's formatter and linter once they exist (Prettier and ESLint). We name things in ordinary TypeScript style. There is no project-wide rename rule.
