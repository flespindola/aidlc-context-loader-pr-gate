# Domain Design Questions

## Sources

- requirements.md — FR1–FR3, NFR1–NFR4; open review notes R-01 (stage/agent match precision), R-02 (success exit code)
- architecture.md / component-inventory.md — brownfield TanStack Start app; `rule-check` validates frontmatter; no `tools/` yet
- Fixtures use scalar frontmatter today (`applicable_stages: construction`, `applicable_agents: developer`, `tags: structure`)

## Q1. [Architect] How should we bound the loader’s logical components?

A. Single component `ContextLoader` — parse library, match/rank, emit JSON/CLI in one building block (smallest surface for this bugfix)
B. Two components: `RuleLibrary` (load/parse/fail-fast) and `ContextSelector` (match/rank/index); thin CLI entry in `ContextSelector`
C. Three components: `RuleLibrary`, `ContextSelector`, and `ContextLoaderCli` as a separate façade
D. Not yet defined
X. Other (please specify)

[Answer]: Two components: `RuleLibrary` (load/parse/fail-fast) and `ContextSelector` (match/rank/index); thin CLI entry in `ContextSelector`

## Q2. [Architect] Exact stage/agent match rule against frontmatter (closes R-01)?

A. Case-sensitive exact membership: treat scalar or list values as a set; the request value must equal one entry after trim; empty frontmatter list → no match for that dimension
B. Case-insensitive exact membership (same set semantics as A)
C. Substring / prefix match (request may be a prefix of an entry)
D. Not yet defined
X. Other (please specify)

[Answer]: Substring / prefix match (request may be a prefix of an entry)

## Q3. [Architect] Success exit status when at least two rules are returned (closes R-02)?

A. Exit code 0 on success (≥2 rules); non-zero only for under-floor (FR1.5) or hard failures (parse/IO)
B. Always exit 0 if JSON was written, even under-floor (contradicts FR1.5 — do not pick unless you intend to revise requirements)
C. Not yet defined
X. Other (please specify)

[Answer]: Exit code 0 on success (≥2 rules) or under-floor (FR1.5); non-zero only for hard failures (parse/IO)

## Follow-up: Q3 vs FR1.5

Approved **FR1.5** says under-floor (<2 matches) must exit **non-zero** with a stderr message. Your Q3 answer says under-floor should exit **0**, with non-zero only for parse/IO failures.

## Q4. [Architect] Which exit-code contract should the design implement?

A. Keep FR1.5 — exit non-zero when under-floor; exit 0 only when ≥2 rules returned (and no hard failure)
B. Revise FR1.5 — under-floor also exits 0; stderr still warns; non-zero only for hard failures (parse/IO). Domain Design will note this requirements change
C. Not yet defined
X. Other (please specify)

[Answer]: Option B (revide FR1.5 under-floor also exits 0; stderr still warns; non-zero only for hard failures (parse/IO).)
