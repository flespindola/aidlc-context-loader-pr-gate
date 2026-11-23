# Reliability Requirements — u1-skeleton

These targets come from `requirements.md`. The check outcomes are in `functional-spec.md` and `rules.md`.

| ID | Requirement | Target |
| --- | --- | --- |
| NFR1.1 | The person can build and open the home page locally. | No availability percentage is set. The page is up when the local process is running. |
| NFR1.2 | This phase has no deploy step. | There is no remote environment to fail over to, and no backup or restore target. |
| NFR2.2 | The home page does not depend on a remote API. | A remote outage cannot block the page, because the page makes no remote call. |

When `fixtures/library` has no markdown files, the home page still responds. That is the graceful case, specified in `rules.md`. An invalid rule file fails the check and does not change the page.
