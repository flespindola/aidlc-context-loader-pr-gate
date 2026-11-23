# Security Design — u1-skeleton

Satisfies NFR2.1 and NFR2.2 from `security-requirements.md`. The stack constraints are in `tech-stack-decisions.md`.

## Authentication and authorization

The home route has no authentication flow and no authorization check. The page is readable as soon as the local process is running.

## Data

The page shows a fixed sentence. It does not take user input, and it does not render rule-file contents. There is no personal data and no data store, so there is nothing to encrypt at rest and no secret to manage.

## Input boundary

The rule check is the input boundary. It reads markdown files under `fixtures/library`. An invalid file fails the check and names the file and the fault. That result is not shown on the home page. A valid neighbor stays valid.

## Transport

This phase has no public host. NFR1.2 keeps the slice on the developer's machine, so there is no deployed endpoint to attach security headers to.
