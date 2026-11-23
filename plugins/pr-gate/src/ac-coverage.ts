import type { AcceptanceCriterion } from './types.ts'
import { hasAutomatedTestChange, parseUnifiedDiff } from './unified-diff.ts'

const ACCEPTANCE_ID = /\bAC-([1-9][0-9]*)\b/g

export type AcCoverageResult = {
  criteria: AcceptanceCriterion[]
  blocking: boolean
  failed: boolean
}

export function checkAcCoverage(
  spec: string | null | undefined,
  diff: string | null | undefined,
): AcCoverageResult {
  if (typeof spec !== 'string' || typeof diff !== 'string') {
    return { criteria: [], blocking: false, failed: true }
  }
  const parsed = parseUnifiedDiff(diff)
  if (!parsed.ok) return { criteria: [], blocking: false, failed: true }

  const criteria = collectAcceptanceIds(spec).map((id) => ({
    id,
    covered: hasAutomatedTestChange(parsed.files),
  }))
  return {
    criteria,
    blocking: criteria.some((criterion) => !criterion.covered),
    failed: false,
  }
}

function collectAcceptanceIds(spec: string): string[] {
  const ids: string[] = []
  const seen = new Set<string>()
  for (const match of spec.matchAll(ACCEPTANCE_ID)) {
    const id = `AC-${match[1]}`
    if (seen.has(id)) continue
    seen.add(id)
    ids.push(id)
  }
  return ids
}
