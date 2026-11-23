# Observability Design — u1-skeleton

Satisfies the local signals in `observability-requirements.md`. No metrics pipeline, log shipper, trace, alert rule, or dashboard is added.

The up signal is the heading "The app is up" on the home route. The fault signal is the rule check's own report: it names an invalid file and the fault, and it reports an empty library as no rule files. Those reports stay off the page. There is no correlation id, because the page and the check do not call each other and neither calls a remote service.
