# Build Instructions

This phase is one local TanStack Start app. The commands come from the approved `code-generation-plan` and the `code-summary` for `u1-skeleton`. There is no second repository, no environment file, and no infrastructure-as-code root.

## Prerequisites

- Node.js and pnpm on the machine that builds the app.
- The repo root is the app root. Dependencies are already listed in `package.json` and locked by `pnpm-lock.yaml`.

## Install

From the repo root:

```bash
pnpm install
```

No environment variables are required. No local database or other service is required.

## Build

```bash
pnpm build
```

That runs `vite build`. A finished build writes `dist/` and exits 0. Run it again when you need to confirm a second build still finishes. There is no deploy script.

## Verify

```bash
pnpm exec vitest run src/lib/rule-check.test.ts src/routes/index.test.tsx src/routes/home-and-rules.integration.test.tsx
```

The same command is recorded in `unit-test-instructions`. Classic sets no line-coverage floor, so this command does not collect one.

## Troubleshooting

- `pnpm: command not found`: this project uses pnpm. Install pnpm, then run the install again.
- A build that stops in `vite build`: read the Vite error. The home route is `src/routes/index.tsx` and the rule check is `src/lib/rule-check.ts`.
- A test that cannot find a module: run `pnpm install` from the repo root, then the vitest command above.
