# Evidence

Integration of the completed interview. Collaborators are off, so there are no contribution files. These drafts record the person's answers. They have not been promoted.

## Inspected

- `aidlc/spaces/default/memory/org.md` — framework defaults for Way of Working, Walking Skeleton, Testing Posture, Deployment, and Code Style. Used as the suggested options in the interview, not as the recorded practices where the person chose otherwise.
- `aidlc/spaces/default/memory/team.md` — the five practice sections are empty comment placeholders. Not a baseline.
- `.cursor/scopes/aidlc-classic.md` — `skeleton: off`. Classic adds no extra new-test floor. Test strategy inherits Standard from depth.
- `aidlc/spaces/default/intents/261120-tanstack-start-skeleton/inception/practices-discovery/practices-discovery-questions.md` — every `[Answer]` is filled. These answers are authoritative.
- `aidlc engine now` returned `2026-11-20T15:37:18Z`.
- `git rev-parse --short=12 HEAD` failed with `fatal: Needed a single revision`. Branch `main` has no commits, so the hash is `unavailable`.

## Interview decisions

Recorded in the person's words:

- **Way of Working**: "B. Short-lived feature branches, each merged into main with a pull request." This replaces trunk-based development. They did not choose squash versus a merge commit. Integration branch is `main`.
- **Walking Skeleton**: "B. Yes. Build that thin slice first and check that it runs end to end before the rest of the work." The stance is on: we always build that slice first. This yes overrides the classic scope's `skeleton: off` because the person chose it.
- **Deployment**: "A. Staging updates on every merge. Production waits for a separate manual approval (suggested)."
- **Testing Posture**: "A. After the code. Implement a layer, then write and run that layer's tests (suggested)." Methodology is `test-after`. The active test strategy is Standard. Classic adds no extra new-test floor; the existing suite stays green.
- **Code Style**: "A. Follow the project's formatter and linter once they exist (Prettier and ESLint). Name things in ordinary TypeScript style. No project-wide rename rule (suggested)."

## Greenfield

Project type is Greenfield. Reverse-engineering artifacts do not apply. No codebase evidence was invented.

## Unresolved

None of the five areas. Way of Working, Walking Skeleton, Testing Posture, Deployment, and Code Style are all answered.

Mandated and Forbidden stay `None.` The five answers are practices, not extra hard constraints.
