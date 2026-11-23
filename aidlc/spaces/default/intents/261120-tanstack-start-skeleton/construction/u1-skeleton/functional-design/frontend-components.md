# Frontend Components — u1-skeleton

The home page is the only screen. It does not read rules, call a remote API, or collect input.

## Hierarchy

- Home page
  - App status

There is no navigation, form, button, image, or rule list.

## Home page

- Role: the only route in this phase.
- Props: none.
- State: one state, shown. No loading state and no error state.
- Interaction: the person opens the route and reads the heading. Nothing is submitted.
- Data: none. The page does not fetch.
- Sign-in: none.
- Styling: one approach for the whole project. The approach is not named in this phase. A second styling system is out of scope.

## App status

- Role: the only content on the home page.
- Renders one heading, "The app is up", inside the main region.
- The browser tab uses the same sentence.
- Props: the fixed sentence. No parent passes data.
- State: none of its own.
- Validation: none. There is no form.
- API: none.

## What the page does not show

The rule check's valid, invalid, and empty outcomes stay off the page. A failed rule file does not change the heading.
