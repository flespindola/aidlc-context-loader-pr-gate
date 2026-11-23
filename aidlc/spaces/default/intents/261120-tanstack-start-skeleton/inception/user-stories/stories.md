# User Stories

One story per requirement ID in `aidlc/spaces/default/intents/261120-tanstack-start-skeleton/inception/requirements-analysis/requirements.md`, including each sub-requirement. Persona: Riley, a developer on this repo. Team practice: tests are written after the code they cover. This phase does not deploy.

All of these stories are **Must Have**. Gameplay, accounts, scores, saved progress, a lookup by tag, and any deploy are **Won't Have** for this phase. They stay in the requirements out-of-scope list and are not extra stories.

## Dependencies

- US1.3 follows US1.2. The home page is opened from an app that builds.
- US2.5 through US2.9 follow US2.2, US2.3, and US2.4. Each named rule file uses the shared location, frontmatter, and prose body.
- US4.2 follows US3.2 and US3.3. The parser tests cover those checks.
- US4.3 follows US1.3. The route test covers the home page.
- Parent stories (US1.1, US2.1, US3.1, US4.1) are the outcome. The numbered slices under them are the independent checks.

## US1 — The app

### US1.1 — A TanStack Start app on Riley's machine

Traces to FR1. **Must Have.** Depends on none.

As Riley, a developer on this repo, I want a TanStack Start app I can run on my machine, so that the skeleton is a real application.

**AC1.1.1**
Given a clean checkout of this repo
When Riley follows the project instructions to run the app
Then a TanStack Start app starts on Riley's machine

**AC1.1.2**
Given the app is running
When Riley looks for game content, an account, or a score
Then none of those are part of this app

INVEST: valuable and testable on its own. US1.2 and US1.3 are the smaller checks inside this outcome.

### US1.2 — The app builds

Traces to FR1.1. **Must Have.** Depends on none.

As Riley, a developer on this repo, I want the app to build from a clean checkout, so that I know the skeleton compiles before I open it.

**AC1.2.1**
Given a clean checkout and the project's pinned toolchain
When Riley runs the build
Then the build finishes without error

**AC1.2.2**
Given the build command is the one the project documents
When Riley runs it a second time from the same checkout
Then the build finishes without error again

INVEST: independent of the rule files. Small enough to test with one command.

### US1.3 — The home page responds

Traces to FR1.2. **Must Have.** Depends on US1.2.

As Riley, a developer on this repo, I want the home page to respond in the browser, so that I can see the app is up.

**AC1.3.1**
Given the local dev server is running
When Riley opens the home route in a browser
Then the page responds and shows text that the app is up

**AC1.3.2**
Given the home page is open
When Riley reads it
Then it shows no gameplay, account, score, or saved progress

INVEST: the only screen in this phase. Testable in a browser.

## US2 — The rule library

### US2.1 — Architecture rules Riley can read

Traces to FR2. **Must Have.** Depends on none.

As Riley, a developer on this repo, I want architecture rules stored as one Markdown file each, so that I can read what this project requires.

**AC2.1.1**
Given the rule library
When Riley opens the library
Then each rule is its own Markdown file

**AC2.1.2**
Given two files with similar titles
When Riley compares them
Then they remain two rules, identified by filename

INVEST: the library outcome. The slices below are the independent checks.

### US2.2 — Rules live in fixtures/library

Traces to FR2.1. **Must Have.** Depends on none.

As Riley, a developer on this repo, I want every rule file under `fixtures/library`, so that I know where to look and where not to put a rule.

**AC2.2.1**
Given the five starter rules
When Riley looks them up
Then each file is at `fixtures/library/*.md`

**AC2.2.2**
Given a Markdown file that is not under `fixtures/library`
When Riley runs the rule check
Then that file is not treated as a rule

INVEST: one location, one check.

### US2.3 — Required frontmatter

Traces to FR2.2. **Must Have.** Depends on US2.2.

As Riley, a developer on this repo, I want each rule file to carry `tags`, `applicable_stages`, and `applicable_agents`, so that a file missing one of them is not a valid rule.

