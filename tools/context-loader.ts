#!/usr/bin/env node
import { selectContext, selectionJsonBytes } from './context-selector.ts'

export type ParsedArgs = {
  stage?: string
  agent?: string
  tags?: string[]
  libraryDirectory?: string
  help?: boolean
}

export function parseArgs(argv: string[]): ParsedArgs {
  const result: ParsedArgs = {}
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]
    if (arg === '--help' || arg === '-h') {
      result.help = true
      continue
    }
    if (arg === '--stage') {
      result.stage = argv[++i]
      continue
    }
    if (arg === '--agent') {
      result.agent = argv[++i]
      continue
    }
    if (arg === '--tags') {
      const raw = argv[++i] ?? ''
      result.tags = raw
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean)
      continue
    }
    if (arg === '--library') {
      result.libraryDirectory = argv[++i]
      continue
    }
  }
  return result
}

export async function runContextLoader(
  argv: string[],
  io: {
    stdout: { write: (chunk: string) => void }
    stderr: { write: (chunk: string) => void }
  } = process,
): Promise<number> {
  const args = parseArgs(argv)
  if (args.help) {
    io.stderr.write(
      'Usage: context-loader [--stage <slug>] [--agent <role>] [--tags <csv>] [--library <dir>]\n',
    )
    return 0
  }

  const result = await selectContext({
    stage: args.stage,
    agent: args.agent,
    tags: args.tags,
    libraryDirectory: args.libraryDirectory,
  })

  if (!result.ok) {
    for (const warning of result.warnings) {
      io.stderr.write(`${warning}\n`)
    }
    return result.exitCode
  }

  for (const warning of result.output.warnings) {
    io.stderr.write(`${warning}\n`)
  }

  const payload = {
    selected: result.output.selected,
    index: result.output.index,
  }
  const json = `${JSON.stringify(payload)}\n`
  if (selectionJsonBytes(result.output) >= 3 * 1024) {
    io.stderr.write('Compact index payload exceeds 3 KB budget.\n')
  }
  io.stdout.write(json)
  return result.exitCode
}

const isDirectRun =
  typeof process.argv[1] === 'string' &&
  (process.argv[1].endsWith('context-loader.ts') ||
    process.argv[1].endsWith('context-loader.js'))

if (isDirectRun) {
  runContextLoader(process.argv.slice(2))
    .then((code) => {
      process.exitCode = code
    })
    .catch((error: unknown) => {
      const message = error instanceof Error ? error.message : String(error)
      process.stderr.write(`${message}\n`)
      process.exitCode = 1
    })
}
