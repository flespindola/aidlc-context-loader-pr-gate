# Practices Discovery Questions

Suggested answers below restate the usual defaults for a new project. Nothing here is an affirmed team practice yet.

## Q1. [Release engineer] Where does finished work land?

This chooses the one branch work merges into, and whether day-to-day commits go straight there or through a side branch.

A. On main, trunk-based (suggested). A commit lands on the branch you are already on. A separate branch is squash-merged into main. One trunk; releases use tags or deploy configuration, not long-lived release branches.
B. Short-lived feature branches, each merged into main with a pull request.
C. A long-lived develop branch. Feature work merges into develop, and develop merges into main for a release.
X. Other (please specify)

[Answer]: B. Short-lived feature branches, each merged into main with a pull request.

## Q2. [Release engineer] Build a thin end-to-end slice first?

Build a thin end-to-end slice first? A walking skeleton is a minimal version that runs the whole way through, built first to prove the pieces connect before the real features go in.

A. No. Do not build that slice first (suggested).
B. Yes. Build that thin slice first and check that it runs end to end before the rest of the work.
X. Other (please specify)

[Answer]: B. Yes. Build that thin slice first and check that it runs end to end before the rest of the work.

## Q3. [Release engineer] When does a merge get deployed?

This sets whether staging updates when work merges, and whether production needs a separate approval.

A. Staging updates on every merge. Production waits for a separate manual approval (suggested).
B. Production updates on every merge, with no separate approval.
C. Nothing deploys on merge. Someone deploys by hand when they choose.
D. Both staging and production wait for a manual approval.
X. Other (please specify)

[Answer]: A. Staging updates on every merge. Production waits for a separate manual approval (suggested).

## Q4. [Quality engineer] When are tests written?

This sets the testing method and the order of code and tests. Test volume for this work is Standard: several tests per component, mostly unit tests, plus integration tests at important boundaries.

A. After the code. Implement a layer, then write and run that layer's tests (suggested).
B. Test-driven. Write a failing test first, then the code that makes it pass.
C. From scenarios. Write Given/When/Then behavior scenarios first, then the code.
D. From acceptance tests. Agree the acceptance test first, then implement until it passes.
E. Mixed. Name which layers are test-first and which are test-after.
X. Other (please specify)

[Answer]: A. After the code. Implement a layer, then write and run that layer's tests (suggested).

## Q5. [Developer] What code style should the project follow?

This is a TypeScript web app (TanStack Start). A hard rule you state here is kept as a standing constraint.

A. Follow the project's formatter and linter once they exist (Prettier and ESLint). Name things in ordinary TypeScript style. No project-wide rename rule (suggested).
B. Stricter TypeScript style: named exports only, and explicit return types on exported functions, on top of the formatter and linter.
C. Do not lock style rules yet. Decide them when the app skeleton exists.
X. Other (please specify)

[Answer]: A. Follow the project's formatter and linter once they exist (Prettier and ESLint). Name things in ordinary TypeScript style. No project-wide rename rule (suggested).