**AC2.3.1**
Given a rule file
When Riley reads its frontmatter
Then `tags`, `applicable_stages`, and `applicable_agents` are all present

**AC2.3.2**
Given a rule file missing any one of those three fields
When Riley runs the check
Then the file is invalid

INVEST: testable by reading frontmatter. The value vocabulary was left open in the approved requirements and is not added here.

### US2.4 — Prose body

Traces to FR2.3. **Must Have.** Depends on US2.3.

As Riley, a developer on this repo, I want the body of a rule to say the rule, why it exists, and a short example, so that I can follow it without a fixed heading template.

**AC2.4.1**
Given a valid rule file
When Riley reads below the frontmatter
Then the prose states the rule, why it exists, and a short example

**AC2.4.2**
Given that body
When Riley looks for required headings
Then none are required

INVEST: independent of which rule it is. The example illustrates the one-line rule and does not add a second locked choice.

### US2.5 — App structure rule

Traces to FR2.4. **Must Have.** Depends on US2.2, US2.3, US2.4.

As Riley, a developer on this repo, I want `fixtures/library/app-structure.md` to say that new code follows the TanStack Start layout, so that I do not add a second source tree.

**AC2.5.1**
Given `fixtures/library/app-structure.md`
When Riley reads it
Then it is a valid rule file and its rule is that new application code follows the TanStack Start layout for routes, server code, and UI

**AC2.5.2**
Given that rule
When Riley reads the example
Then the example does not introduce a second top-level source tree

INVEST: one file, one rule. Directory names stay as the approved sentence left them.

### US2.6 — Routing rule

Traces to FR2.5. **Must Have.** Depends on US2.2, US2.3, US2.4.

As Riley, a developer on this repo, I want `fixtures/library/routing.md` to say that each screen is a route, so that this phase has one route, the home page.

**AC2.6.1**
Given `fixtures/library/routing.md`
When Riley reads it
Then it is a valid rule file and its rule is that each screen is a route

**AC2.6.2**
Given this phase
When Riley lists the routes the rule allows
Then the only route is the home page

INVEST: independent of the other rule files.

### US2.7 — Server data rule

Traces to FR2.6. **Must Have.** Depends on US2.2, US2.3, US2.4.

As Riley, a developer on this repo, I want `fixtures/library/server-data.md` to keep server-only data in server functions, so that the home page does not fetch data.

**AC2.7.1**
Given `fixtures/library/server-data.md`
When Riley reads it
Then it is a valid rule file and its rule is that server-only data access stays in server functions

**AC2.7.2**
Given the home page
When Riley loads it
Then the page does not fetch data

INVEST: independent. The home page check is the example of this rule in this phase.

### US2.8 — Styling rule

Traces to FR2.7. **Must Have.** Depends on US2.2, US2.3, US2.4.

As Riley, a developer on this repo, I want `fixtures/library/styling.md` to require one styling approach, so that this phase does not add a second styling system.

**AC2.8.1**
Given `fixtures/library/styling.md`
When Riley reads it
Then it is a valid rule file and its rule is that styling uses one approach

**AC2.8.2**
Given this phase
When Riley looks for a second styling system
Then there is not one

INVEST: one file. The named approach stays as the approved sentence left it.

### US2.9 — Testing rule

Traces to FR2.8. **Must Have.** Depends on US2.2, US2.3, US2.4.

As Riley, a developer on this repo, I want `fixtures/library/testing.md` to say that tests are written after the code they cover, so that this phase includes a frontmatter test and a home-route test.

**AC2.9.1**
Given `fixtures/library/testing.md`
When Riley reads it
Then it is a valid rule file and its rule is that tests are written after the code they cover

**AC2.9.2**
Given that rule
When Riley reads what this phase must test
Then it names a frontmatter check and a home-route check

INVEST: the rule about tests, separate from the test stories in US4.

## US3 — The checks

### US3.1 — Rule files are checked

Traces to FR3. **Must Have.** Depends on US2.2.

