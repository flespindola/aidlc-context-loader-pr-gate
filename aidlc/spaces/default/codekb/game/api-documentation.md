# API Documentation

## External HTTP / Page Surface

No REST, GraphQL, or RPC API modules were in the opened set. The prior scan recorded this TanStack Start surface (`src/` not re-opened):

| Method | Path | Behavior | Auth |
|---|---|---|---|
| GET | `/` | Renders home page heading `The app is up`; sets document title to the same sentence | None |

Root document (`__root.tsx`) supplies charset, viewport, title, stylesheet link, and Scripts. Home route sets matching title meta. No remote `fetch` on render (covered by unit test on the prior scan).

## Internal Library API (prior scan, not re-opened)

### `checkRuleLibrary(libraryDirectory?: string): Promise<RuleCheckResult>`

- **Location**: `src/lib/rule-check.ts`
- **Default directory**: `fixtures/library` (`RULE_LIBRARY_DIRECTORY`)
- **Behavior**:
  - Lists top-level `*.md` files (sorted); missing directory → empty result (`There are no rule files`)
  - Requires frontmatter delimited by `---` with keys `tags`, `applicable_stages`, `applicable_agents`
  - Unreadable frontmatter → failure `{ filename, detail: 'frontmatter is unreadable' }`
  - Missing field → failure `{ filename, field, detail: 'missing <field>' }`
  - Valid files become `{ filename, body }` rules (body after closing `---`)
- **Result fields**: `rules`, `failures`, `empty`, `failedParse`, `report`
- **Reports**: `Every rule file is valid` | `A rule file is missing a required field` | `Frontmatter is unreadable` | `There are no rule files`

## Rule library reader (this run)

### `loadRuleLibrary(libraryDirectory?: string): Promise<RuleLibraryResult>`

- **Location**: `tools/rule-library.ts`
- **Default directory**: `fixtures/library` (`RULE_LIBRARY_DIRECTORY`)
- **Listing**: top-level files ending in `.md`, sorted by name. A missing directory (`ENOENT`) returns `{ ok: true, rules: [] }`. Any other `readdir` error is thrown.
- **Success rule**: `{ filename, path, tags, applicableStages, applicableAgents, body }`. `path` is the joined directory and filename. `body` is the text after the closing `---`.
- **Failure**: any file error fails the whole call (`{ ok: false, errors }`). Partial rule lists are not returned. Each error is `{ filename, detail, field? }`.
- **Required keys**: `tags`, `applicable_stages`, `applicable_agents`. Each missing key adds `{ field, detail: 'missing <field>' }`.
- **Unreadable frontmatter** (`detail: 'frontmatter is unreadable'`): source does not start with `---\n` after a leading BOM strip and CRLF normalization; no closing `---` line; a non-key, non-list line; or an indented line that is not a list item under a current key.
- **Values**: a scalar (optional surrounding `'` or `"`) or a list. An empty scalar, `|`, or `>` starts a list. List items are indented lines matching `- `. Blank lines and `#` comments inside the frontmatter are skipped. `toSet` trims and drops empty strings. A scalar becomes a one-element list.
- **Not a YAML engine**: no nested maps, no multi-document streams.

## Context selector (this run)

### `selectContext(request): Promise<SelectionResult>`

- **Location**: `tools/context-selector.ts`
- **Request**: optional `stage`, `agent`, `tags` (string array), `libraryDirectory`.
- **Hard fail**: library `{ ok: false }` becomes `{ ok: false, errors, exitCode: 1, warnings }` where each warning is `` `${filename}: ${detail}` ``.
- **No filters** (blank stage, blank agent, and no tags): every loaded rule is eligible with score `0`.
- **Filters present**: a rule is eligible when at least one provided dimension matches (OR). Each matching dimension adds `1` (maximum `3`).
  - Stage and agent: case-sensitive prefix. The stored entry must start with the trimmed request (`entry.startsWith(request)`). An empty stored list does not match.
  - Tags: one point if any trimmed request tag is an exact element of the rule's tags.
- **Order and cap**: eligible rules sort by score descending, then `filename` via `localeCompare`. At most four are returned (`MAX_SELECTED`).
- **Preferred floor**: `matchCount` is the eligible count before the cap. `underFloor` is true when that count is below `2`. The warning is `Selection under preferred floor of 2: matched N rule(s).` Success still uses `exitCode: 0`.
- **Selected item**: `{ id, path, filename, tags, applicable_stages, applicable_agents, score }`. `id` and `filename` are both the file name.
- **Index**: `{ count, underFloor, rules: [{ id, tags, score }] }` where `count` is the selected length (after the cap), not `matchCount`.
- **Also returned on success**: `output` (`selected`, `index`, `matchCount`, `underFloor`, `warnings`) and `durationMs` (`performance.now()` around the call).

### `selectionJsonBytes(output): number`

UTF-8 byte length of `JSON.stringify({ selected, index })`. It does not include a trailing newline.

## CLI (this run)

### `parseArgs(argv): ParsedArgs`

- **Flags**: `--help` / `-h` → `help`. `--stage`, `--agent` take the next argv token. `--tags` splits the next token on commas, trims, and drops empties. `--library` sets `libraryDirectory`.
- Unknown tokens are ignored. A missing value becomes `undefined` and is not rejected.

### `runContextLoader(argv, io?): Promise<number>`

- **Default io**: `process`.
- **Help**: writes `Usage: context-loader [--stage <slug>] [--agent <role>] [--tags <csv>] [--library <dir>]` to stderr and returns `0`. The library is not loaded.
- **Hard fail**: each selector warning is written to stderr; returns `1`.
- **Success**: warnings (including under-floor) go to stderr. Stdout receives one JSON object, `{ selected, index }`, plus a newline. Return value is `0`.
- **Size**: when `selectionJsonBytes` is at least `3 * 1024`, stderr receives `Compact index payload exceeds 3 KB budget.` The JSON is still written and the return code stays `0`. The counted bytes omit the newline that stdout writes.

### Direct run

When `process.argv[1]` ends with `context-loader.ts` or `context-loader.js`, the module calls `runContextLoader(process.argv.slice(2))` and assigns `process.exitCode`. A thrown error writes `error.message` (or `String(error)`) to stderr and sets `process.exitCode` to `1`.

## Authentication / Rate Limits

N/A — local app and local CLI, no auth middleware, no API rate limiting.
