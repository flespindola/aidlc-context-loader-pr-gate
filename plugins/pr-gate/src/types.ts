export type AcceptanceCriterion = {
  id: string
  covered: boolean
}

export type RuleOutcome = 'violated' | 'not-checked' | 'passed'

export type RuleCheck = {
  rulePath: string
  outcome: RuleOutcome
  file: string | null
  line: number | null
}

export type GateVerdict = {
  blocking: boolean
  findings: string[]
  notChecked: string[]
}
