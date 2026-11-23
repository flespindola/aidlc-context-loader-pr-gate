import { checkAcCoverage } from './ac-coverage.ts'
import { checkAdrCompliance } from './adr-compliance.ts'
import type { GateVerdict } from './types.ts'
import { buildVerdict, type VerdictTexts } from './verdict.ts'

export type PrGateInput = {
  diff: string
  spec: string
  libraryDirectory?: string
}

export type PrGateRun = VerdictTexts & {
  verdict: GateVerdict
}

export async function runPrGate(input: PrGateInput): Promise<PrGateRun> {
  const coverage = checkAcCoverage(input.spec, input.diff)
  const compliance = await checkAdrCompliance(input.diff, input.libraryDirectory)
  return buildVerdict({
    criteria: coverage.criteria,
    checks: compliance.checks,
    failed: coverage.failed || compliance.failed,
  })
}
