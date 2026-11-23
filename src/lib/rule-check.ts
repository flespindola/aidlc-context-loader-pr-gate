import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

export const RULE_LIBRARY_DIRECTORY = path.join('fixtures', 'library')

const REQUIRED_FIELDS = [
  'tags',
  'applicable_stages',
  'applicable_agents',
] as const

export type RequiredField = (typeof REQUIRED_FIELDS)[number]

export type Rule = {
  filename: string
  body: string
}

export type RuleFailure =
  | {
      filename: string
      field: RequiredField
      detail: string
    }
  | {
      filename: string
      detail: 'frontmatter is unreadable'
    }

export type RuleCheckResult = {
  rules: Rule[]
  failures: RuleFailure[]
  empty: boolean
  failedParse: boolean
  report: string
}

const EMPTY_REPORT = 'There are no rule files'
const KEY_LINE = /^([A-Za-z_][A-Za-z0-9_]*):[ \t]*(.*)$/

export async function checkRuleLibrary(
  libraryDirectory: string = RULE_LIBRARY_DIRECTORY,
): Promise<RuleCheckResult> {
  const filenames = await listMarkdownFiles(libraryDirectory)
  if (filenames.length === 0) {
    return {
      rules: [],
      failures: [],
      empty: true,
      failedParse: false,
      report: EMPTY_REPORT,
    }
  }

  return checkFiles(libraryDirectory, filenames)
}

async function listMarkdownFiles(libraryDirectory: string): Promise<string[]> {
  try {
    const entries = await readdir(libraryDirectory, { withFileTypes: true })
    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
      .map((entry) => entry.name)
      .sort()
  } catch (error) {
    if (isMissingDirectory(error)) return []
    throw error
  }
}

async function checkFiles(
  libraryDirectory: string,
  filenames: string[],
): Promise<RuleCheckResult> {
  const rules: Rule[] = []
  const failures: RuleFailure[] = []

  for (const filename of filenames) {
    const source = await readFile(path.join(libraryDirectory, filename), 'utf8')
    const parsed = parseFrontmatter(source)
    if (!parsed) {
      failures.push({ filename, detail: 'frontmatter is unreadable' })
      continue
    }

    const missing = REQUIRED_FIELDS.filter((field) => !parsed.keys.has(field))
    if (missing.length > 0) {
      for (const field of missing) {
        failures.push({ filename, field, detail: `missing ${field}` })
      }
      continue
    }

    rules.push({ filename, body: parsed.body })
  }

  const failedParse = failures.some((failure) => !('field' in failure))
  return {
    rules,
    failures,
    empty: false,
    failedParse,
    report: reportFor(failures, failedParse),
  }
}

function reportFor(failures: RuleFailure[], failedParse: boolean): string {
  if (failedParse) return 'Frontmatter is unreadable'
  if (failures.length > 0) return 'A rule file is missing a required field'
  return 'Every rule file is valid'
}

function parseFrontmatter(
  source: string,
): { keys: Set<string>; body: string } | null {
  const text = source.replace(/^\uFEFF/, '').replaceAll('\r\n', '\n')
  if (!text.startsWith('---\n')) return null

  const lines = text.slice(4).split('\n')
  const closingIndex = lines.findIndex((line) => line.trim() === '---')
  if (closingIndex === -1) return null

  const keys = new Set<string>()
  for (const line of lines.slice(0, closingIndex)) {
    if (line.trim() === '' || line.trimStart().startsWith('#')) continue
    if (/^[ \t]/.test(line)) {
      if (keys.size === 0) return null
      continue
    }
    const match = KEY_LINE.exec(line)
    if (!match) return null
    keys.add(match[1])
  }

  return { keys, body: lines.slice(closingIndex + 1).join('\n') }
}

function isMissingDirectory(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 'ENOENT'
  )
}
