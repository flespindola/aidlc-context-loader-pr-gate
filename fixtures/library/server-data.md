---
tags: server
applicable_stages: construction
applicable_agents: developer
---

Server-only data access stays in server functions. The home page does not fetch data.

This rule exists so data that only the server should read is not pulled in by the page. The home page has no data to fetch.

For example, a later screen would read server-only data through a server function. The home page renders its heading and does not fetch.
