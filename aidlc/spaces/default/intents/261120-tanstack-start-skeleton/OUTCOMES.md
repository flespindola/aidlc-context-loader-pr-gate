# Outcomes Pack
**Intent**: 261120-tanstack-start-skeleton
**Scope**: classic
**Stages delivered**: 16 approved / 17 total
**Duration**: 1211 min

## 1. What Was Built

- **Project**: TanStack Start web skeleton for a future game — one home page plus architecture rules under `fixtures/library/*.md` with YAML frontmatter (`tags`, `applicable_stages`, `applicable_agents`).
- **Scope ran**: `classic` (Standard depth, Standard test strategy). Greenfield.
- **Unit delivered**: `u1-skeleton` — HomeApp (home route) + RuleLibrary (`src/lib/rule-check.ts` + five starter rules). Neither component calls the other.
- **Key decisions**: Two components (ADR-001); Rule entity owned by RuleLibrary with filename as id (ADR-002); blank TanStack Start layout; no CSS framework; no deploy.
- **Tech stack (pins from `package.json`)**: pnpm 10.33.2; TypeScript ^6.0.2; Vite ^8.0.0; Vitest ^5.1.1; React ^19.2.0; `@tanstack/react-router` 1.170.46; `@tanstack/react-start` 1.169.7.

## 2. Repository Structure

```
game/
├── src/
│   ├── routes/index.tsx          # HomeApp — "The app is up"
│   ├── routes/__root.tsx
│   ├── lib/rule-check.ts         # RuleLibrary check
│   ├── lib/rule-check.test.ts
│   ├── routes/index.test.tsx
│   └── routes/home-and-rules.integration.test.tsx
├── fixtures/library/             # five starter architecture rules
├── package.json / vite / vitest / eslint / prettier
├── README.md                     # local build / test / open
└── aidlc/.../261120-tanstack-start-skeleton/   # this intent's record
```

## 3. Setup Guide

### Prerequisites

- Node.js, pnpm (see `packageManager` in `package.json`)

### Local setup

```bash
pnpm install
pnpm build
pnpm dev
```

Open http://localhost:3000 — heading "The app is up".

### Environment variables

None.

### How to run tests

```bash
pnpm exec vitest run src/lib/rule-check.test.ts src/routes/index.test.tsx src/routes/home-and-rules.integration.test.tsx
```

## 4. Build and Deploy

```bash
pnpm build
```

Build and Test recorded: suite 16 passed; `pnpm build` exit 0; home heading checked in Chrome. No deploy script; Operation / CI Pipeline stages skipped.

## 5. Architecture Decisions

From `inception/domain-design/decisions.md`:

| ADR | Decision | Rejected |
|---|---|---|
| ADR-001 | HomeApp and RuleLibrary as two components; no calls between them | One block owning both page and check |
| ADR-002 | RuleLibrary owns Rule (filename id); frontmatter value kinds left open | Separate entity type per starter file |

**Constraints**: local-only; no sign-in; no remote fetch on home; classic Guard Policy off for that scope; CI not in plan.

## 6. What to Commit

| Artifact | Action | Destination |
|----------|--------|-------------|
| Domain / unit design under this intent | Commit | `aidlc/spaces/default/intents/261120-tanstack-start-skeleton/` |
| App + fixtures + README | Commit | workspace root |
| Architecture / NFR docs (optional copies) | Write + commit | `docs/` if desired |

## 7. Workflow Footprint

- Stages: 16 approved, 0 failed, 1 pending
- Memory entries captured: 24
  (8 interpretations, 5 deviations, 5 trade-offs, 6 open questions)
- Learnings captured: 0 from orchestrator, 0 from user additions

### Session Cost (`/aidlc-session-cost` while this intent was active)

```
Session Cost
============

Workflow:   2026-11-20T15:15:50Z
Scope:      classic
Duration:   1211 min

Stages
  Total:      17
  Approved:   16
  Failed:     0
  Pending:    1

By phase
  initialization    3/3 approved
  inception         7/8 approved, 1 pending
  construction      6/6 approved

Memory entries
  Total:            24
  Interpretations:  8
  Deviations:       5
  Trade-offs:       5
  Open questions:   6

Sensors
  Fired:            84
  Passed:           83
  Failed:           1
  Could not run:    0
  Budget-override:  0
  Incomplete:       0

Learnings captured
  From orchestrator:    0
  From user additions:  0
```

## 8. Known Limitations and What to Tackle Next

- **Pending stage in runtime summary**: 1 of 17 still pending in the graph (inception) while construction completed — reconcile if a stage was left incomplete vs skipped in state.
- **Deferred**: CI pipeline, deploy, gameplay/accounts/scores, second routes, CSS framework.
- **Follow-on delivered separately**: the context loader (`261121-context-loader`) and the PR gate (`261122-pr-gate-plugin`).
- **Recommended next**: the session replay is pasted below. Loader edge cases stay in that intent’s pack.

## Session Replay (`/aidlc-replay`)

