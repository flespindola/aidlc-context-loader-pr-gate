# Domain Design Questions

The home page and the rule check do not call each other. The page shows "The app is up" and does not read `fixtures/library`. The check only reads those Markdown files. That is the one boundary still open. Entity ownership, the lack of a call between them, and the single home-page screen are already fixed by `requirements.md`, `stories.md`, and the refined mockups.

## Q1. [Developer] How should the skeleton be split into building blocks?

This decides whether the home page and the rule-file check are one piece of code or two. They do not call each other.

A. Two blocks that do not call each other: the home page app, and the rule-file check.
B. One block that owns both the home page and the rule-file check.
X. Other (please specify)

[Answer]: A. Two blocks that do not call each other: the home page app, and the rule-file check.
