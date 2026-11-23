# Performance Requirements — u1-skeleton

These targets come from `requirements.md`. The behavior they measure is in `functional-spec.md` and `rules.md`.

| ID | Requirement | Target |
| --- | --- | --- |
| NFR1.1 | A person can build, test, and open the home page on their own machine. | Those three actions finish with no staging host, preview URL, or production host. No response-time number is set. |
| NFR2.2 | The home page does not wait on a remote API. | Opening the home route issues no remote request. The page has no loading wait. |

No throughput target and no latency budget apply in this phase. The page is one local heading.
