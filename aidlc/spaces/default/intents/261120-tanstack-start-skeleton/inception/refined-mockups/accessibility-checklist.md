# Accessibility Checklist

Target for the home page: WCAG 2.1 AA. The page is the heading "The app is up" and nothing else, as specified in `requirements.md` and `stories.md`. Items that need a control, a form, an image, or time-based media do not apply.

## Perceivable

| Check | Result for this page |
|---|---|
| Text contrast at least 4.5:1 | The heading against the page background meets 4.5:1 |
| Large text at least 3:1 | Met by the same pair if the heading is large text |
| Non-text content has a text alternative | No image. Nothing to describe. |
| Meaning is not by color alone | The only meaning is the heading text |
| No flashing content | No animation |

## Operable

| Check | Result for this page |
|---|---|
| Keyboard reaches every control | There is no control |
| Visible focus | No extra focus stop. The document focus indicator is left intact if the browser shows it. |
| No keyboard trap | Nothing captures focus |
| Touch target at least 44 by 44 CSS pixels | No target |
| Page can be read at 200% and 400% zoom | The full sentence stays on screen without a horizontal scroll |

## Understandable

| Check | Result for this page |
|---|---|
| Page language is English | `lang="en"` on the document |
| Heading order | One `h1`. No skipped level. |
| No change of context on load | Opening the route shows the heading. It does not redirect or open a dialog. |
| Labels for inputs | No input |

## Robust

| Check | Result for this page |
|---|---|
| Native HTML | `main` and `h1`. No ARIA role added to replace them. |
| Name, role, value | The heading's accessible name is "The app is up" |

## Not applied

Captions, transcripts, form errors, modal focus traps, and live regions. This page has none of those parts. A failed rule check is announced by the check, not by this page.
