# External Dependency Map

An external dependency here is something outside this work that can hold a Bolt, one build pass that ends in something that runs. This phase has none.

| Item | Owner | Wait | Bolt it blocks | If it slips |
|---|---|---|---|---|
| none | none | none | none | The local slice does not wait on anyone else |

`requirements.md` keeps this phase on the developer's machine. There is no partner API, no data feed, no other team's hand-off, and no deploy approval. Contract design was skipped because `unit-of-work-dependency.md` has no edge and the home page is not an API consumed outside the system. Installing language packages from the public registry is part of building `u1-skeleton`, not a hand-off this map tracks.
