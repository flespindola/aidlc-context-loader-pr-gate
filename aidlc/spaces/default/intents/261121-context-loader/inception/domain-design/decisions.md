# Architecture Decision Records

## Upstream inputs

- `requirements` — FR1–FR3, NFR1–NFR4 (FR1.5 revised per domain-Q4)
- `component-inventory` — existing `rule-check` and fixtures library
- Answers in `domain-design-questions.md`

## ADR-001: Two-component loader (RuleLibrary + ContextSelector)

- **Context:** The bugfix delivers a deterministic context loader against `fixtures/library`. Brownfield already has frontmatter validation (`rule-check`) separate from any selector. We needed a decomposition that keeps parse fail-fast distinct from ranking/CLI without over-splitting.
- **Decision:** Implement two logical components: **RuleLibrary** (load/parse/fail-fast, owns `RuleDocument`) and **ContextSelector** (match/rank/index + thin CLI at `tools/context-loader.ts`, owns `SelectionResult`). ContextSelector depends synchronously on RuleLibrary.
- **Consequences:** Clear ownership for tests (library parse vs selection policy). Slightly more wiring than a monolith. Existing `rule-check` remains a sibling validation utility; RuleLibrary may share parsing ideas but owns the selector’s typed documents.
- **Alternatives Rejected:** Single `ContextLoader` (mixes concerns); three components with a separate Cli façade (no distinct entity; ceremony without benefit for this scope).

## ADR-002: Stage/agent prefix match; tags exact; OR candidate set

- **Context:** Requirements review R-01 left stage/agent “match” imprecise. Q2 chose substring/prefix match. FR1.2 already defines OR across dimensions and at-least-one tag equality.
- **Decision:** Stage and agent matching are **case-sensitive prefix** checks: after trim, the request value must be a prefix of a frontmatter set entry (scalar or list normalized to a set). Empty frontmatter set → no match for that dimension. Tags remain exact trimmed equality for at least one requested tag. Candidate membership is OR across provided filters; ranking score is the count of matching dimensions with ascending filename tie-break, capped at 4.
- **Consequences:** Callers can pass short stage prefixes; risk of over-matching if prefixes are too short (mitigate with tests on real fixtures). Deterministic and easy to unit-test.
- **Alternatives Rejected:** Case-sensitive exact membership; case-insensitive exact membership.

## ADR-003: Under-floor exits 0 (FR1.5 revision)

- **Context:** Approved FR1.5 originally required non-zero exit when fewer than two rules matched. Domain Q3/Q4 chose to treat under-floor as a soft warning so callers can still consume partial JSON.
- **Decision:** Revise **FR1.5**: under-floor still emits JSON on stdout and a clear stderr warning, but exits **0**. Non-zero exit only for hard failures (parse/IO). Success with ≥2 rules also exits 0. Requirements.md was updated to match.
- **Consequences:** Shell pipelines that only check exit code will not detect sparse selections; they must read stderr or `underFloor` in JSON. Aligns with “callers decide” while keeping hard errors loud.
- **Alternatives Rejected:** Keep original FR1.5 non-zero under-floor exit.
