import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

export const RULE_LIBRARY_DIRECTORY = path.join('fixtures', 'library')

const REQUIRED_FIELDS = [
  'tags',
  'applicable_stages',
  'applicable_agents',
] as const

export type RuleDocument = {
  filename: string
  path: string
  tags: string[]
  applicableStages: string[]
  applicableAgents: string[]
  body: string
}

export type RuleLibraryError = {
  filename: string
  detail: string
  field?: string
}

export type RuleLibraryResult =
  | { ok: true; rules: RuleDocument[] }
  | { ok: false; errors: RuleLibraryError[] }

const KEY_LINE = /^([A-Za-z_][A-Za-z0-9_]*):[ \t]*(.*)$/

export async function loadRuleLibrary(
  libraryDirectory: string = RULE_LIBRARY_DIRECTORY,
): Promise<RuleLibraryResult> {
  let filenames: string[]
  try {
    const entries = await readdir(libraryDirectory, { withFileTypes: true })
    filenames = entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
      .map((entry) => entry.name)
      .sort()
  } catch (error) {
    if (isMissingDirectory(error)) {
      return { ok: true, rules: [] }
    }
    throw error
  }

  const rules: RuleDocument[] = []
  const errors: RuleLibraryError[] = []

  for (const filename of filenames) {
    const filePath = path.join(libraryDirectory, filename)
    const source = await readFile(filePath, 'utf8')
    const parsed = parseFrontmatter(source)
    if (!parsed) {
      errors.push({ filename, detail: 'frontmatter is unreadable' })
      continue
    }

    const missing = REQUIRED_FIELDS.filter((field) => !(field in parsed.fields))
    if (missing.length > 0) {
      for (const field of missing) {
        errors.push({
          filename,
          field,
          detail: `missing ${field}`,
        })
      }
      continue
    }

    rules.push({
      filename,
      path: filePath,
      tags: toSet(parsed.fields.tags),
      applicableStages: toSet(parsed.fields.applicable_stages),
      applicableAgents: toSet(parsed.fields.applicable_agents),
      body: parsed.body,
    })
  }

  if (errors.length > 0) {
    return { ok: false, errors }
  }

  return { ok: true, rules }
}

function toSet(raw: string | string[]): string[] {
  const values = Array.isArray(raw) ? raw : [raw]
  return values
    .map((value) => value.trim())
    .filter((value) => value.length > 0)
}

function parseFrontmatter(source: string): {
  fields: Record<string, string | string[]>
  body: string
} | null {
  const text = source.replace(/^\uFEFF/, '').replaceAll('\r\n', '\n')
  if (!text.startsWith('---\n')) return null

  const lines = text.slice(4).split('\n')
  const closingIndex = lines.findIndex((line) => line.trim() === '---')
  if (closingIndex === -1) return null

  const fields: Record<string, string | string[]> = {}
  let currentListKey: string | null = null

  for (const line of lines.slice(0, closingIndex)) {
    if (line.trim() === '' || line.trimStart().startsWith('#')) continue

    const listItem = /^[ \t]+-[ \t]+(.*)$/.exec(line)
    if (listItem && currentListKey) {
      const existing = fields[currentListKey]
      const next = listItem[1].trim()
      if (Array.isArray(existing)) {
        existing.push(next)
      } else if (typeof existing === 'string') {
        fields[currentListKey] = [existing, next]
      } else {
        fields[currentListKey] = [next]
      }
      continue
    }

    if (/^[ \t]/.test(line)) {
      return null
    }

    const match = KEY_LINE.exec(line)
    if (!match) return null

    const key = match[1]
    const value = match[2].trim()
    if (value === '' || value === '|' || value === '>') {
      currentListKey = key
      fields[key] = []
      continue
    }

    currentListKey = null
    fields[key] = stripQuotes(value)
  }

  return { fields, body: lines.slice(closingIndex + 1).join('\n') }
}

function stripQuotes(value: string): string {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1)
  }
  return value
}

function isMissingDirectory(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 'ENOENT'
  )
}
