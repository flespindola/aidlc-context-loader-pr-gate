# Decisions

## ADR-001: Home page and rule check are two components

- **Context** — `requirements.md` asks for a TanStack Start app with one home page, and for a separate check of the Markdown files in `fixtures/library`. The home page does not fetch data and does not show the result of the check. `stories.md` keeps those as different outcomes. The open choice was whether that is one building block or two. Security pressure on this phase is small: the app is local, there is no sign-in, and the rule files are repo content rather than input from the network.
- **Decision** — Two components, HomeApp and RuleLibrary. Neither calls the other. HomeApp serves the home page. RuleLibrary owns the rule files and the check.
- **Consequences** — A change to the heading does not require a change to the check, and a failed rule file does not change what the page shows. The thin slice is still one app plus one check, run on the same machine, with no deploy. There is no shared mutable record. The cost is two building blocks to keep in mind for a very small skeleton. No credential, session, or remote call is introduced.
- **Alternatives Rejected** — One block that owns both the home page and the rule-file check. It would ship as one pile of code. It was rejected because the two do not share data or a call, so they do not change for the same reason.

## ADR-002: A rule is one file, owned by the check

- **Context** — Each architecture rule is one Markdown file. The filename is the rule's identity. The file carries `tags`, `applicable_stages`, and `applicable_agents`, plus a prose body. The value types of those three fields were left open in the approved requirements and stay open here. The home page has no stored record of its own.
- **Decision** — RuleLibrary owns the entity Rule. The identifier is the filename. The attributes are `tags`, `applicable_stages`, `applicable_agents`, and `body`. HomeApp owns no entity.
- **Consequences** — Two files are two rules even when their titles are similar. The check can name the file that failed. The shape of each frontmatter value is not decided in this stage. The home page cannot grow a hidden record of rules.
- **Alternatives Rejected** — A separate entity per starter file (one type for routing, one for styling, and so on). The five files are five rules of one kind, distinguished by filename. Splitting them into five entity types would add names without a second lifecycle.
