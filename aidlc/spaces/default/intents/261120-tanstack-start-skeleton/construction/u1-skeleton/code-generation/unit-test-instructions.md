# Unit Test Instructions — u1-skeleton

## Framework

Vitest, added in plan step 2, before any test file is written. Tests run in the repo root. The home-page tests render the route. The rule-check tests call the check with fixture files. No browser install and no remote service.

## Command

Run only this unit's tests:

```bash
pnpm exec vitest run src/lib/rule-check.test.ts src/routes/index.test.tsx src/routes/home-and-rules.integration.test.tsx
```

## Coverage

Classic sets no line-coverage floor. This command does not enforce one. Build and Test does not apply an 80% floor to this phase.

## What the tests cover

- `src/lib/rule-check.test.ts`: 8 unit tests for RuleLibrary. Two filenames are two rules. A file outside `fixtures/library` is not a rule. An empty directory is not a failed parse. A missing `tags` field fails and names the file and the field. Unreadable frontmatter fails and names the file. A valid neighbor stays valid. Prose without a required heading is accepted.
- `src/routes/index.test.tsx`: 6 unit tests for HomeApp. The route responds with the heading "The app is up". The tab title is the same sentence. The page shows no gameplay, account, score, or saved progress. There is no sign-in. The page makes no remote request.
- `src/routes/home-and-rules.integration.test.tsx`: 2 integration tests. The home page still responds when the library is empty. An invalid rule file does not change the heading.

## Test data

Rule-check tests create their own temporary markdown files, including a missing field, unreadable frontmatter, an empty directory, and a file outside `fixtures/library`. They do not depend on the five starter files being valid, except the one case that reads those starter files. Home-page tests do not read the network.

## Mocking

Do not mock the file reader inside the rule-check tests. Do not mock the heading. Stub only the network, and assert it was not called.
