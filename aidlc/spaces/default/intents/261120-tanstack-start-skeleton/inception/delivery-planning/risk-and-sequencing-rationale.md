# Risk and Sequencing Rationale

The order is walking-skeleton first, in the sense Cockburn uses: build the smallest slice that runs the whole way through before adding features. `team-practices.md` already says that slice is always first. `unit-of-work-dependency.md` has one unit and no edge, so there is no other legal order and no deviation from the graph.

A weighted score of value against size (WSJF) is not used. There is one Bolt, one build pass over `u1-skeleton`, and nothing to rank against it. Value-first and risk-first would pick the same single pass.

## Risks

| Risk | Likelihood | Impact | What we do |
|---|---|---|---|
| Frontmatter value types were left unnamed | Low for this slice | Medium if a type is invented during the build | Check that the three fields are present. Do not choose their types in this Bolt. |
| The styling approach was left unnamed | Low | Low, the page is one heading | Use one approach. Do not add a second system, and do not name one here. |
| A failed rule file might be named without saying why | Low | Low, the approved check names the file | Keep the approved check. Do not widen it in this plan. |
| The TanStack Start layout was not given directory names | Low | Medium if a second source tree appears | Follow the approved sentence: new code uses that layout and does not add a second top-level source tree. |

None of these change the order. The game, accounts, scores, and deploys stay out of this Bolt.
