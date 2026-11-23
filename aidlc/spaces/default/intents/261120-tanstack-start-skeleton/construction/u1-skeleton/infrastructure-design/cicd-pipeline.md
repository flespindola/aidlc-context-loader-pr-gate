# CI/CD Pipeline — u1-skeleton

This phase has no pipeline and no deploy. NFR1.2 forbids a staging, preview, or production step.

## What the person does on the machine

1. Build the application locally.
2. Write the tests after the code they cover.
3. Run the project's test command. That command is not chosen yet.
4. Open the home route and read the heading.

There is no build server, no artifact store, no environment promotion, no blue-green or canary deploy, and no rollback host. There is no secret in a pipeline, because there is no pipeline and this phase has no secret.

## Later, when the game is deployed

A change then goes on a short-lived branch and merges into `main` through a pull request. Staging on merge, with production waiting for a manual approval, starts at that later phase. It is not built here.
