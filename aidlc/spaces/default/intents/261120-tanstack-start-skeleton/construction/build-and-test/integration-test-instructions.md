# Integration Test Instructions

Standard strategy. The only boundary in this phase is the home page beside the rule library. Those two blocks do not call each other. The tests already exist; this file says how to run them. The command is the one in `unit-test-instructions`.

## Framework

Vitest, environment `node`, from `vitest.config.ts`. The home route is rendered with `renderToStaticMarkup` in Node. That is integration evidence. It is not a browser run and not a DOM emulator.

## Command

From the repo root:

```bash
pnpm exec vitest run src/routes/home-and-rules.integration.test.tsx
```

The full unit command also runs this file, together with the home-page and rule-check tests. Run that full command once. Do not run it again just to count this file a second time.

## What the boundary covers

- An empty `fixtures/library` does not stop the home page. The heading stays "The app is up".
- An invalid rule file does not change that heading.

## Coverage

Classic sets no line-coverage floor. No coverage threshold is enforced.

## Test data

The integration file creates its own temporary library: an empty directory, and a file whose frontmatter is invalid. It does not call a remote service.
