# Security Requirements — u1-skeleton

These targets come from `requirements.md`. The home-page behavior is in `functional-spec.md`. The rule-file failure behavior is in `rules.md`.

| ID | Requirement | Target |
| --- | --- | --- |
| NFR2.1 | The home route is readable with no account and no session. | Opening the route shows the page. There is no sign-in step and no authorization check. |
| NFR2.2 | The home page does not wait on a remote API. | The page reads no remote service and stores no personal data. |

## What this phase does not add

- No authentication model.
- No authorization model.
- No personal data and no stored session.
- No hardcoded credential, API key, or secret. This phase has no secret to configure.
- No compliance regime was named.

## Boundary

A rule file is input at the file boundary. When a file is invalid, the check fails and names the file and the fault, as `rules.md` states. That failure stays off the home page. The page does not become a channel for the file contents.