As Riley, a developer on this repo, I want every `fixtures/library/*.md` file checked, so that I am told when a file is not a valid rule.

**AC3.1.1**
Given one or more files in `fixtures/library`
When Riley runs the check
Then each Markdown file there is checked

**AC3.1.2**
Given a file that is not a valid rule
When Riley runs the check
Then Riley is told that file is not a valid rule

INVEST: the check outcome. US3.2 and US3.3 are the two cases.

### US3.2 — An invalid file is named

Traces to FR3.1. **Must Have.** Depends on US3.1.

As Riley, a developer on this repo, I want an invalid rule file to fail the check and name what is wrong, so that I can fix that file without guessing.

**AC3.2.1**
Given four valid rule files and one file with no `tags` field
When Riley runs the check
Then the check fails, names that file and the missing field, and does not count the broken file as a rule

**AC3.2.2**
Given a rule file whose frontmatter is not readable
When Riley runs the check
Then the check fails and names that file

INVEST: one failure mode. The valid neighbors stay valid.

### US3.3 — An empty library is not a parse failure

Traces to FR3.2. **Must Have.** Depends on US1.3.

As Riley, a developer on this repo, I want an empty rule folder to be reported as no rules, so that the home page still responds.

**AC3.3.1**
Given `fixtures/library` contains no Markdown files
When Riley opens the home page and runs the check
Then the home page responds and the check reports that there are no rule files

**AC3.3.2**
Given that empty folder
When Riley reads the check result
Then it is not reported as a failed parse

INVEST: distinct from US3.2. The home page does not depend on a rule file being present.

## US4 — The tests

### US4.1 — Automated tests prove the slice

Traces to FR4. **Must Have.** Depends on US1.3 and US3.1.

As Riley, a developer on this repo, I want automated tests written after the code they cover, so that I can prove the slice connects.

**AC4.1.1**
Given the code for the home page and the rule check exists
When the tests are added
Then they are written after that code, not before it

**AC4.1.2**
Given those tests
When Riley runs the project's test command
Then the command runs the slice tests

INVEST: the testing outcome. US4.2 and US4.3 are the two tests.

### US4.2 — Tests for the rule check

Traces to FR4.1. **Must Have.** Depends on US3.2 and US3.3.

As Riley, a developer on this repo, I want tests for a missing frontmatter field and for an empty library, so that those checks stay true.

**AC4.2.1**
Given the test suite
When Riley runs it
Then a test fails the check for a file missing a required frontmatter field and names that case

**AC4.2.2**
Given the test suite
When Riley runs it
Then a test reports an empty library as no rule files, not as a failed parse

INVEST: covers US3.2 and US3.3 without replacing those stories.

### US4.3 — A test that the home route responds

Traces to FR4.2. **Must Have.** Depends on US1.3.

As Riley, a developer on this repo, I want a test that the home route responds, so that the page check is not only manual.

**AC4.3.1**
Given the test suite
When Riley runs it
Then a test shows the home route responds

**AC4.3.2**
Given that test
When the home route does not respond
Then the test fails

INVEST: one route, one test.

## US5 — How this phase runs

### US5.1 — Local only

Traces to NFR1. **Must Have.** Depends on US1.1.

As Riley, a developer on this repo, I want to build, test, and open the home page on my machine, so that this phase does not need a deploy.

**AC5.1.1**
Given Riley's machine
When Riley builds, tests, and opens the home page
Then none of those steps require staging, production, or a preview URL

**AC5.1.2**
Given this phase
When Riley looks for a deploy step
Then there is not one

INVEST: a constraint on the whole slice. Testable by the absence of a deploy.

### US5.2 — No sign-in

Traces to NFR2. **Must Have.** Depends on US1.3.

As Riley, a developer on this repo, I want the home page to open without signing in, so that I can see the app is up immediately.

**AC5.2.1**
Given the local dev server
When Riley opens the home route
Then the page is shown with no login step

**AC5.2.2**
Given the home page
When it loads
Then it does not wait on a remote API

INVEST: independent of the rule files. One page, no account.
