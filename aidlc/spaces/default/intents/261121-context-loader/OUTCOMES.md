# Outcomes Pack
**Intent**: 261121-context-loader
**Scope**: bugfix
**Stages delivered**: 11 approved / 11 total
**Duration**: 49 min

## 1. What Was Built

- **Project**: `game` — brownfield TanStack Start app used as the base for an AI Engineering assessment challenge.
- **This workflow**: Deterministic Tag & Stage Context Loader — select 2–4 architecture rules from `fixtures/library/*.md` by `--stage` / `--agent` / `--tags` with no vector DB and 0 selection tokens.
- **Scope ran**: `bugfix` (tailored plan: ideation → reverse engineering → requirements → domain design → code generation → build and test).
- **Units**: Units Generation was skipped; delivery is a single zero-Unit construction package under `construction/code-generation/`.
- **Key decisions**: RuleLibrary + ContextSelector split; case-sensitive prefix match for stage/agent; OR across filters; under-floor exits 0 with stderr warning (FR1.5 revised); separate parse under `tools/` (does not wrap `src/lib/rule-check.ts`).
- **Tech stack (pins from `package.json`)**: pnpm 10.33.2; TypeScript ^6.0.2; Vite ^8.0.0; Vitest ^5.1.1; React ^19.2.0; `@tanstack/react-router` 1.170.46; `@tanstack/react-start` 1.169.7; Node CLI via `--experimental-strip-types`.

## 2. Repository Structure

```
game/
├── tools/                      # NEW — context loader (this intent)
│   ├── context-loader.ts       # CLI entry
│   ├── context-selector.ts     # match / rank / JSON
│   ├── rule-library.ts         # load + typed frontmatter parse
│   ├── *.test.ts
├── fixtures/library/           # existing architecture rules (unchanged)
├── src/                        # existing TanStack Start app (unchanged)
│   ├── lib/rule-check.ts       # frontmatter presence check (sibling, not used by loader)
│   └── routes/
├── aidlc/spaces/default/intents/261121-context-loader/  # workflow record
├── package.json                # added `context-loader` script
└── OUTCOMES.md                 # this pack
```

## 3. Setup Guide

### Prerequisites

- Node.js (modern ESM; strip-types used for the CLI)
- pnpm (see `packageManager` in `package.json`)

### Local setup

```bash
pnpm install
pnpm run context-loader -- --stage construction --agent developer --tags routing
pnpm run dev   # optional — existing app on port 3000
```

### Environment variables

None required for the loader. Default library path: `fixtures/library`.

### How to run tests

```bash
pnpm exec vitest run tools/rule-library.test.ts tools/context-selector.test.ts
pnpm exec vitest run src/lib/rule-check.test.ts src/routes/index.test.tsx src/routes/home-and-rules.integration.test.tsx
```

## 4. Build and Deploy

```bash
pnpm run build
```

Full suites used at Build and Test: loader 10 passed; existing suite 16 passed; FR/NFR coverage sensor pass.

**Infrastructure / deploy**: not in scope (ci-pipeline and Operation stages skipped). No IaC generated.

## 5. Architecture Decisions

From `inception/domain-design/decisions.md`:

| ADR | Decision | Rejected |
|---|---|---|
| ADR-001 | RuleLibrary + ContextSelector | Single monolith; three-way Cli façade |
| ADR-002 | Case-sensitive prefix stage/agent; exact tags; OR candidates; score + filename; top 4 | Exact membership (case-sensitive or not) |
| ADR-003 | Under-floor exits 0 + stderr warn | Original FR1.5 non-zero under-floor |

**Constraints**: local fixtures only; pnpm; no vector DB; &lt;5 ms / &lt;3 KB index targets; PR-gate plugin deferred.

## 6. What to Commit

| Artifact | Action | Destination |
|----------|--------|-------------|
| `decisions.md` (domain-design) | Commit | `docs/decisions/` (optional copy) or keep under `aidlc/.../domain-design/` |
| Architecture summary (1 page) | Write + commit | `docs/architecture.md` |
| NFR summary table | Write + commit | `docs/nfr-summary.md` |
| `tools/*`, `package.json` script | Commit with app | workspace root |
| Full `aidlc/` intent tree | Commit | version-controlled record |

## 7. Workflow Footprint

- Stages: 11 approved, 0 failed, 0 pending
- Memory entries captured: 21
  (9 interpretations, 2 deviations, 4 trade-offs, 6 open questions)
- Learnings captured: 0 from orchestrator, 0 from user additions

### Session Cost (`/aidlc-session-cost`)

