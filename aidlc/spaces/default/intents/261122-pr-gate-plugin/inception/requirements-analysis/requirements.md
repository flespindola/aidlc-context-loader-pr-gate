# Requirements

## Upstream inputs

- `intent-statement` — `aidlc/spaces/default/intents/261122-pr-gate-plugin/ideation/intent-capture/intent-statement.md`
- `scope-document` — `aidlc/spaces/default/intents/261122-pr-gate-plugin/ideation/scope-definition/scope-document.md`
- `business-overview` — `aidlc/spaces/default/codekb/game/business-overview.md`
- `architecture` — `aidlc/spaces/default/codekb/game/architecture.md`
- `code-structure` — `aidlc/spaces/default/codekb/game/code-structure.md`
- Answers in `requirements-analysis-questions.md` (Q1–Q3)

## Intent analysis

Ship a local pre-merge gate as an AI-DLC plugin. It reads a git diff and the task's `spec.md`, then blocks when acceptance criteria have no automated test change in the diff, or when the diff breaks a rule the existing context loader actually returned. The home app in `business-overview` stays as it is. This delivery does not rebuild the loader and does not ship hosted CI. [intent-statement] [scope-document]

## Functional requirements

### FR1 — Plugin package

The system shall provide a valid AI-DLC plugin at `plugins/pr-gate/`.

- **FR1.1** The package shall include `.aidlc-plugin/plugin.json`, `scopes/`, `stages/`, and `sensors/`.
- **FR1.2** `aidlc-plugin-validate.ts` shall exit successfully on that package.

### FR2 — Inputs

- **FR2.1** One check run shall take a git diff and one `spec.md`. The plugin does not discover either file by searching the repo.

### FR3 — Acceptance-criteria coverage

- **FR3.1** The system shall collect every id matching `AC-<positive integer>` in `spec.md`.
- **FR3.2** When that set is non-empty, the set is covered if and only if the diff adds or modifies at least one automated test. One such test covers every id. [Q1]
- **FR3.3** When that set is non-empty and the diff adds or modifies no automated test, the system shall list every id and block.
- **FR3.4** When that set is empty, the acceptance-criteria check shall pass.

An automated test is a diff path ending in `.test.ts`, `.test.tsx`, or `.spec.ts` that is added or whose content changes. A deletion-only change of such a file does not count. This matches the test files already named in `code-structure`.

### FR4 — ADR compliance

- **FR4.1** The system shall load rules by calling the existing `tools/context-loader.ts`. It shall not modify that loader or `fixtures/library/`. [scope-document]
- **FR4.2** The system shall judge the diff only against rules that call returns. [Q2]
- **FR4.3** A rule blocks only when its own text states a constraint the diff can violate. The challenge examples (HTTP inside a database transaction, unmasked PII or secrets in logs, a backward-incompatible OpenAPI change) block only when a returned rule states that constraint.
- **FR4.4** When a returned rule states no constraint the check can apply to a diff, the system shall not block for that rule and shall name it in the verdict as not checked. [Q3]
- **FR4.5** When the diff violates a returned rule's stated constraint, the system shall report the file and line and block.

The rules in `fixtures/library/` are prose about app layout, the single home route, server data, one styling approach, and tests written after code (`architecture`). A check exists only where that prose states a constraint a diff can confirm or break.

### FR5 — Verdict

- **FR5.1** The system shall emit one JSON verdict and one Markdown verdict with the same findings.
- **FR5.2** Each blocking finding shall include the file and line when the finding is a line in the diff. An acceptance-criteria miss names the id and `spec.md`.
- **FR5.3** The gate blocks when at least one FR3.3 or FR4.5 finding exists. A not-checked rule (FR4.4) does not block.

### FR6 — Automated tests

- **FR6.1** The suite shall include at least three diffs: one clean, one acceptance-criteria violation (FR3.3), and one ADR violation (FR4.5). The ADR case shall use a rule document the loader returns whose text states a checkable constraint. That document may be a test fixture passed to the loader. It shall not require editing `fixtures/library/`.
- **FR6.2** The clean diff shall pass while any not-checked rule is still named in the verdict.
- **FR6.3** The suite shall pass via pnpm.

## Non-functional requirements

- **NFR1** The check is deterministic. The same diff, `spec.md`, and loader result always produce the same verdict. The check does not call a language model.
- **NFR2** The check runs locally. It does not call a network service and does not require a hosted CI product.
- **NFR3** The check does not modify the diff or `spec.md`.

## Constraints

- Reuse `tools/context-loader.ts` and the rule documents it reads. Do not rebuild them. [scope-document]
- Package manager is pnpm.
- Plugin code is TypeScript.
- `aidlc-plugin-validate.ts` must stay green (FR1.2).
- The TanStack Start home page described in `business-overview` is not part of this change.

## Assumptions

- `AC-1` style ids are the only acceptance-criteria tokens. Prose acceptance criteria without that id are ignored.
- "Added or modified" follows the diff: a new file, or a file with a changed hunk. Rename-only and binary hunks are not test coverage and are not ADR evidence. An unsupported diff still returns a verdict; it does not crash.
- Loader filters (`--stage`, `--agent`, `--tags`, `--library`) are a design choice. Whatever they are, FR4.2 still limits the check to rules the call returns.

## Out of scope

- Rebuilding `tools/context-loader.ts` or `fixtures/library/`. [scope-document]
- A hosted GitHub or GitLab Actions product as a done criterion. [scope-document]
- External services or a remote rule store.
- Blocking on a rule the loader did not return, including the three challenge examples when no returned rule states them. [Q2]
- Changing the home route, router, or rule-check library under `src/` so the plugin can run.

## Open questions

None. The exact diff pattern for each loaded rule's wording is domain design, bounded by FR4.3 and FR4.4.
