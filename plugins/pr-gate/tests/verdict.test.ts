import { describe, expect, it } from 'vitest'
import type { AcceptanceCriterion, RuleCheck } from '../src/types.ts'
import { buildVerdict } from '../src/verdict.ts'

describe('Verdict', () => {
  it('lists the same findings in the JSON and the Markdown', () => {
    const texts = buildVerdict({
      criteria: uncovered('AC-1'),
      checks: [violation('src/pay.ts', 3), notChecked('rules/prose-rule.md')],
    })
    const parsed = JSON.parse(texts.json) as { findings: string[] }

    expect(parsed.findings).toEqual(texts.verdict.findings)
    expect(texts.verdict.findings).toEqual(['AC-1 in spec.md', 'src/pay.ts:3'])
    for (const finding of texts.verdict.findings) {
      expect(texts.markdown).toContain(finding)
    }
  })

  it('names an uncovered id and spec.md, and a violation file and line', () => {
    const texts = buildVerdict({
      criteria: uncovered('AC-9'),
      checks: [violation('src/api.ts', 12)],
    })

    expect(texts.verdict.findings[0]).toContain('AC-9')
    expect(texts.verdict.findings[0]).toContain('spec.md')
    expect(texts.verdict.findings[1]).toContain('src/api.ts')
    expect(texts.verdict.findings[1]).toContain('12')
    expect(texts.markdown).toContain('AC-9')
    expect(texts.markdown).toContain('spec.md')
    expect(texts.markdown).toContain('src/api.ts')
    expect(texts.markdown).toContain('12')
  })

  it('blocks for an uncovered id or a violation, and not for not-checked alone', () => {
    const uncoveredOnly = buildVerdict({
      criteria: uncovered('AC-2'),
      checks: [],
    })
    const violatedOnly = buildVerdict({
      criteria: [],
      checks: [violation('src/pay.ts', 4)],
    })
    const namedOnly = buildVerdict({
      criteria: [{ id: 'AC-2', covered: true }],
      checks: [notChecked('rules/prose-rule.md')],
    })

    expect(uncoveredOnly.verdict.blocking).toBe(true)
    expect(violatedOnly.verdict.blocking).toBe(true)
    expect(namedOnly.verdict.blocking).toBe(false)
    expect(namedOnly.verdict.notChecked).toEqual(['rules/prose-rule.md'])
  })
})

function uncovered(id: string): AcceptanceCriterion[] {
  return [{ id, covered: false }]
}

function violation(file: string, line: number): RuleCheck {
  return {
    rulePath: 'rules/checkable-rule.md',
    outcome: 'violated',
    file,
    line,
  }
}

function notChecked(rulePath: string): RuleCheck {
  return { rulePath, outcome: 'not-checked', file: null, line: null }
}
