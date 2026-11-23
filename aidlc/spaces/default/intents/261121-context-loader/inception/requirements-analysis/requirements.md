# Requirements

## Upstream inputs

- `intent-statement` — `aidlc/spaces/default/intents/261121-context-loader/ideation/intent-capture/intent-statement.md`
- `scope-document` — `aidlc/spaces/default/intents/261121-context-loader/ideation/scope-definition/scope-document.md`
- `business-overview` — `aidlc/spaces/default/codekb/game/business-overview.md`
- `architecture` — `aidlc/spaces/default/codekb/game/architecture.md`
- `code-structure` — `aidlc/spaces/default/codekb/game/code-structure.md`
- Answers in `requirements-analysis-questions.md` (Q1–Q4)

## Intent analysis

Deliver a deterministic Tag & Stage Context Loader so agents and tooling can select a small applicable set of architecture rules from the existing local library without RAG, without LLM tokens for selection, and without injecting the whole library every turn. [intent-statement] [scope-document]

## Functional requirements

### FR1 — Deterministic context loader CLI

The system SHALL provide `tools/context-loader.ts` as a CLI that selects architecture rules from `fixtures/library/*.md`. [intent-statement] [business-overview]

- **FR1.1** The CLI SHALL accept `--stage <slug>`, `--agent <role>`, and `--tags <csv>`. Omitting a filter means that dimension does not constrain matching. [intent-statement] [req-Q3]
- **FR1.2** A rule SHALL enter the candidate set if it matches **any** provided filter dimension (OR across stage, agent, and tags). When tags are provided, a rule matches the tags dimension if it shares at least one tag with the request. [req-Q3]
- **FR1.3** Among candidates, the loader SHALL score each rule by the number of matching dimensions (stage + agent + tags, each 0 or 1), break ties by ascending filename, and return at most the top 4. [req-Q1]
- **FR1.4** When the preferred floor of 2 is met, the loader SHALL return between 2 and 4 selected rules (inclusive of the capped top set). [intent-statement]
- **FR1.5** When fewer than 2 rules match after filtering, the loader SHALL still emit the matched set (0 or 1) on stdout, write a clear under-floor warning to stderr, and exit **0**. Non-zero exit is reserved for hard failures (parse/IO). *(Revised at Domain Design Q4 from the earlier non-zero under-floor contract.)* [req-Q2] [domain-Q4]
- **FR1.6** Primary stdout output SHALL be JSON containing selected rule paths/ids, a frontmatter summary per selected rule, and a compact index object. Human-readable diagnostics SHALL go to stderr only. [req-Q4]
- **FR1.7** The compact index in the JSON output SHALL be under 3 KB. [intent-statement]
- **FR1.8** Selection SHALL use no vector database and SHALL spend 0 tokens (pure local deterministic matching on YAML frontmatter). [intent-statement]

### FR2 — Library contract

The loader SHALL read the existing `fixtures/library/*.md` files that carry YAML frontmatter fields `tags`, `applicable_stages`, and `applicable_agents`. [intent-statement] [code-structure]

- **FR2.1** Malformed frontmatter SHALL fail fast with a non-zero exit and a stderr diagnostic naming the offending file (no partial silent skip of a broken rule unless tests later specify otherwise in domain design). [feasibility-assessment]

### FR3 — Automated verification

Automated tests SHALL prove selection behavior, ranking/tie-break, under-floor exit behavior, performance, and index size against `fixtures/library`. [intent-statement] [scope-document]

- **FR3.1** Existing project tests SHALL remain green. [scope bugfix / team testing posture]

## Non-functional requirements

### NFR1 — Performance

Selection for the existing library SHALL complete in under 5 ms on a developer machine (asserted by automated test with a generous local budget if absolute wall-clock is flaky; the requirement target remains &lt; 5 ms). [intent-statement]

### NFR2 — Determinism

Identical inputs (`--stage`, `--agent`, `--tags`, same library bytes) SHALL always produce the same ordered selection and JSON structure. [intent-statement] [req-Q1]

### NFR3 — Tooling alignment

Implementation SHALL use this project's TypeScript stack and pnpm for package management. [constraint-register TC-1, TC-4] [memory:M1]

### NFR4 — Local-only integration

Runtime integration for this delivery is limited to local `fixtures/library` and the project's toolchain — no external services. [constraint-register TC-1] [scope-document]

## Constraints

| ID | Constraint | Source |
|---|---|---|
| C1 | Loader + tests only; PR-gate plugin deferred | scope-document / TC-5 |
| C2 | No vector DB; 0 selection tokens | intent-statement / TC-2 |
| C3 | No hard delivery deadline | scope-Q3 / OC-1 |
| C4 | No compliance regime on the loader itself | RC-1 |

## Assumptions

None.

## Out of scope

- Adversarial PR Review Plugin (`plugins/pr-gate/`), AC/ADR gate stages, plugin validation diffs [scope-document]
- README / docs packaging as a done criterion [scope-Q1]
- Wiring the loader into live AI-DLC agent turns in this delivery [business-overview]

## Open questions

None for requirements. Domain design may refine the exact JSON schema field names and the concrete stderr message text without changing the decisions above.
