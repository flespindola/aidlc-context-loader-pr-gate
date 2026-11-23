# Outcomes Pack
**Intent**: 261122-pr-gate-plugin
**Scope**: context-loader
**Stages delivered**: 11 approved / 11 total
**Duration**: 752 min

## 1. What Was Built

- **Project**: `game` — brownfield TanStack Start app used as the base for an AI Engineering assessment challenge.
- **This workflow**: Adversarial PR Review Plugin — take one git diff and one `spec.md`, check `AC-<n>` ids against a test change in the diff, and check only the rules `tools/context-loader.ts` returns.
- **Scope ran**: `context-loader` (tailored plan: ideation → reverse engineering → requirements → domain design → code generation → build and test).
- **Units**: Units Generation was skipped; delivery is a single zero-Unit construction package under `construction/code-generation/`.
- **Key decisions**: PrGateEntry calls AcCoverage, then AdrCompliance, then Verdict; the existing loader stays outside the plugin; a returned rule blocks only when its text has a `diff-check` fence (`forbid <literal>`), otherwise it is named and not checked.
- **Tech stack (pins from `package.json`)**: pnpm 10.33.2; TypeScript ^6.0.2; Vite ^8.0.0; Vitest ^5.1.1; React ^19.2.0; `@tanstack/react-router` 1.170.46; `@tanstack/react-start` 1.169.7; plugin tests via `pnpm exec vitest`; package check via `aidlc plugin validate`.

## 2. Repository Structure

```
game/
├── plugins/pr-gate/            # NEW — PR gate plugin (this intent)
│   ├── .aidlc-plugin/plugin.json
│   ├── scopes/pr-gate-check.md
│   ├── stages/construction/pr-gate.md
│   ├── sensors/pr-gate.md
│   ├── src/                    # entry, AC check, ADR check, verdict, diff classify
│   └── tests/                  # 14 unit tests + two fixture rules
├── tools/                      # existing context loader (unchanged)
├── fixtures/library/           # existing architecture rules (unchanged)
├── src/                        # existing TanStack Start app (unchanged)
├── aidlc/spaces/default/intents/261122-pr-gate-plugin/  # workflow record
│   └── OUTCOMES.md             # this pack
└── package.json                # unchanged (`context-loader` script already present)
```

## 3. Setup Guide

### Prerequisites

- Node.js (modern ESM; this run used Node 23.3.0)
- pnpm (see `packageManager` in `package.json`)
- `aidlc` on `PATH` (plugin validate)

### Local setup

```bash
pnpm install
pnpm exec vitest run plugins/pr-gate/tests/ac-coverage.test.ts plugins/pr-gate/tests/adr-compliance.test.ts plugins/pr-gate/tests/verdict.test.ts plugins/pr-gate/tests/pr-gate-entry.test.ts
aidlc plugin validate plugins/pr-gate
pnpm run dev   # optional — existing app on port 3000
```

Call `runPrGate({ diff, spec, libraryDirectory })` from `plugins/pr-gate/src/pr-gate-entry.ts`. Omit `libraryDirectory` to use the loader's default library.

### Environment variables

None required for the plugin. It does not call a network service.

### How to run tests

```bash
pnpm exec vitest run plugins/pr-gate/tests/ac-coverage.test.ts plugins/pr-gate/tests/adr-compliance.test.ts plugins/pr-gate/tests/verdict.test.ts plugins/pr-gate/tests/pr-gate-entry.test.ts
pnpm exec vitest run
```

## 4. Build and Deploy

```bash
pnpm exec tsc --noEmit
pnpm run build
```

Full suites used at Build and Test: plugin tests 14 passed; existing suite 40 passed (9 files); `tsc` and `pnpm build` exited 0; plugin validate VALID; FR/NFR coverage sensor pass.

**Infrastructure / deploy**: not in scope (ci-pipeline and Operation stages skipped). No IaC generated.

## 5. Architecture Decisions

From `inception/domain-design/decisions.md`:

| ADR | Decision | Rejected |
|---|---|---|
| ADR-001 | AcCoverage, AdrCompliance, Verdict, plus a thin PrGateEntry | One component; both checks in one component |
| ADR-002 | Call existing `tools/context-loader.ts`; do not own it | Treating the loader as a new component |
| ADR-003 | Entry calls the three checks in that order | Verdict calling the checks |

**Constraints**: pnpm; test-after; no language model and no network; do not modify `tools/context-loader.ts` or `fixtures/library/`. The approved code plan added the `diff-check` fence as the only machine-checkable rule form.

## 6. What to Commit

| Artifact | Action | Destination |
|----------|--------|-------------|
| `decisions.md` (domain-design) | Commit | `docs/decisions/` (optional copy) or keep under `aidlc/.../domain-design/` |
| Architecture summary (1 page) | Write + commit | `docs/architecture.md` |
| NFR summary table | Write + commit | `docs/nfr-summary.md` |
| `plugins/pr-gate/**` | Commit with app | workspace root |
| Full `aidlc/` intent tree | Commit | version-controlled record |

