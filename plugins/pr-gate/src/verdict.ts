import type { AcceptanceCriterion, GateVerdict, RuleCheck } from './types.ts'

export type VerdictInput = {
  criteria: AcceptanceCriterion[]
  checks: RuleCheck[]
  failed?: boolean
}

export type VerdictTexts = {
  verdict: GateVerdict
  json: string
  markdown: string
}

export function buildVerdict(input: VerdictInput): VerdictTexts {
  const verdict = input.failed ? emptyVerdict() : verdictFrom(input)
  return {
    verdict,
    json: `${JSON.stringify(verdict, null, 2)}\n`,
    markdown: renderMarkdown(verdict),
  }
}

function verdictFrom(input: VerdictInput): GateVerdict {
  const findings = [
    ...input.criteria
      .filter((criterion) => !criterion.covered)
      .map((criterion) => `${criterion.id} in spec.md`),
    ...input.checks
      .filter(
        (check) =>
          check.outcome === 'violated' &&
          check.file !== null &&
          check.line !== null,
      )
      .map((check) => `${check.file}:${check.line}`),
  ]
  const notChecked = input.checks
    .filter((check) => check.outcome === 'not-checked')
    .map((check) => check.rulePath)
  return { blocking: findings.length > 0, findings, notChecked }
}

function emptyVerdict(): GateVerdict {
  return { blocking: false, findings: [], notChecked: [] }
}

function renderMarkdown(verdict: GateVerdict): string {
  const findings = verdict.findings.map((finding) => `- ${finding}`).join('\n')
  const notChecked = verdict.notChecked.map((name) => `- ${name}`).join('\n')
  return [
    '# PR gate verdict',
    '',
    `blocking: ${String(verdict.blocking)}`,
    '',
    '## Findings',
    '',
    findings,
    '',
    '## Not checked',
    '',
    notChecked,
    '',
  ].join('\n')
}
