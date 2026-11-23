# Scalability Requirements — u1-skeleton

This phase serves one person on one machine, from `requirements.md` (NFR1). The workflows are in `functional-spec.md`.

| ID | Requirement | Target |
| --- | --- | --- |
| NFR1.1 | The slice runs for the person building it, on that person's machine. | One local process. No concurrent-user target, no growth projection, and no capacity plan. |

There is no shared data store to grow. Rule files are the markdown files under `fixtures/library` and are not a load-bearing dataset.
