# Requirements Analysis Questions

The request is a TanStack Start skeleton and architecture-rule files. The web game comes later. These questions settle what this phase must contain.

## Q1. [Product manager] What must the first thin slice do?

You asked for a TanStack Start project and architecture-rule files, with the game coming later. This is the first thing that has to run all the way through.

A. A TanStack Start app that builds and serves one page, plus the architecture-rule files under fixtures/library. No game features.
B. That app and those files, plus one sample screen that stands in for the future game.
C. Only the architecture-rule files. No running web app in this phase.
D. The running app, the rule files, and a way to look a rule up by its tags, stage, or agent.
X. Other (please specify)

[Answer]: A. A TanStack Start app that builds and serves one page, plus the architecture-rule files under fixtures/library. No game features.

## Q2. [Product manager] Who are the architecture rules for?

Each rule file will carry tags, the stages it applies to, and the agents it applies to. This decides who has to be able to read and follow them.

A. Later agents, so they follow the rules when they design and build.
B. People working in the repo.
C. Both agents and people.
X. Other (please specify)

[Answer]: B. People working in the repo.

## Q3. [Product manager] What stays out of this phase?

You said the web game comes after this skeleton. This draws the line so the requirements do not grow into the game.

A. No gameplay, accounts, scores, or saved progress. Only the app shell and the rule library.
B. A placeholder route for the future game, and still no rules of play, accounts, or scores.
C. Accounts in this phase, because the game will need them. Gameplay still waits.
X. Other (please specify)

[Answer]: A. No gameplay, accounts, scores, or saved progress. Only the app shell and the rule library.

## Q4. [Developer] Which rules belong in the first library?

The folder is fixtures/library, one markdown file per rule. This decides whether this phase writes a real rule set or only the place the rules will go.

A. A starter set covering app structure, routing, server data, styling, and tests. The named list is shown before it is locked.
B. Only the file shape and one example rule. The real rules arrive with the game.
C. Do not invent rules. The rule list will be given separately.
X. Other (please specify)

[Answer]: A. A starter set covering app structure, routing, server data, styling, and tests. The named list is shown before it is locked.

## Q5. [Developer] How is the body of a rule file written?

The frontmatter is already named: tags, applicable_stages, and applicable_agents. This is the markdown under that frontmatter.

A. Plain prose: the rule, why it exists, and a short example.
B. Fixed headings: Rule, Applies when, Example, Do not.
C. Frontmatter only. The body can be anything as long as those three fields are present.
X. Other (please specify)

[Answer]: A. Plain prose: the rule, why it exists, and a short example.

## Q6. [Quality engineer] What shows the slice works?

Tests are written after the code. This is the check that the pieces actually connect.

A. The app builds, one route responds in the browser, and every rule file parses with the required frontmatter. Automated tests cover the parser and that route.
B. The app builds and one route responds, and the rule files parse. No automated tests in this phase.
C. A person checks it by hand. Automated checks wait until the game.
X. Other (please specify)

[Answer]: A. The app builds, one route responds in the browser, and every rule file parses with the required frontmatter. Automated tests cover the parser and that route.

## Q7. [Release engineer] Where does this skeleton run in this phase?

Staging updates on every merge, and production waits for a manual approval. This phase may not have a place to deploy yet.

A. On your machine only. Staging and production start with the game.
B. Staging updates on every merge, including this skeleton. Production still waits for approval.
C. On your machine, and a preview URL for each branch. Production waits.
X. Other (please specify)

[Answer]: A. On your machine only. Staging and production start with the game.
