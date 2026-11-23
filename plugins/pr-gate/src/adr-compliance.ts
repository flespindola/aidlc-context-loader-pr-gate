import { readFile } from 'node:fs/promises'
import { runContextLoader } from '../../../tools/context-loader.ts'
import type { RuleCheck } from './types.ts'
import { firstAddedMatch, parseUnifiedDiff } from './unified-diff.ts'

export type AdrComplianceResult = {
  checks: RuleCheck[]
  blocking: boolean
  failed: boolean
}

type LoaderSelection = {
  path?: unknown
}

export async function checkAdrCompliance(
  diff: string | null | undefined,
  libraryDirectory?: string,
): Promise<AdrComplianceResult> {
  if (typeof diff !== 'string') {
    return { checks: [], blocking: false, failed: true }
  }
  const parsed = parseUnifiedDiff(diff)
  if (!parsed.ok) return { checks: [], blocking: false, failed: true }

  const selected = await loadSelectedRules(libraryDirectory)
  if (!selected.ok) return { checks: [], blocking: false, failed: true }

  const checks: RuleCheck[] = []
  for (const rulePath of selected.paths) {
    const text = await readRule(rulePath)
    if (text === null) return { checks: [], blocking: false, failed: true }
    checks.push(checkRule(rulePath, text, parsed.files))
  }
  return {
    checks,
    blocking: checks.some((check) => check.outcome === 'violated'),
    failed: false,
  }
}

function checkRule(
  rulePath: string,
  text: string,
  files: Parameters<typeof firstAddedMatch>[0],
): RuleCheck {
  const literal = forbidLiteral(text)
  if (literal === null) {
    return { rulePath, outcome: 'not-checked', file: null, line: null }
  }
  const hit = firstAddedMatch(files, literal)
  if (!hit) return { rulePath, outcome: 'passed', file: null, line: null }
  return { rulePath, outcome: 'violated', file: hit.file, line: hit.line }
}

async function loadSelectedRules(
  libraryDirectory: string | undefined,
): Promise<{ ok: true; paths: string[] } | { ok: false }> {
  const argv =
    typeof libraryDirectory === 'string' && libraryDirectory.length > 0
      ? ['--library', libraryDirectory]
      : []
  let stdout = ''
  try {
    const exitCode = await runContextLoader(argv, {
      stdout: {
        write: (chunk: string) => {
          stdout += chunk
        },
      },
      stderr: { write: () => undefined },
    })
    if (exitCode !== 0) return { ok: false }
    const payload = JSON.parse(stdout) as { selected?: LoaderSelection[] }
    if (!Array.isArray(payload.selected)) return { ok: false }
    const paths: string[] = []
    for (const rule of payload.selected) {
      if (typeof rule.path !== 'string' || rule.path.length === 0) {
        return { ok: false }
      }
      paths.push(rule.path)
    }
    return { ok: true, paths }
  } catch {
    return { ok: false }
  }
}

async function readRule(rulePath: string): Promise<string | null> {
  try {
    return await readFile(rulePath, 'utf8')
  } catch {
    return null
  }
}

function forbidLiteral(text: string): string | null {
  const fences = [...text.matchAll(/```([^\n`]*)\r?\n([\s\S]*?)```/g)].filter(
    (match) => match[1].trim() === 'diff-check',
  )
  if (fences.length !== 1) return null
  const body = fences[0][2].replaceAll('\r\n', '\n').replace(/\n$/, '')
  const lines = body.split('\n')
  if (lines.length !== 1) return null
  const parsed = /^forbid (.+)$/.exec(lines[0].trim())
  if (!parsed) return null
  return parsed[1]
}
