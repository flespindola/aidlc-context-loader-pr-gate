# Entities — u1-skeleton

The YAML block is the source of truth for the entity set.

```yaml
entities:
  - name: Rule
    owner: RuleLibrary
    description: One architecture rule. The filename is the identity. HomeApp owns no entity and does not read a Rule.
    attributes:
      - name: filename
        logical_type: text
        required: true
        unique: true
        references: none
        allowed_values: none
        default: none
        constraints: The file is a markdown file under fixtures/library. The filename distinguishes one rule from another.
      - name: tags
        logical_type: unspecified
        required: true
        unique: false
        references: none
        allowed_values: none
        default: none
        constraints: The field must be present. The kind of value is not chosen in this phase.
      - name: applicable_stages
        logical_type: unspecified
        required: true
        unique: false
        references: none
        allowed_values: none
        default: none
        constraints: The field must be present. The kind of value is not chosen in this phase.
      - name: applicable_agents
        logical_type: unspecified
        required: true
        unique: false
        references: none
        allowed_values: none
        default: none
        constraints: The field must be present. It records the mark on the file. It does not add behavior of its own in this phase.
      - name: body
        logical_type: prose
        required: true
        unique: false
        references: none
        allowed_values: none
        default: none
        constraints: States the rule, why it exists, and a short example. No heading is required.
    constraints:
      - Missing tags, applicable_stages, or applicable_agents means the file is not a Rule.
      - Frontmatter that cannot be read means the file is not a Rule.
    relationships: []
```

This entity set is the model for the unit of work `u1-skeleton` recorded in `unit-of-work.md`.

## Summary

There is one entity, Rule, owned by RuleLibrary. A rule is one markdown file. HomeApp has no entity and does not read rules. The three frontmatter fields must be present. Their value kinds stay unspecified. The body is prose with the rule, the reason, and a short example.
