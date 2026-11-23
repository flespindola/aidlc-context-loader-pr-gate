# Reliability Design — u1-skeleton

Satisfies NFR1.1, NFR1.2, and NFR2.2 from `reliability-requirements.md`. Outcomes are in `functional-spec.md`.

The page has no remote dependency, so there is no circuit breaker, no retry, and no failover host. NFR1.2 means there is no second environment to switch to and nothing to back up.

The local process is healthy when it is running and the home route shows the heading. When the rule library has no markdown files, the page still responds and the check reports that there are no rule files. When a rule file is invalid, the check fails and the page stays as it is. Those are the only degradation paths.
