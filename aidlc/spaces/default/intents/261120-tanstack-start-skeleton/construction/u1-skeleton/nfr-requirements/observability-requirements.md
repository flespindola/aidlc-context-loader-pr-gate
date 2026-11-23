# Observability Requirements — u1-skeleton

No monitoring product, log pipeline, trace, alert, or dashboard is in scope. `requirements.md` sets no such target. This phase is local only.

| ID | Requirement | Target |
| --- | --- | --- |
| NFR1.1 | The person can see that the local slice is up. | The home page shows the heading "The app is up", as `functional-spec.md` specifies. |
| NFR1.2 | This phase does not publish a preview or a remote environment. | There is no remote signal to collect. |

The rule check is the other local signal. As `rules.md` specifies, an invalid file is named with its fault, and an empty library is reported as no rule files. Those reports are the check's own output. They are not a dashboard, and they do not appear on the home page.