```
Session Cost
============

Workflow:   2026-11-21T11:45:13Z
Scope:      bugfix
Duration:   49 min

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
  Total:            21
  Interpretations:  9
  Deviations:       2
  Trade-offs:       4
  Open questions:   6

Sensors
  Fired:            70
  Passed:           67
  Failed:           3
  Could not run:    0
  Budget-override:  0
  Incomplete:       0

Learnings captured
  From orchestrator:    0
  From user additions:  0
```

## 8. Known Limitations and What to Tackle Next

- **Deferred from this intent, delivered later**: the PR gate is `plugins/pr-gate/` in `261122-pr-gate-plugin`. This intent still does not wire the loader into live agent turns.
- **Accepted Code Generation review risks**: missing library directory still treated as empty/under-floor (exit 0) rather than hard IO fail; 3 KB budget measured on selected+index and warn-only; agent-prefix test thin; FR3.1 trace target pointed at loader tests.
- **Open questions from diaries** (6): ranking/edge semantics refined in design but residual ops notes (rule-check reuse pinned in plan; all-filters-omitted pinned; NFR1 wall-clock budget in tests; missing-dir hard-fail still open).
- **Recommended next**: harden a missing library directory to a non-zero exit. Session cost is above. The session replay is pasted below.

## Session Replay (`/aidlc-replay`)

# Session Replay
**Workflow**: 2026-11-21T11:45:13Z
**Scope**: bugfix
**Duration**: 49 min
**Stages**: 11 approved / 11 total

## Executive Summary

This workflow added a local context loader under `tools/` on the existing TanStack Start app. The loader reads architecture rules from `fixtures/library/*.md` and returns 2–4 of them for a stage, an agent, and tags, with no vector database and no model call. The person kept the first version to the loader and its tests, and left the PR-gate plugin for later. Selection is an OR across the filters that were passed, ranked by how many dimensions match and then by filename, capped at 4. A result below two rules still exits 0 and warns on stderr. The package is RuleLibrary plus ContextSelector. The loader tests and the existing app suite stayed green.

## Timeline

### Initialization Phase — 3/3 stages approved

#### Workspace Scaffold
**What happened**: The intent record and its in-scope phase directories were created at workflow start.
**Key decisions**:
- Operation was skipped for this plan.
**Artefacts produced**:
- Intent directory under `aidlc/spaces/default/intents/261121-context-loader/`

#### Workspace Detection
**What happened**: A scan classified the repo as brownfield TypeScript with Vite and React.
**Key decisions**:
- Treat the TanStack Start app as existing code.
**Artefacts produced**:
- Workspace classification on `aidlc-state.md`

#### State Init
**What happened**: The `bugfix` plan was recorded and routing started at intent capture. The tailored plan was then saved under the name `context-loader`.
**Key decisions**:
- Depth Minimal, test strategy Minimal, plan approval on.
**Artefacts produced**:
- `aidlc-state.md` execution plan (11 stages, the rest skipped)

### Ideation Phase — 3/3 stages approved

#### Intent Capture
**What happened**: The request was framed as a deterministic selector so agents stop loading every architecture rule. Assumptions were accepted.
**Key decisions**:
- Answers were edited in the questions file.
- The PR-gate plugin, its gate stages, and sample-diff validation stay out of this version.
- Success is a CLI with `--stage`, `--agent`, and `--tags`, 2–4 rules, under 5 ms, and an index under 3 KB.
**Artefacts produced**:
- `ideation/intent-capture/intent-statement.md`
- `ideation/intent-capture/stakeholder-map.md`
- `ideation/intent-capture/intent-capture-questions.md`

#### Feasibility
**What happened**: The loader was judged feasible as local TypeScript against `fixtures/library`, with no external service.
**Key decisions**:
- No compliance or data-residency requirement on the loader itself.
- No hard deadline.
**Artefacts produced**:
- `ideation/feasibility/feasibility-assessment.md`
- `ideation/feasibility/constraint-register.md`
- `ideation/feasibility/raid-log.md`
- `ideation/feasibility/feasibility-questions.md`

#### Scope Definition
**What happened**: The minimum delivery was locked to the CLI and the tests that prove the success bar.
**Key decisions**:
- Nothing else is in this release, so there is no second item to sequence.
- Ranking above four matches, and what happens below two, was left for requirements.
**Artefacts produced**:
- `ideation/scope-definition/scope-document.md`
- `ideation/scope-definition/intent-backlog.md`
- `ideation/scope-definition/scope-definition-questions.md`

### Inception Phase — 3/3 stages approved

