# Unit of Work

One unit. It is the thin slice from `requirements.md` and `stories.md`: the app builds, the home page responds, and the rule files parse. The two building blocks in `components.md` stay separate inside it. `decisions.md` did not make them separately deployable, and this phase does not deploy.

## Units

| Unit ID | Directory | Purpose | Components | Deployment | Complexity |
|---|---|---|---|---|---|
| U1 | u1-skeleton | The local TanStack Start app and the rule-file check | HomeApp, RuleLibrary | Runs on the developer's machine. Not deployed in this phase. | S |

The directory name is the unit name. Construction artifacts for this unit go under `construction/u1-skeleton/`.

## U1 — u1-skeleton

Riley can build the app, open the home page, and run the rule check from this one unit.

- HomeApp serves the home page. The only text is "The app is up". The page does not fetch data and does not ask anyone to sign in.
- RuleLibrary checks the Markdown files at `fixtures/library`. A rule is one file, identified by its filename. An invalid file fails the check and names the file. An empty or missing library is not a failed parse.
- The page does not call the check, and the check does not render the page.
- Tests are written after the code they cover. They cover the check and the home route.

No kind is set. `ui` would skip the rule entity and the rules. `library` would skip the home-page screen. Neither kind covers both, so the unit stays untagged.

## Constraints

Local only. No gameplay, account, score, saved progress, or lookup by tag. The styling approach stays unnamed. Frontmatter value types stay unnamed.
