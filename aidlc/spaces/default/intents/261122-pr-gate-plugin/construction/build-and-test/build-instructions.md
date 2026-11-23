# Build Instructions

Inputs: `code-generation-plan`, `unit-test-instructions`, and `code-summary` under `aidlc/spaces/default/intents/261122-pr-gate-plugin/construction/code-generation/`.

The plugin is TypeScript under `plugins/pr-gate/`. It is not part of the Vite app bundle. The project type-check includes every `.ts` file and already sets `noEmit`.

## Install

Dependencies are already in the repo. From the project root:

```bash
pnpm install
```

Package manager is pnpm. No new package is required for this plugin.

## Environment

No environment variables, config files, or local services. The check reads a diff, a spec, and a local rule library. It does not call a network service.

## Build

There is no plugin compile step. Confirm the project type-check, which includes `plugins/pr-gate/`:

```bash
pnpm exec tsc --noEmit
```

Confirm the existing app still bundles:

```bash
pnpm build
```

## Verify

```bash
pnpm exec vitest run plugins/pr-gate/tests/ac-coverage.test.ts plugins/pr-gate/tests/adr-compliance.test.ts plugins/pr-gate/tests/verdict.test.ts plugins/pr-gate/tests/pr-gate-entry.test.ts
```

```bash
pnpm exec vitest run
```

```bash
aidlc plugin validate plugins/pr-gate
```

The first command is the unit command from `unit-test-instructions`. The second is the existing suite, which must stay green. The third is plugin validate, run on its own.

## Troubleshooting

- `tsc` reports an unused local in `plugins/pr-gate/`: the project sets `noUnusedLocals` and `verbatimModuleSyntax`. Fix the plugin file; do not loosen `tsconfig.json`.
- Vitest cannot resolve `tools/context-loader.ts`: run the commands from the project root so the relative import from the plugin resolves.
- Plugin validate names a scope filename: the scope file must be `scopes/pr-gate-<name>.md`.