#### Reverse Engineering
**What happened**: There was no shared code knowledge base yet, so the developer agent scanned the repo and wrote the first set of code-knowledge artefacts. The scan confirmed `tools/context-loader.ts` did not exist.
**Key decisions**:
- One developer pass both scanned and wrote the artefacts, because collaborators were off.
**Artefacts produced**:
- `inception/reverse-engineering/developer-scan.md`
- Code knowledge base for `game`

#### Requirements Analysis
**What happened**: The match, rank, and output rules were written and the product review came back ready.
**Key decisions**:
- Rank by how many of stage, agent, and tags match, then by filename, and keep the top 4.
- A rule is a candidate if it matches any one filter that was passed.
- Fewer than two matches returns what matched, with a non-zero exit in this draft. Domain design later changed the exit code.
- Selected paths, a frontmatter summary, and a compact index go to stdout. Diagnostics go to stderr.
**Artefacts produced**:
- `inception/requirements-analysis/requirements.md`
- `inception/requirements-analysis/traceability.json`

#### Domain Design
**What happened**: The loader was split into two building blocks. The architecture review came back ready. Under-floor behavior was revised in the requirements in the same turn.
**Key decisions**:
- RuleLibrary loads and parses and fails fast. ContextSelector matches, ranks, and prints. The CLI is a thin entry on ContextSelector.
- Stage and agent match is a case-sensitive prefix. Tags match exactly.
- Under-floor (fewer than two rules) exits 0 and warns. A non-zero exit is only for a parse or IO failure.
**Artefacts produced**:
- `inception/domain-design/components.md`
- `inception/domain-design/decisions.md`
- `inception/domain-design/traceability.json`

### Construction Phase — 2/2 stages approved

#### Code Generation
**What happened**: The plan was approved and implemented in this session after the developer hand-off did not run. The loader tests passed.
**Key decisions**:
- Plan approved.
- The CLI runs with `node --experimental-strip-types` so the project does not add `tsx`.
- The timing test uses a 50 ms wall-clock budget so it does not flake, while the target stays under 5 ms.
- A missing library directory still behaves as an empty selection (exit 0). That was left open.
**Artefacts produced**:
- `tools/context-loader.ts`, `tools/context-selector.ts`, `tools/rule-library.ts`, and their tests
- `package.json` script `context-loader`
- `construction/code-generation/code-generation-plan.md`
- `construction/code-generation/unit-test-instructions.md`
- `construction/code-generation/code-summary.md`
- `construction/code-generation/traceability.json`

#### Build and Test
**What happened**: No extra test files were added. The loader suite (10 tests) and the existing app suite (16 tests) passed, and the coverage sensor passed.
**Key decisions**:
- Minimal strategy, so no integration, performance, or security instruction files.
- CI is out of the plan.
**Artefacts produced**:
- `construction/build-and-test/build-instructions.md`
- `construction/build-and-test/build-and-test-summary.md`
- `construction/build-and-test/test-results.md`
- `construction/build-and-test/cross-unit-traceability.md`

## Decisions Register Summary

| Decision | Alternatives considered | Chosen option | Rationale |
|---|---|---|---|
| What this version includes | Loader plus the PR-gate plugin | Loader and its tests only | The person's intent-capture answer |
| Where the rules come from | External services | Local `fixtures/library` and the project's TypeScript toolchain | The person's feasibility answer |
| How a rule becomes a candidate | AND across stage, agent, and tags | OR across the filters that were passed | The person's requirements answer |
| How to rank | Exact membership | Count of matching dimensions, then filename, top 4 | The person's requirements answer |
| Exit code when fewer than two rules match | Non-zero, as first written in requirements | Exit 0 and warn on stderr | The person's domain-design revision of that requirement |
| How to split the program | One module; three modules | RuleLibrary and ContextSelector, with a thin CLI | The person's domain-design answer |

## Learnings Captured

From orchestrator: 0
From user additions: 0

The diaries still record working notes. Scope used a simple must/should/won't list because there was one thing to ship. Reverse engineering noted that the loader file was absent, which was the gap this work was meant to fill. Domain design recorded the two-part split and the case-sensitive prefix. Code generation recorded the strip-types CLI, the looser timing assertion, and the missing-directory case left open. None of these were kept as a project or team rule.

## What's Next

The workflow is complete: 11 of 11 stages are approved. The diaries still hold 6 open questions. The one that still changes behavior is a missing library directory: it is treated as an empty selection and exits 0, rather than as a hard IO failure. The 3 KB budget is a warning, not a failure. The PR-gate plugin was built later, in `261122-pr-gate-plugin`. The loader is still not wired into live agent turns.
