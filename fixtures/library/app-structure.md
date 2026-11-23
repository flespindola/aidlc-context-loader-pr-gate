---
tags: structure
applicable_stages: construction
applicable_agents: developer
---

New application code follows the TanStack Start layout for routes, server code, and UI. It does not add a second top-level source tree.

This rule exists so routes, server code, and UI stay in the layout the app already has. A second top-level source tree would split that layout apart.

For example, add a screen as a file under src/routes, and keep server-only work in a server function used by that route. The UI for the screen stays with the route.
