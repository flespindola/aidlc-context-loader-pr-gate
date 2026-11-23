# Infrastructure Specification — u1-skeleton

This phase provisions nothing. The targets are NFR1.1, NFR1.2, NFR2.1, and NFR2.2, from `performance-design.md`, `security-design.md`, `scalability-design.md`, `reliability-design.md`, and `logical-components.md`. The page behavior is in `functional-spec.md`. The domain components are HomeApp and RuleLibrary.

## Deployment

| Facet | Choice | Rationale |
| --- | --- | --- |
| Compute model | The developer's local process | NFR1.1. Not containers, serverless, or a VM fleet. |
| Networking | None | No ingress, egress, VPC, or subnet. The page makes no remote call. |
| Storage | The local filesystem | Rule files are markdown under `fixtures/library`. No database volume. |
| Environments | The developer's machine only | NFR1.2. No dev, staging, or production host in this phase. |
| IaC | None | There is no cloud resource to describe. |
| Resource sizing | One local process | One person, one machine. |

## Infrastructure Services

| Service | Role | Configuration | Notes |
| --- | --- | --- | --- |
| None | None | No database, cache, queue, search, CDN, DNS, or load balancer | NFR2.1 and NFR2.2. The home route has no sign-in and no remote call. |

No shared infrastructure. This is the only unit.