## 7. Workflow Footprint

- Stages: 11 approved, 0 failed, 0 pending
- Memory entries captured: 11
  (8 interpretations, 1 deviation, 2 trade-offs, 0 open questions)
- Learnings captured: 0 from orchestrator, 0 from user additions

### Session Cost (`/aidlc-session-cost`)

```
Session Cost
============

Workflow:   2026-11-22T11:18:14Z
Scope:      context-loader
Duration:   752 min

Stages
  Total:      11
  Approved:   11
  Failed:     0
  Pending:    0

By phase
  initialization    3/3 approved
  ideation          3/3 approved
  inception         3/3 approved
  construction      2/2 approved

Memory entries
  Total:            11
  Interpretations:  8
  Deviations:       1
  Trade-offs:       2
  Open questions:   0

Sensors
  Fired:            70
  Passed:           68
  Failed:           2
  Could not run:    0
  Budget-override:  0
  Incomplete:       0

Learnings captured
  From orchestrator:    0
  From user additions:  0
```

## 8. Known Limitations and What to Tackle Next

- **Deferred**: hosted CI, rebuilding `tools/context-loader.ts` or `fixtures/library/`, and changing the TanStack home route.
- **Accepted Code Generation review risks**: sensor file `sensors/pr-gate.md` is not named `aidlc-pr-gate.md`, so install can drop it, and starting `pr-gate-entry.ts` does not call `runPrGate` or stop when `blocking` is true (the 14 tests call the library directly); a test hunk that only deletes lines is treated as not coverage.
- **Open questions from diaries** (0): none. A loader failure, a missing spec, or an unreadable diff still returns a non-blocking verdict and does not throw.
- **Recommended next**: (1) rename the sensor to `aidlc-pr-gate.md` and point its command at `runPrGate`; (2) count a surviving test file as coverage when a hunk only deletes lines. The session replay is pasted below.

## Session Replay (`/aidlc-replay`)

# Session Replay
**Workflow**: 2026-11-22T11:18:14Z
**Scope**: context-loader
**Duration**: 752 min
**Stages**: 11 approved / 11 total

## Executive Summary

This workflow added a local PR-gate plugin at `plugins/pr-gate/` on the existing TanStack Start app. The plugin takes one git diff and one `spec.md`, checks `AC-<n>` ids against a test change in the diff, and checks only the rules returned by the existing context loader. The person kept the loader unchanged, chose one changed test file as coverage for every id, and split the check into AcCoverage, AdrCompliance, and Verdict with a thin entry that calls them in that order. A returned rule blocks only when its text has a `diff-check` fence. The package validates, 14 plugin tests pass, and the existing suite stays green. Two review findings were approved as risk: the sensor is not what an install actually runs, and a test hunk that only deletes lines is not counted as coverage.

## Timeline

### Initialization Phase — 3/3 stages approved

#### Workspace Scaffold
**What happened**: The intent record and its in-scope phase directories were created at workflow start.
**Key decisions**:
- Operation was skipped for this plan.
**Artefacts produced**:
- Intent directory under `aidlc/spaces/default/intents/261122-pr-gate-plugin/`

#### Workspace Detection
**What happened**: A scan classified the repo as brownfield TypeScript with Vite and React.
**Key decisions**:
- Treat the TanStack Start app as existing code, not a new project.
**Artefacts produced**:
- Workspace classification on `aidlc-state.md`

#### State Init
**What happened**: The `context-loader` plan was recorded and routing started at intent capture.
**Key decisions**:
- Depth Minimal, test strategy Minimal, Guard Policy strict, plan approval on.
**Artefacts produced**:
- `aidlc-state.md` execution plan (11 stages, the rest skipped)

### Ideation Phase — 3/3 stages approved

#### Intent Capture
**What happened**: The request was framed as an adversarial PR-review plugin from `INSTRUCTIONS.md`, and assumptions were accepted.
**Key decisions**:
- Answers were edited in the questions file.
- Assumptions accepted rather than turned into more questions.
**Artefacts produced**:
- `ideation/intent-capture/intent-statement.md`
- `ideation/intent-capture/intent-capture-questions.md`

#### Feasibility
**What happened**: The check was judged feasible as local TypeScript that reuses the loader and does not call a network or a language model.
**Key decisions**:
- Assumptions accepted.
**Artefacts produced**:
- `ideation/feasibility/feasibility-assessment.md`
- `ideation/feasibility/feasibility-questions.md`

#### Scope Definition
**What happened**: The minimum delivery was locked to the plugin package, the two checks, a JSON and Markdown verdict, plugin validate, and at least three diffs.
**Key decisions**:
- Rebuilding the loader and `fixtures/library/` is out of scope.
- Hosted CI is out of scope.
**Artefacts produced**:
- `ideation/scope-definition/scope-document.md`
- `ideation/scope-definition/scope-definition-questions.md`

