# Project Instructions

## Ready-to-Send Technical Assessment Email

**Subject:** Technical Assessment — AI Engineer (AI-DLC Guided Development)

Hi [Name],

As the next step in our selection process for the **AI Engineer** role, please find below the instructions for our technical assessment.

In our team, we build developer tools, plugins, deterministic sensors, and agent-routing systems on top of **AI-DLC** (our AI-Driven Development Life Cycle framework). The goal of this assessment is not to measure how many lines of code you type manually from scratch, but **how you design reliable AI Engineering systems, how you steer AI-DLC agents through stages and human decision gates, and what engineering judgment you apply to enforce quality, determinism, and token/cost efficiency**.

Please clearly state at the top of your `README.md` or Pull Request description the challenge selected below.

### Mandatory Delivery Requirements (Using AI-DLC)

1. **Development via** `/aidlc`**:**

   All analysis, design, implementation, and verification for your chosen challenge must be executed through **AI-DLC** (`/aidlc`), keeping all guards and sensors active (`Guard Policy: strict`).
2. **What your Git repository / Pull Request must include:**
   - **Source code and automated test suite passing in green** (`npm test` / `bun test`).
   - **The complete** `aidlc/` **directory tracked in Git** (do not delete or manually edit internal state or audit files), including:
     - The generated intent directory(ies): `aidlc/spaces/default/intents/<YYMMDD>-<slug>/`
     - Workflow state: `<record>/aidlc-state.md` and `aidlc/spaces/default/intents/intents.json`
     - Audit trail and gate decisions: `<record>/audit/*.md`
     - Per-stage observation diaries: `<record>/<phase>/<stage>/memory.md`
     - All artifacts generated across _Ideation_, _Inception_, and _Construction_.
   - **Workflow Close & Handover:**
   Once your implementation is complete, run:
     - `/aidlc-outcomes-pack` and commit the generated `OUTCOMES.md` file.
     - `/aidlc-session-cost` and `/aidlc-replay`, pasting the output of both commands at the bottom of `OUTCOMES.md` or in your PR description.

### Challenge: Progressive Context Loader (Zero RAG Bloat) & Adversarial Pull Request Gate

- **Context:**
In organizations with dozens of architecture guides (ADRs covering APIs, database transactions, security, observability), injecting all documents into every agent turn causes severe _Context Bloat_, while vector RAG introduces non-determinism for mandatory architectural rules. Furthermore, as AI accelerates code generation, teams need an automated pre-review gate that verifies AC test coverage and ADR compliance before human Code Review.
- **What to build with** `/aidlc`**:**
  1. **Deterministic Tag & Stage Context Loader (**`tools/context-loader.ts`**):**
     - Given a local library of architecture rules (`fixtures/library/*.md`) with YAML frontmatter (`tags`, `applicable_stages`, `applicable_agents`), implement a deterministic selector (`< 5 ms`, no vector database, `0 tokens`) that accepts `--stage <slug> --agent <role> --tags <csv>` and returns only the **2 to 4 applicable rules** along with a compact index (`< 3 KB`).
  2. **Adversarial PR Review Plugin / Scope (**`plugins/pr-gate/`**):**
     - Build a valid AI-DLC plugin (`.aidlc-plugin/plugin.json`, `scopes/`, `stages/`, `sensors/`) that takes a `git diff` and the task's `spec.md`, and checks in two stages:
       - **100% AC Coverage:** Verifies that every `AC-1..AC-N` in `spec.md` has a corresponding automated test in the diff.
       - **ADR Compliance:** Verifies that the diff does not violate the rules loaded by `context-loader.ts` (e.g., making external HTTP calls inside a database transaction, logging unmasked PII/secrets, or introducing backward-incompatible OpenAPI changes).
     - Emits a structured verdict (JSON + Markdown) pinpointing the exact file and line, blocking the Gate when violations are found.
  3. **Automated tests & validation:** Validate the plugin with `aidlc-plugin-validate.ts` and include automated tests against at least 3 diffs (one clean and two with AC/ADR violations).

### What We Look For

- **Full AI-DLC Traceability (**`aidlc/`**):** Clean intent structure, generated artifacts, passing sensors, and proper closeout with `OUTCOMES.md`, `/aidlc-session-cost`, and `/aidlc-replay`.
- **Engineering Judgment at Gates:** How you steer, review, and course-correct the agent's proposals at decision gates (`audit/` and `memory.md`).
- **Determinism & FinOps Efficiency:** Solving with deterministic code and static sensors (`0 tokens`) anything that does not require an LLM call, while keeping context lean and bounded.
- **Code Quality & Tests:** Clean, strictly typed TypeScript code and reproducible automated tests.
