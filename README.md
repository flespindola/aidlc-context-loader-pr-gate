# Challenge: Progressive Context Loader (Zero RAG Bloat) & Adversarial Pull Request Gate

This repository is the AI-DLC technical assessment for that challenge. The work is three completed intents:

- `261120-tanstack-start-skeleton` — local TanStack Start app and `fixtures/library/`
- `261121-context-loader` — deterministic rule selector in `tools/context-loader.ts`
- `261122-pr-gate-plugin` — local PR gate in `plugins/pr-gate/`

## Notes

I started with a simple TanStack Start web app so the project would have architecture rules for the things built after it: the context loader and the PR gate. Those rules live in `fixtures/library/`.

While building the context loader, I saved its workflow as a more compact plan for what the challenge asked me to deliver. That plan is `aidlc/scopes/context-loader.md`. It is the path both the loader and the PR gate ran: ideation, reverse engineering, requirements, domain design, code generation, and build and test. The three setup stages are extra and run for every intent.

The plan and implementation presented here fulfill the challenge’s requirements. In a real production environment, however, I would adapt my approach to the existing codebase, project structure, broader requirements, and any other relevant constraints.

## Build

```bash
pnpm install
pnpm build
```

Run `pnpm build` again. A second build finishes the same way. There is no deploy step.

## Test

```bash
pnpm test
```

`pnpm test` runs the full Vitest suite: the home page and rule-file check, the context loader, and the PR gate. `npm test` runs the same script.

## Context loader

```bash
pnpm run context-loader -- --stage construction --agent developer --tags routing
```

The loader reads `fixtures/library/*.md` and prints 2–4 matching rules plus a compact index. It does not call a model.

## PR gate

The gate is `plugins/pr-gate/`. Validate the package with:

```bash
aidlc plugin validate plugins/pr-gate
```

## Open the page

```bash
pnpm dev
```

Open http://localhost:3000. The home page is the only route.