### Inception Phase — 3/3 stages approved

#### Reverse Engineering
**What happened**: The shared code knowledge base was stale. A small rescan covered `tools/` and `fixtures/library/` only.
**Key decisions**:
- Focused scan, not a full rescan of `./`.
- Narrower coverage than the previous full scan was accepted.
**Artefacts produced**:
- `inception/reverse-engineering/developer-scan.md`
- Updated code knowledge base for `game`

#### Requirements Analysis
**What happened**: The match rules were written down and approved with four open review findings left as risk.
**Key decisions**:
- One added or changed test file covers every acceptance-criterion id.
- Only rules the loader returns are judged.
- A rule with no checkable constraint is named and does not block.
**Artefacts produced**:
- `inception/requirements-analysis/requirements.md`
- `inception/requirements-analysis/traceability.json`

#### Domain Design
**What happened**: The plugin was split into building blocks and approved with three review findings left as risk.
**Key decisions**:
- Three check owners: AcCoverage, AdrCompliance, Verdict.
- A thin entry calls them in that order. The loader is not a new component.
**Artefacts produced**:
- `inception/domain-design/components.md`
- `inception/domain-design/decisions.md`
- `inception/domain-design/traceability.json`

### Construction Phase — 2/2 stages approved

#### Code Generation
**What happened**: The approved plan was built under `plugins/pr-gate/`. Vitest passed 14 tests and plugin validate exited 0. The architecture review came back not ready; the person approved anyway.
**Key decisions**:
- Plan approved: a `diff-check` fence is the only blocking rule form; a loader or input failure returns a non-blocking verdict.
- Review findings accepted as risk: the sensor file is not installed under the name the framework keeps, and the entry does not run when started as a process; a test hunk that only deletes lines is not coverage.
- Scope file is `scopes/pr-gate-check.md` because the validator rejects `pr-gate.md`.
**Artefacts produced**:
- `plugins/pr-gate/` (manifest, scope, stage, sensor, four checks, diff classifier, 14 tests, two fixture rules)
- `construction/code-generation/code-generation-plan.md`
- `construction/code-generation/unit-test-instructions.md`
- `construction/code-generation/code-summary.md`
- `construction/code-generation/traceability.json`

#### Build and Test
**What happened**: No new test files were added. Type-check, the Vite build, the 14 plugin tests, the full suite (40 tests), and plugin validate all passed. The coverage sensor reported no uncovered requirement.
**Key decisions**:
- Minimal strategy, so no integration, performance, or security instruction files.
- The existing suite was run once because it must stay green.
**Artefacts produced**:
- `construction/build-and-test/build-instructions.md`
- `construction/build-and-test/build-and-test-summary.md`
- `construction/build-and-test/test-results.md`
- `construction/build-and-test/cross-unit-traceability.md`

## Decisions Register Summary

| Decision | Alternatives considered | Chosen option | Rationale |
|---|---|---|---|
| How much of the repo to rescan | Reuse the stale full scan; rescan everything | Focused scan of `tools/` and `fixtures/library/` | Smaller and enough for the loader the plugin calls |
| When acceptance criteria are covered | A test per id; any test change | One added or changed test covers every id | The person's answer at requirements |
| Which rules can block | Challenge examples always; every library rule | Only rules the loader returns, and only when their text states a checkable constraint | The person's answers; uncheckable rules are named and do not block |
| How to split the plugin | One component; two components | AcCoverage, AdrCompliance, Verdict, plus a thin entry | The person's domain-design answer |
| How a rule becomes machine-checkable | Leave the pattern unspecified | A `diff-check` fence whose body is `forbid <literal>` | Approved in the code plan so the check stays deterministic |
| Whether to fix the code-generation review | Fix the sensor wiring and the deletion-only hunk | Approve and keep both findings as risk | The person's approval of Code Generation |

## Learnings Captured

From orchestrator: 0
From user additions: 0

The diaries still record working notes. The reverse-engineering note is that the rescan stayed small. The domain-design note is that the thin entry was named so the package and the call order have an owner. The code-generation notes are the `diff-check` fence and the scope filename the validator required. The build-and-test note is that Minimal added no further tests and the existing suite was run once. None of these were kept as a project or team rule.

## What's Next

The workflow is complete: 11 of 11 stages are approved and the diaries hold 0 open questions. The accepted gaps are still open if this plugin has to block a real installed gate. The sensor manifest is `sensors/pr-gate.md`, not `aidlc-pr-gate.md`, and starting the entry file does not call `runPrGate`. A test file whose hunk only deletes lines is still treated as missing coverage. Hosted CI and a rebuild of the context loader stay out of scope.
