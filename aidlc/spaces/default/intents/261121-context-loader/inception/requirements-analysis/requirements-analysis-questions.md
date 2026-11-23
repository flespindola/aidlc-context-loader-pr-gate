# Requirements Analysis Questions

## Sources

- [desc] Initial description: build item 1 from INSTRUCTIONS.md — Deterministic Tag & Stage Context Loader for fixtures/library
- [scope] Workflow-selected scope: `bugfix`
- intent-statement — CLI `--stage`/`--agent`/`--tags`; 2–4 rules; <5 ms; index <3 KB; 0 tokens; no vector DB; tests green
- scope-document — MVP = loader + tests only; PR-gate and README packaging out
- feasibility-assessment — open: ranking when >4 matches; behavior when <2 matches
- business-overview / architecture / code-structure — brownfield app; `fixtures/library` + `rule-check` present; `tools/context-loader.ts` missing

## Q1. [Product] When more than four rules match stage/agent/tags, how should the loader pick which 2–4 to return?

A. Deterministic sort by rule filename (ascending), then take the first 4
B. Score by number of matching dimensions (stage + agent + tags), then filename as tie-break; take top 4
C. Prefer rules whose `applicable_stages` / `applicable_agents` are exact (not wildcard/broad), then filename; take top 4
D. Not yet defined
X. Other (please specify)

[Answer]: Score by number of matching dimensions (stage + agent + tags), then filename as tie-break; take top 4

## Q2. [Product] When fewer than two rules match, what should the loader return?

A. Return whatever matched (0 or 1 rule) with a non-zero exit code and a clear message that the selection is below the preferred floor of 2
B. Return whatever matched (0 or 1) with exit code 0 — under-floor is allowed; callers decide
C. Fail hard with a non-zero exit and no rule bodies when the match count is below 2
D. Not yet defined
X. Other (please specify)

[Answer]: Return whatever matched (0 or 1 rule) with a non-zero exit code and a clear message that the selection is below the preferred floor of 2

## Q3. [Product] How should `--stage`, `--agent`, and `--tags` combine when filtering?

A. A rule must match stage AND agent AND at least one requested tag (when tags are provided); omit a filter → that dimension does not constrain
B. A rule matches if it satisfies any one of the provided filters (OR across dimensions)
C. Stage and agent are required AND filters; tags are optional boosters for ranking only (not hard filters)
D. Not yet defined
X. Other (please specify)

[Answer]: A rule matches if it satisfies any one of the provided filters (OR across dimensions)

## Q4. [Product] What should the CLI emit as its primary machine-readable output?

A. JSON on stdout: selected rule paths/ids, frontmatter summary, and a compact index object; human-readable diagnostics on stderr only
B. Markdown on stdout (rule bodies + index table); JSON only with an explicit `--json` flag
C. Paths-only list on stdout (one path per line); no index in the default output
D. Not yet defined
X. Other (please specify)

[Answer]: JSON on stdout: selected rule paths/ids, frontmatter summary, and a compact index object; human-readable diagnostics on stderr only
