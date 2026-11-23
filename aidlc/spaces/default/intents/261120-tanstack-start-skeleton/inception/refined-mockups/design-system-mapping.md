# Design System Mapping

## Existing system

None. `requirements.md` does not name a component library, and `stories.md` does not add one. `wireframes` were not produced.

## This phase

Styling uses one approach for the app. This document does not name that approach. This phase does not add a second styling system (US2.8).

The home page is the only surface that approach has to cover.

| UI part | Mapped to | Notes |
|---|---|---|
| Home page | The one styling approach | One column, the heading inset from the viewport edge |
| App status | The same approach | One `h1`, the words "The app is up" |
| Navigation, button, form, modal, toast | Not used | `stories.md` has no control on this page |

## Responsive rule

The composition does not change at 320px, 768px, 1024px, or 1440px. The heading stays one column. There is no menu to collapse and no table to turn into cards.

## Not introduced

A named component library, a second styling system, icons, a color theme with a name, and any pattern that exists only to leave room for the later game.
