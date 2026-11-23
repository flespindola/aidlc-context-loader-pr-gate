# Performance Design — u1-skeleton

Satisfies NFR1.1 from `performance-requirements.md`. The page behavior is in `functional-spec.md`.

The local process renders one fixed heading, "The app is up". There is no cache, no content-delivery layer, no connection pool, and no background job. The page does not fetch, so there is no latency budget to split and nothing to paginate.

NFR2.2 is met by making no remote call. The page has no loading step.
