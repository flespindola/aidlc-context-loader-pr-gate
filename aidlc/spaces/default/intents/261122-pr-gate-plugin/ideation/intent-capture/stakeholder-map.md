# Stakeholder Map

| Stakeholder | Interest | Authority | Source |
|---|---|---|---|
| CI / pre-merge pipelines and human reviewers | Consume a blocking, file-and-line-precise JSON + Markdown verdict before code review | Primary consumer of the gate verdict | [Q2] |
| Assessment / delivery owner (this initiative) | Ship the PR-gate plugin with green validation tests and a clean AI-DLC record for this challenge item | Decides this first-version product boundary | [Q3] [Q4] |

## Decision-makers vs influencers

- Decision-maker for this first version’s product boundary: the assessment / delivery owner who confirmed the plugin-only slice that reuses the existing context loader. [Q4]
- Influencers: none identified beyond the CI / pre-merge pipelines and human reviewers named as the customer. [Q2]

## Assumptions & Open Questions

- Communication cadence and channel for this initiative were not set in the answers; they remain open until a later stage needs them. [assumption]
