# Rules — u1-skeleton

The YAML block is the source of truth for the business rules.

```yaml
rules:
  - id: BR1.1
    statement: The application builds and starts on the developer's machine.
    category: constraint
    applies_to: HomeApp
    trigger: The person builds or starts the application from a clean checkout.
    logic: IF the person runs the build, THEN it finishes. IF the person starts the application, THEN it starts. A second build also finishes.
    violation: The build does not finish, or the application does not start.
    source: FR1.1
  - id: BR1.2
    statement: The home route shows the sentence "The app is up" and no game content.
    category: policy
    applies_to: HomeApp
    trigger: The person opens the home route.
    logic: IF the home route is open, THEN the page shows the heading "The app is up" and the browser tab uses the same sentence. The page shows no gameplay, account, score, saved progress, sample game screen, navigation, button, image, or rule list.
    violation: The home route shows other content, or it does not show that sentence.
    source: FR1.2
  - id: BR1.3
    statement: Opening the home route needs no account and no remote service.
    category: policy
    applies_to: HomeApp
    trigger: The person opens the home route.
    logic: IF the person opens the home route, THEN the page is readable with no sign-in and it does not wait on a remote API.
    violation: The page asks for sign-in, or it waits on a remote API.
    source: NFR2
  - id: BR1.4
    statement: This phase stays on the developer's machine.
    category: constraint
    applies_to: HomeApp
    trigger: The person builds, tests, or opens the home page.
    logic: IF the person builds, tests, or opens the home page, THEN none of those steps needs a staging host, a preview URL, or a production host. This phase has no deploy step.
    violation: This phase requires a staging, preview, or production deploy.
    source: NFR1
  - id: BR2.1
    statement: A rule is one markdown file under fixtures/library, and the filename is its identity.
    category: constraint
    applies_to: Rule
    trigger: A person adds or reads a rule.
    logic: IF a markdown file is under fixtures/library, THEN it is one rule and its filename is its identity. IF two files have different names, THEN they are two rules. IF a markdown file is outside fixtures/library, THEN it is not a rule.
    violation: Two files share one identity, or a file outside fixtures/library is treated as a rule.
    source: FR2.1
  - id: BR2.2
    statement: The starter library holds the five named rule files.
    category: constraint
    applies_to: RuleLibrary
    trigger: The skeleton is created.
    logic: IF the skeleton is in place, THEN fixtures/library contains app-structure.md, routing.md, server-data.md, styling.md, and testing.md.
    violation: One of those five files is missing.
    source: FR2.2
  - id: BR2.3
    statement: A valid rule file includes tags, applicable_stages, and applicable_agents.
    category: validation
    applies_to: Rule
    trigger: The check reads a markdown file under fixtures/library.
    logic: IF all three fields are present, THEN the file can be a rule. IF any one of them is missing, THEN the file is invalid.
    violation: A file missing one of the three fields is counted as a rule.
    source: FR2.3
  - id: BR2.4
    statement: The body states the rule, why it exists, and a short example, with no required headings.
    category: validation
    applies_to: Rule
    trigger: A person reads a rule file.
    logic: IF the body is present, THEN it states the rule, why it exists, and a short example. No heading is required for the file to be valid.
    violation: The body omits the rule, the reason, or the example, or the check requires a heading.
    source: FR2.4
  - id: BR2.5
    statement: The app-structure rule says the layout follows the application framework for routes, server logic, and UI, and it does not add a second top-level source tree.
    category: policy
    applies_to: Rule
    trigger: A person reads app-structure.md.
    logic: IF the file is the starter app-structure rule, THEN it states that layout rule and its example does not introduce a second top-level source tree. Directory names beyond fixtures/library are not chosen here.
    violation: The file states a different layout rule, or the example adds a second top-level source tree.
    source: FR2.5
  - id: BR2.6
    statement: Each screen is a route. This phase has one route, the home page.
    category: policy
    applies_to: Rule
    trigger: A person reads routing.md, or a screen is added.
    logic: IF a screen exists, THEN it is a route. IF this phase is the one being built, THEN the only route is the home page.
    violation: A screen in this phase is not a route, or this phase has a route other than the home page.
    source: FR2.5
  - id: BR2.7
    statement: Server-only data is reached through server functions. The home page does not fetch data.
    category: policy
    applies_to: Rule
    trigger: A person reads server-data.md, or the home page is opened.
    logic: IF data is server-only, THEN a server function is the way to reach it. IF the page is the home page, THEN it does not fetch data.
    violation: Server-only data is read from the page, or the home page fetches data.
    source: FR2.6
  - id: BR2.8
    statement: The project uses one styling approach and does not add a second styling system. The approach is not named in this phase.
    category: policy
    applies_to: Rule
    trigger: A person reads styling.md, or styling is added.
    logic: IF styling is added, THEN it uses the one approach. IF a second styling system is proposed, THEN it is out of scope. The name of the approach stays unset.
    violation: The project gains a second styling system, or this phase names the approach.
    source: FR2.7
  - id: BR2.9
    statement: Tests are written after the code they cover. The testing rule names the frontmatter check and the home-route check.
    category: policy
    applies_to: Rule
    trigger: A person reads testing.md, or tests are written.
    logic: IF tests are written, THEN the code they cover already exists. IF the file is the starter testing rule, THEN it names the frontmatter check and the home-route check.
    violation: Tests are written before the code they cover, or the starter testing rule omits either check.
    source: FR2.8
  - id: BR3.1
    statement: The check examines every markdown file under fixtures/library and reports an invalid file by name and by what is wrong.
    category: validation
    applies_to: RuleLibrary
    trigger: The person runs the rule check.
    logic: IF a file is missing a required field, THEN the check fails, names the file and the missing field, and does not count that file as a rule. IF the frontmatter cannot be read, THEN the check fails, names the file and that the frontmatter is unreadable, and does not count that file as a rule. IF another file in the same folder is valid, THEN that file is still reported as valid.
    violation: An invalid file is counted as a rule, the failure omits the file or the fault, or a valid neighbor is reported as invalid.
    source: FR3.1
  - id: BR3.2
    statement: An empty fixtures/library directory is not a failed parse.
    category: validation
    applies_to: RuleLibrary
    trigger: The person runs the rule check and opens the home page when fixtures/library contains no markdown files.
    logic: IF fixtures/library contains no markdown files, THEN the check reports that there are no rule files, and the home page still responds.
    violation: The empty directory is reported as a failed parse, or the home page does not respond.
    source: FR3.2
  - id: BR4.1
    statement: Automated tests are written after the code and cover the rule check and the home route.
    category: policy
    applies_to: HomeApp
    trigger: The tests for this slice are added.
    logic: IF the tests are added, THEN the code they cover already exists. The tests include a missing required frontmatter field, an empty library, and a home route that responds. IF the route does not respond, THEN the home-route test fails. WHEN the person runs the project's test command, THEN these tests run.
    violation: The tests are written before the code, a required case is missing, or the test command does not run them.
    source: FR4
```

## Summary

| Rule | What it decides |
| --- | --- |
| BR1.1 | The application builds and starts locally. |
| BR1.2 | The home route shows "The app is up" and nothing from the game. |
| BR1.3 | No sign-in and no remote wait. |
| BR1.4 | No staging, preview, or production deploy in this phase. |
| BR2.1 | One markdown file under `fixtures/library` is one rule, named by its filename. |
| BR2.2 | The five starter files are present. |
| BR2.3 | The three frontmatter fields must be present. |
| BR2.4 | The body is prose with a rule, a reason, and an example. |
| BR2.5 | Layout follows the application framework and adds no second source tree. |
| BR2.6 | Each screen is a route. This phase has the home page only. |
| BR2.7 | Server-only data uses server functions. The home page fetches nothing. |
| BR2.8 | One styling approach, still unnamed. |
| BR2.9 | Tests follow the code. The testing rule names both checks. |
| BR3.1 | An invalid file fails by name and by fault. Valid neighbors stay valid. |
| BR3.2 | An empty library is "no rule files", and the home page still responds. |
| BR4.1 | Tests cover the missing field, the empty library, and the home route. |