# Session Replay
**Workflow**: 2026-11-20T15:15:50Z
**Scope**: classic
**Duration**: 1211 min
**Stages**: 16 approved / 17 total

## Executive Summary

This workflow created the TanStack Start skeleton the later game work sits on. The slice is one home page that says "The app is up", plus five architecture rules under `fixtures/library/*.md` with YAML frontmatter. The person kept gameplay, accounts, scores, and deploy out of this phase, and chose two parts that do not call each other: the home page, and a check that the rule files parse. They also set the team practices: short-lived branches into `main`, a thin slice first, tests after the code, and Prettier plus ESLint. One unit, `u1-skeleton`, was built from the blank TanStack Start starter with pnpm. Vitest passed 16 tests, the production build exited 0, and the heading was checked in the browser. Contract design is the one stage the summary still counts as pending: it started and was then skipped because the single unit has no API edge.

## Timeline

### Initialization Phase — 3/3 stages approved

#### Workspace Scaffold
**What happened**: The intent record and its in-scope phase directories were created. Ideation was not in this plan.
**Key decisions**:
- Greenfield classic scope, Standard depth, Standard test strategy.
**Artefacts produced**:
- Intent directory under `aidlc/spaces/default/intents/261120-tanstack-start-skeleton/`

#### Workspace Detection
**What happened**: A scan classified the workspace as greenfield, with no language or framework yet.
**Key decisions**:
- Start from an empty project rather than an existing app.
**Artefacts produced**:
- Workspace classification on `aidlc-state.md`

#### State Init
**What happened**: The classic plan was recorded and routing started at practices discovery.
**Key decisions**:
- Reverse engineering was skipped because the project was greenfield.
- Operation and CI were not in the plan.
**Artefacts produced**:
- `aidlc-state.md` execution plan (17 stages in the summary, the rest skipped)

### Inception Phase — 7/8 stages approved, 1 pending

#### Practices Discovery
**What happened**: The person answered the practice questions in chat, using the suggested answers where they agreed.
**Key decisions**:
- Short-lived feature branches, each merged into `main` with a pull request.
- Build a thin slice and prove it end to end before the rest.
- Staging would update on every merge; production waits for a separate approval. This phase does not build that.
- Tests come after the code for each layer.
- Follow Prettier and ESLint once they exist. No project-wide rename rule.
**Artefacts produced**:
- `inception/practices-discovery/` practice record

#### Requirements Analysis
**What happened**: The slice was written down and approved: one page, a starter rule set, local only.
**Key decisions**:
- A TanStack Start app that builds and serves one page, plus `fixtures/library`. No game features.
- Readers are people working in the repo.
- Starter rules cover app structure, routing, server data, styling, and tests. Each file is plain prose: the rule, why it exists, and a short example.
- Proof is a build, one route in the browser, and tests for the parser and that route.
- This phase runs on the developer's machine. Staging and production start with the game.
**Artefacts produced**:
- `inception/requirements-analysis/requirements.md`

#### User Stories
**What happened**: The requirements were turned into stories for one reader and approved.
**Key decisions**:
- One persona, a developer on this repo.
- One story per requirement id, including each sub-requirement.
**Artefacts produced**:
- `inception/user-stories/` stories and trace

#### Refined Mockups
**What happened**: The home page was specified as a single heading and approved.
**Key decisions**:
- The only visible text is "The app is up". No controls.
- Loading, empty, and error are not separate screens, because the page does not fetch data and does not show rule-check failures.
- The styling approach stayed unnamed.
**Artefacts produced**:
- `inception/refined-mockups/` page specification

#### Domain Design
**What happened**: The slice was split into two building blocks and approved.
**Key decisions**:
- Home page and rule-file check do not call each other. The home page must not read the rule files.
- One Rule entity, identified by filename. Frontmatter value types stayed unnamed.
**Artefacts produced**:
- `inception/domain-design/decisions.md`
- `inception/domain-design/components.md`

#### Units Generation
**What happened**: The plan for one unit was approved.
**Key decisions**:
- One unit, `u1-skeleton`, holds both the home page and the rule check.
- No edge between parts, because they do not call each other and this phase does not deploy.
**Artefacts produced**:
- Unit model for `u1-skeleton`

#### Contract Design
**What happened**: The stage started, then stopped. The summary still counts it as pending.
**Key decisions**:
- Skipped at runtime: one unit has no edge to another unit. The home page is opened on the developer machine and is not an API. The rule files are Markdown in the repo, not an API.
**Artefacts produced**:
- None. The diary for this stage has no entries.

#### Delivery Planning
**What happened**: Construction was planned as one pass over the single unit and approved.
**Key decisions**:
- One construction pass for `u1-skeleton`. No score, no second pass, no external hold-up.
- No test command existed yet, so the project check was left unset until the first completion checkpoint.
**Artefacts produced**:
- `inception/delivery-planning/` plan

### Construction Phase — 6/6 stages approved

