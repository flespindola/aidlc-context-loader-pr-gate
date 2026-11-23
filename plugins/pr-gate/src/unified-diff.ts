export type AddedLine = {
  line: number
  text: string
}

export type DiffFileKind = 'content' | 'deletion-only' | 'rename-only' | 'binary'

export type DiffFile = {
  path: string
  kind: DiffFileKind
  addedLines: AddedLine[]
}

export type ParsedDiff = { ok: true; files: DiffFile[] } | { ok: false }

const TEST_SUFFIXES = ['.test.ts', '.test.tsx', '.spec.ts'] as const

export function isAutomatedTestPath(filePath: string): boolean {
  return TEST_SUFFIXES.some((suffix) => filePath.endsWith(suffix))
}

export function parseUnifiedDiff(diff: string): ParsedDiff {
  const normalized = diff.replaceAll('\r\n', '\n')
  if (normalized.trim() === '') return { ok: true, files: [] }
  if (!normalized.includes('diff --git ')) return { ok: false }

  const sections = normalized
    .split(/^(?=diff --git )/m)
    .filter((section) => section.startsWith('diff --git '))
  if (sections.length === 0) return { ok: false }

  const files: DiffFile[] = []
  for (const section of sections) {
    const parsed = parseSection(section)
    if (!parsed) return { ok: false }
    files.push(parsed)
  }
  return { ok: true, files }
}

export function hasAutomatedTestChange(files: DiffFile[]): boolean {
  return files.some(
    (file) => file.kind === 'content' && isAutomatedTestPath(file.path),
  )
}

export function firstAddedMatch(
  files: DiffFile[],
  literal: string,
): { file: string; line: number } | null {
  for (const file of files) {
    if (file.kind !== 'content') continue
    for (const added of file.addedLines) {
      if (added.text.includes(literal)) {
        return { file: file.path, line: added.line }
      }
    }
  }
  return null
}

function parseSection(section: string): DiffFile | null {
  const header = section.split('\n')[0] ?? ''
  const paths = splitGitHeader(header)
  if (!paths) return null
  const addedLines = collectAddedLines(section)
  const kind = classifySection(section, addedLines)
  return {
    path: paths.newPath,
    kind,
    addedLines: kind === 'content' ? addedLines : [],
  }
}

function splitGitHeader(
  header: string,
): { oldPath: string; newPath: string } | null {
  const prefix = 'diff --git '
  if (!header.startsWith(prefix)) return null
  const body = header.slice(prefix.length)
  const marker = ' b/'
  const index = body.indexOf(marker)
  if (!body.startsWith('a/') || index < 2) return null
  const oldPath = body.slice('a/'.length, index)
  const newPath = body.slice(index + marker.length)
  if (oldPath.length === 0 || newPath.length === 0) return null
  return { oldPath, newPath }
}

function classifySection(section: string, addedLines: AddedLine[]): DiffFileKind {
  if (/^Binary files /m.test(section)) return 'binary'
  // A rename with no hunk has no content change. A rename that also edits
  // the file has a hunk and remains evidence.
  const renameOnly =
    /^rename from /m.test(section) &&
    /^rename to /m.test(section) &&
    !/^@@ /m.test(section)
  if (renameOnly) return 'rename-only'
  if (
    /^deleted file mode /m.test(section) ||
    /^\+\+\+ \/dev\/null$/m.test(section)
  ) {
    return 'deletion-only'
  }
  if (addedLines.length > 0 || /^new file mode /m.test(section)) {
    return 'content'
  }
  return 'deletion-only'
}

function collectAddedLines(section: string): AddedLine[] {
  const added: AddedLine[] = []
  let newLine = 0
  let inHunk = false
  for (const line of section.split('\n')) {
    const hunk = /^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/.exec(line)
    if (hunk) {
      inHunk = true
      newLine = Number(hunk[1])
      continue
    }
    if (!inHunk) continue
    if (line.startsWith('\\') || line === '') {
      if (line === '') inHunk = false
      continue
    }
    if (line.startsWith('+')) {
      added.push({ line: newLine, text: line.slice(1) })
      newLine += 1
      continue
    }
    if (line.startsWith('-')) continue
    newLine += 1
  }
  return added
}
