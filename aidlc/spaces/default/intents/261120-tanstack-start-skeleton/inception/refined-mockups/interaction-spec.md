# Interaction Spec

Two parts of one screen. Both are specified with the component format. There is no second screen.

## Home page

| Field | Value |
|---|---|
| Component | Home page |
| Description | The only route. It tells Riley the app is up. |
| Category | layout |

### States

| State | Description | Trigger |
|---|---|---|
| default | The page shows the heading and nothing else | Riley opens the home route |
| hover | No hover treatment | The page has no control |
| focus | No extra focus target | The page has no control |
| disabled | Does not apply | There is nothing to disable |
| loading | Not used | The page does not fetch data |
| error | Not a designed state | A route that does not respond fails the route test |
| empty | Same as default | An empty or missing rule folder still shows the heading |

### Props / Inputs

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| — | — | — | — | The page takes no inputs |

### Responsive Behaviour

| Breakpoint | Behaviour |
|---|---|
| mobile (<768px) | The same heading, one column, inset from the viewport edge |
| tablet (768–1024px) | The same heading, one column |
| desktop (>1024px) | The same heading, one column, not stretched into a wide banner |

### Accessibility

| Requirement | Implementation |
|---|---|
| ARIA role | Native `main`. No extra role. |
| Keyboard interaction | Nothing to activate. No trap. |
| Label / aria-label | The `h1` is the accessible name of the content |
| Contrast ratio | WCAG AA (4.5:1 text, 3:1 UI components) |
| Screen reader | Announces the heading "The app is up" |
| Focus management | Focus stays on the document. No dialog opens. |

### Usage Example

```
<main>
  <h1>The app is up</h1>
</main>
```

## App status

| Field | Value |
|---|---|
| Component | App status |
| Description | The only text on the home page. |
| Category | display |

### States

| State | Description | Trigger |
|---|---|---|
| default | Renders the words "The app is up" as an `h1` | Page render |
| hover | No change | Not interactive |
| focus | Not a focus stop | Not interactive |
| disabled | Does not apply | Not interactive |
| loading | Not used | No request is in flight |
| error | Not used | The words do not change when a rule file is invalid |
| empty | Not used | The words are fixed copy, not a list |

### Props / Inputs

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| — | — | — | — | The words are fixed. They are not passed in from a rule file or an API. |

### Responsive Behaviour

| Breakpoint | Behaviour |
|---|---|
| mobile (<768px) | Wraps only if the viewport is narrower than the sentence. Stays one heading. |
| tablet (768–1024px) | One line |
| desktop (>1024px) | One line |

### Accessibility

| Requirement | Implementation |
|---|---|
| ARIA role | Native `h1`. No ARIA role. |
| Keyboard interaction | None |
| Label / aria-label | The visible text is the label |
| Contrast ratio | WCAG AA (4.5:1 text, 3:1 UI components) |
| Screen reader | Reads "The app is up" as the page heading |
| Focus management | Not focusable |

### Usage Example

```
<h1>The app is up</h1>
```
