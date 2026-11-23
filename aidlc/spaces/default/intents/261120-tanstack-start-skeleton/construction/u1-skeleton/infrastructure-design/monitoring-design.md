# Monitoring Design — u1-skeleton

Implements `observability-design.md`. No monitoring platform is provisioned.

## Metrics & KPIs

| Metric | Source | Threshold | Why it matters |
| --- | --- | --- | --- |
| None | None | None | This phase sets no metric and no threshold. |

## Alerts

| Alert | Condition | Severity | Routes to |
| --- | --- | --- | --- |
| None | None | None | Nobody. There is no alert route. |

## SLIs / SLOs

| SLI | SLO target | Measurement window |
| --- | --- | --- |
| None | None | None. No availability percentage was set. |

## Logs & Tracing

No log aggregation and no tracing. The person sees the heading "The app is up" on the home route, and the rule check names an invalid file in its own report. Those signals are not shipped anywhere.
