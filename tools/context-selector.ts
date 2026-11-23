import {
  loadRuleLibrary,
  type RuleDocument,
  type RuleLibraryError,
} from './rule-library.ts'

export type SelectionRequest = {
  stage?: string
  agent?: string
  tags?: string[]
  libraryDirectory?: string
}

export type SelectedRuleSummary = {
  id: string
  path: string
  filename: string
  tags: string[]
  applicable_stages: string[]
  applicable_agents: string[]
  score: number
}

export type CompactIndex = {
  count: number
  underFloor: boolean
  rules: Array<{ id: string; tags: string[]; score: number }>
}

export type SelectionOutput = {
  selected: SelectedRuleSummary[]
  index: CompactIndex
  matchCount: number
  underFloor: boolean
  warnings: string[]
}

export type SelectionOk = {
  ok: true
  output: SelectionOutput
  durationMs: number
  exitCode: 0
}

export type SelectionHardFail = {
  ok: false
  errors: RuleLibraryError[]
  exitCode: number
  warnings: string[]
}

export type SelectionResult = SelectionOk | SelectionHardFail

const MAX_SELECTED = 4
const PREFERRED_FLOOR = 2

export async function selectContext(
  request: SelectionRequest,
): Promise<SelectionResult> {
  const started = performance.now()
  const loaded = await loadRuleLibrary(request.libraryDirectory)
  if (!loaded.ok) {
    return {
      ok: false,
      errors: loaded.errors,
      exitCode: 1,
      warnings: loaded.errors.map(formatLibraryError),
    }
  }

  const filtersProvided = hasAnyFilter(request)
  const scored = loaded.rules
    .map((rule) => scoreRule(rule, request, filtersProvided))
    .filter((entry) => entry.eligible)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return a.rule.filename.localeCompare(b.rule.filename)
    })

  const top = scored.slice(0, MAX_SELECTED)
  const matchCount = scored.length
  const underFloor = matchCount < PREFERRED_FLOOR
  const warnings: string[] = []
  if (underFloor) {
    warnings.push(
      `Selection under preferred floor of ${PREFERRED_FLOOR}: matched ${matchCount} rule(s).`,
    )
  }

  const selected: SelectedRuleSummary[] = top.map(({ rule, score }) => ({
    id: rule.filename,
    path: rule.path,
    filename: rule.filename,
    tags: rule.tags,
    applicable_stages: rule.applicableStages,
    applicable_agents: rule.applicableAgents,
    score,
  }))

  const index: CompactIndex = {
    count: selected.length,
    underFloor,
    rules: selected.map((rule) => ({
      id: rule.id,
      tags: rule.tags,
      score: rule.score,
    })),
  }

  const output: SelectionOutput = {
    selected,
    index,
    matchCount,
    underFloor,
    warnings,
  }

  return {
    ok: true,
    output,
    durationMs: performance.now() - started,
    exitCode: 0,
  }
}

export function selectionJsonBytes(output: SelectionOutput): number {
  return Buffer.byteLength(JSON.stringify({ selected: output.selected, index: output.index }), 'utf8')
}

function hasAnyFilter(request: SelectionRequest): boolean {
  return Boolean(
    (request.stage && request.stage.trim()) ||
      (request.agent && request.agent.trim()) ||
      (request.tags && request.tags.length > 0),
  )
}

function scoreRule(
  rule: RuleDocument,
  request: SelectionRequest,
  filtersProvided: boolean,
): { rule: RuleDocument; score: number; eligible: boolean } {
  if (!filtersProvided) {
    return { rule, score: 0, eligible: true }
  }

  let score = 0
  let matchedAny = false

  if (request.stage && request.stage.trim()) {
    if (prefixMatches(request.stage.trim(), rule.applicableStages)) {
      score += 1
      matchedAny = true
    }
  }

  if (request.agent && request.agent.trim()) {
    if (prefixMatches(request.agent.trim(), rule.applicableAgents)) {
      score += 1
      matchedAny = true
    }
  }

  if (request.tags && request.tags.length > 0) {
    const wanted = request.tags.map((tag) => tag.trim()).filter(Boolean)
    if (wanted.some((tag) => rule.tags.includes(tag))) {
      score += 1
      matchedAny = true
    }
  }

  return { rule, score, eligible: matchedAny }
}

function prefixMatches(request: string, entries: string[]): boolean {
  if (entries.length === 0) return false
  return entries.some((entry) => entry.startsWith(request))
}

function formatLibraryError(error: RuleLibraryError): string {
  if (error.field) {
    return `${error.filename}: ${error.detail}`
  }
  return `${error.filename}: ${error.detail}`
}
