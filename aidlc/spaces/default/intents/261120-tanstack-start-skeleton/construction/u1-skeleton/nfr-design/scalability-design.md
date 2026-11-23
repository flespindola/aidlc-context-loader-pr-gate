# Scalability Design — u1-skeleton

Satisfies NFR1.1 from `scalability-requirements.md`.

One person runs one local process. The home page holds no session and no shared state. There is no load balancer, no partition, no queue, and no autoscale rule. Capacity is that one process on that one machine.

Rule files stay as markdown files. They are not a dataset that grows under load.
