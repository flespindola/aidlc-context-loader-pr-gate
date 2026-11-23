# Mockups

## Sources

Designed from `requirements.md` and `stories.md`. `wireframes` and `user-flow` are not in this record. Ideation was not run, so those two were not invented here.

The only screen is the home page from the requirement that one route responds and shows text that the app is up (FR1.2, US1.3). Riley, a developer on this repo, opens it locally with no sign-in (US5.1, US5.2).

## Home page

One column. One heading. No navigation, no button, no image, no list of rules.

```
+----------------------------------+
|                                  |
|  The app is up                   |
|                                  |
+----------------------------------+
```

The browser tab title is the same sentence: The app is up.

The sentence is the page's only text. It is an `h1` inside `main`. Nothing else is on the screen: no logo, no project name, no link, no footer.

## What Riley does

```
Flow: Open the home page
Persona: Riley, a developer on this repo
Trigger: Riley starts the app on their machine and opens the home route
Steps:
  1. Home page -> Riley opens the route -> the page shows "The app is up"
Success outcome: Riley sees that the app is up, with no login and no wait on a remote API
Error paths:
  - The route does not respond -> the home-route test fails -> there is no designed error screen
```

This phase has one route, the home page. A later screen, when the game exists, is another route. This page does not reserve a slot, a menu, or a second panel for it.

## States

| State | On this page |
|---|---|
| Success | The heading "The app is up" is shown. This is the only designed state. |
| Loading | Not designed. The home page does not fetch data (US2.7). |
| Empty | Not a different screen. An empty rule folder still shows the same heading (US3.3). |
| Error | Not designed. A rule file that fails the check is named by the check, not by this page (US3.2). A route that does not respond fails the route test (US4.3). |
| Partial | Not designed. The page has no list and no optional block. |

## Not on this page

Gameplay, an account, a score, saved progress, a sign-in step, a rule file, a tag lookup, and any control that would need a second styling system.
