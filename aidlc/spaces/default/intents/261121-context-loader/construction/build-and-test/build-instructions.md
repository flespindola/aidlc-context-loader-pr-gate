# Build Instructions — context-loader

## Prerequisites

- Node.js (project uses modern ESM; CLI uses `--experimental-strip-types`)
- pnpm (`packageManager` pinned in `package.json`)

## Dependency installation

```bash
pnpm install
```

## Environment

No env vars required for the loader. Library path defaults to `fixtures/library`.

## Build

Application is Vite/TanStack Start; verify the existing app still builds:

```bash
pnpm run build
```

The context loader itself is TypeScript executed via:

```bash
pnpm run context-loader -- --stage construction --agent developer --tags routing
```

## Build verification

- `pnpm run build` exits 0
- CLI prints JSON on stdout for a normal selection

## Troubleshooting

- `ERR_MODULE_NOT_FOUND` for `./context-selector`: ensure imports use `.ts` extensions for Node strip-types
- Empty selection / under-floor warning: check `--stage` / `--agent` / `--tags` filters against fixture frontmatter
