# Tech Stack Decisions — u1-skeleton

Choices already fixed in `requirements.md`. Nothing here adds a tool the requirements left unnamed.

| Choice | Decision | Why |
| --- | --- | --- |
| Language | TypeScript | The requirements say naming stays ordinary TypeScript. |
| Application framework | TanStack Start | The requirements name it as the application framework. Routes, server logic, and UI follow that layout. |
| Formatter | Prettier | The requirements name it, once the project has it. |
| Linter | ESLint | The requirements name it, once the project has it. |
| Tests | Written after the code they cover | The requirements and `rules.md` say so. The test runner is not chosen until the project exists. The project's test command is still unset. |
| Styling | One approach, unnamed | `requirements.md` forbids a second styling system and does not name the approach. |
| Data store | None | The home page fetches nothing. Rule files are markdown under `fixtures/library`. |
| Hosting | None this phase | NFR1.2: no staging, preview, or production deploy. |
| Package manager | Not chosen | The project has no package file yet. This phase does not pick one ahead of that file. |

The behavior these choices must satisfy is in `functional-spec.md`.
