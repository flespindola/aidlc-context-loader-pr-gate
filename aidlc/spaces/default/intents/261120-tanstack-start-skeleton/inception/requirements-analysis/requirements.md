# Requirements

## Sources

- Initial description: create a web project using Tanstack Start, define the architecture rules for it in fixtures/library/*.md with YAML frontmatter (tags, applicable_stages, applicable_agents). We will create a web game from there, but this initial phase aims to setup the project's skeleton. [desc]
- Workflow-selected scope: classic. [scope]
- `aidlc/spaces/default/intents/261120-tanstack-start-skeleton/inception/practices-discovery/team-practices.md` — feature branches merge into `main` by pull request; always build a thin end-to-end slice first; tests are written after the code; staging on merge and a manual production approval apply when a deploy exists; Prettier and ESLint, ordinary TypeScript naming.
- `aidlc/spaces/default/intents/261120-tanstack-start-skeleton/inception/requirements-analysis/requirements-analysis-questions.md` — the seven answers below.
- `intent-statement` and `scope-document` are not in this record. Ideation was not run.

## Intent analysis

This phase stands up a TanStack Start application that a person can run locally, and a small library of architecture rules that people working in the repo can read. The web game is a later phase. The thin slice that has to run all the way through is: the app builds, one page responds in the browser, and every rule file parses.

The rules are written for people in the repo. The original request still requires each file to carry `tags`, `applicable_stages`, and `applicable_agents`, so those fields stay in the file. They are labels on the rule, not a second audience.

## Functional requirements

### FR1 — Local TanStack Start app

The system shall be a TanStack Start application that a person can build and open on their own machine.

- **FR1.1** The application build completes without error from a clean checkout, using the project's pinned toolchain.
- **FR1.2** One route, the home page, responds in the browser on the local dev server and shows text that the app is up. The page has no game content.

Given a clean checkout
When the person builds the app and opens the home route on the local dev server
Then the build succeeds and the browser shows the home page

Given the home page
When the person looks at it
Then it does not show gameplay, an account, a score, or saved progress

### FR2 — Architecture rule library

The system shall keep architecture rules as one Markdown file per rule, for people working in the repo.

- **FR2.1** Rule files live at `fixtures/library/*.md` and nowhere else in this phase.
- **FR2.2** Each rule file starts with YAML frontmatter that includes `tags`, `applicable_stages`, and `applicable_agents`. A file missing any of those three fields is invalid.
- **FR2.3** Under the frontmatter, the body is plain prose with three parts: the rule, why it exists, and a short example. There is no required heading set.
- **FR2.4** `fixtures/library/app-structure.md` — New application code follows the TanStack Start layout for routes, server code, and UI. It does not add a second top-level source tree.
- **FR2.5** `fixtures/library/routing.md` — Each screen is a route. This phase has one route, the home page.
- **FR2.6** `fixtures/library/server-data.md` — Server-only data access stays in server functions. The home page does not fetch data.
- **FR2.7** `fixtures/library/styling.md` — Styling uses one approach for the app. This phase does not add a second styling system.
- **FR2.8** `fixtures/library/testing.md` — Tests are written after the code they cover. This phase includes a test that rule files have the required frontmatter and a test that the home route responds.

The filename is the rule's identity. Two files are two rules, even when their titles are similar.

Given the five starter files
When a person opens one
Then it has the three frontmatter fields and a prose body with the rule, why it exists, and a short example

### FR3 — Rule file checks

The system shall check every `fixtures/library/*.md` file and tell the person when a file is not a valid rule.

- **FR3.1** An invalid file fails the check. The failure names the file and what is wrong (missing field, or unreadable frontmatter). A valid file in the same folder is still reported as valid. The check does not treat an invalid file as a rule.
- **FR3.2** An empty `fixtures/library` directory is not a failed parse. The check reports that there are no rule files, and the home page still responds.

Given one rule file with no `tags` field and four valid files
When the check runs
Then the check fails, names that file and the missing field, and does not count the broken file as a rule

Given `fixtures/library` contains no markdown files
When the person opens the home page and runs the check
Then the home page responds and the check reports that there are no rule files

### FR4 — Automated tests

The system shall include automated tests, written after the code they cover, that prove the slice connects.

- **FR4.1** At least one test builds the pass and fail cases for FR3, including a missing required frontmatter field and an empty library.
- **FR4.2** At least one test shows the home route responds.

Given the tests exist
When the person runs the project's test command
Then the frontmatter cases and the home-route case pass

## Non-functional requirements

### NFR1 — Local only this phase

The system shall run on the developer's machine. This phase does not deploy to staging or production, and it does not publish a preview URL. The team practice of staging on merge, with production waiting for a manual approval, starts when the game is deployed.

Pass: a person can build, test, and open the home page without a remote host.
Fail: this phase requires a staging, preview, or production deploy.

### NFR2 — No sign-in on the home page

The home page shall be readable in a browser without an account, a session, or a network service beyond the local dev server.

Pass: opening the home route shows the page with no login step.
Fail: the page asks the person to sign in, or it waits on a remote API.

## Constraints

- The application framework is TanStack Start.
- Rule files are Markdown under `fixtures/library/` with YAML frontmatter.
- The frontmatter fields are `tags`, `applicable_stages`, and `applicable_agents`, as named in the initial description.
- Naming stays ordinary TypeScript. Formatting and linting use Prettier and ESLint once the project has them.
- Work merges into `main` through a short-lived branch and a pull request.
- Tests are written after the implementation they cover.

## Assumptions

- The home page is a static "app is up" document. It has no custom widgets, so the browser's default page is enough for keyboard and screen-reader use. There is no separate loading or error view, because the page does not fetch remote data. [assumption]
- `applicable_agents` remains in every rule file because the initial description required that field. The people reading the rules are the audience from Q2. The field does not add agent-only behavior in this phase. [assumption]
- The short example in each rule body is written when the file is created, and it illustrates that file's one-line rule. The one-line rule itself is the locked statement. [assumption]
- A missing `fixtures/library` directory is treated the same as an empty one: the home page still responds, and the check reports that there are no rule files. [assumption]
- Odd filenames (spaces, non-ASCII) under `fixtures/library/*.md` are parsed by the same frontmatter rules as plain names. The filename is kept as the identity. [assumption]

## Out of scope

- Gameplay, accounts, scores, and saved progress.
- A sample screen that stands in for the game.
- A lookup API that finds a rule by tag, stage, or agent.
- Staging, production, and per-branch preview deploys.
- Sign-in, sessions, and personal data.
- A second styling system, a second source tree, or a data fetch on the home page.

## Open questions

None. The five starter rules are named above. A change to that list is a change to these requirements.