#### Functional Design
**What happened**: The unit was specified as one local slice and approved. HomeApp shows the heading and does not read rules. RuleLibrary checks markdown under `fixtures/library`.
**Key decisions**:
- One Rule entity. The five starter statements are rules about files, not five entity types.
- Missing-directory and odd-filename cases stayed assumptions, not business rules.
**Artefacts produced**:
- `construction/u1-skeleton/functional-design/functional-spec.md`
- `construction/u1-skeleton/functional-design/frontend-components.md`
- `construction/u1-skeleton/functional-design/entities.md`
- `construction/u1-skeleton/functional-design/rules.md`

#### NFR Requirements
**What happened**: The non-functional targets were kept to what the requirements already said, and the stage was approved.
**Key decisions**:
- Local, no sign-in. No latency number, availability percentage, or monitoring product.
- The stack records TanStack Start, TypeScript, Prettier, and ESLint. The package manager, test runner, and styling stayed unnamed at this point.
**Artefacts produced**:
- `construction/u1-skeleton/nfr-requirements/` performance, security, scalability, reliability, observability, and tech-stack notes

#### NFR Design
**What happened**: The design kept the slice local and was approved.
**Key decisions**:
- No cache, login, load balancer, retry policy, or monitoring product.
- The two parts stay separate so a bad rule file cannot change the home page.
**Artefacts produced**:
- `construction/u1-skeleton/nfr-design/` design notes for the same quality attributes

#### Infrastructure Design
**What happened**: Hosting was specified as the developer's machine and the stage was approved.
**Key decisions**:
- No cloud service, monitor, or pipeline in this phase.
- Staging-on-merge stays a later practice. This phase does not build it.
**Artefacts produced**:
- `construction/u1-skeleton/infrastructure-design/infrastructure-specification.md`
- `construction/u1-skeleton/infrastructure-design/monitoring-design.md`
- `construction/u1-skeleton/infrastructure-design/cicd-pipeline.md`

#### Code Generation
**What happened**: The plan was approved and the blank starter was turned into the home page, the rule check, and the five rule files. Tests were written after each layer. Vitest passed 16 tests and the build finished.
**Key decisions**:
- Blank TanStack Start starter with pnpm, so the project does not arrive with Tailwind or sample screens.
- Frontmatter value kinds and the styling approach stayed unnamed.
**Artefacts produced**:
- `src/routes/index.tsx`, `src/lib/rule-check.ts`, route and rule tests, `fixtures/library/`
- `construction/u1-skeleton/code-generation/code-generation-plan.md`
- `construction/u1-skeleton/code-generation/code-summary.md`
- `construction/u1-skeleton/code-generation/source-manifest.json`

#### Build and Test
**What happened**: The suite was run again (16 passed), `pnpm build` exited 0, and the home heading was opened in the browser. The stage was approved.
**Key decisions**:
- Classic has no coverage floor, and CI is skipped, so a green suite is the check.
- The heading was also checked in Chrome because the unit tests render in Node.
**Artefacts produced**:
- `construction/build-and-test/build-instructions.md`
- `construction/build-and-test/integration-test-instructions.md`
- `construction/build-and-test/build-and-test-summary.md`
- `construction/build-and-test/test-results.md`
- `construction/build-and-test/cross-unit-traceability.md`

## Decisions Register Summary

| Decision | Alternatives considered | Chosen option | Rationale |
|---|---|---|---|
| How code lands | Longer-lived branches | Short-lived feature branches merged into `main` by pull request | The person's practices answer |
| How much to build first | Follow the classic plan's off stance for a thin slice | Build the thin slice and prove it end to end first | The person's practices answer |
| When tests are written | Before the code | After each layer | The person's practices answer |
| What this phase contains | A playable game | One page plus the rule library, on the developer's machine | The person's requirements answers |
| How the slice is split | One block that owns the page and the check | Home page and rule check, with no call between them | The person's domain-design answer |
| How the app is scaffolded | A starter that includes a CSS framework and sample screens | Blank TanStack Start starter and pnpm | Approved code plan, so styling stays a later choice |
| Whether to design a contract | Design an API between parts | Skip: one unit, no external API | The stage's own skip reason |

## Learnings Captured

From orchestrator: 0
From user additions: 0

The diaries still record working notes. Practices discovery recorded that the person's answers override the suggested defaults, including building the thin slice first. Requirements and design kept frontmatter value kinds and styling unnamed on purpose. Units generation recorded why one unit holds both parts and still has no edge. Delivery planning left the project test command unset until a command existed. Code generation recorded the blank starter. Build and test recorded the browser check because the tests run in Node. None of these were kept as a project or team rule beyond the practices the person already affirmed.

## What's Next

Construction is complete and the app runs locally. The summary still has 1 pending stage of 17: contract design, which was skipped because there is no API to specify. The diaries hold 6 open questions, mostly assumptions that were never promoted to rules (a missing library directory, odd filenames, and how `applicable_agents` behaves). Gameplay, accounts, scores, a second route, a CSS framework, CI, and deploy stayed out of this phase. The context loader (`261121-context-loader`) and the PR-gate plugin (`261122-pr-gate-plugin`) were built later on this skeleton.
