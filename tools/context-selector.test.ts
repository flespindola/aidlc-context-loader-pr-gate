import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import { runContextLoader } from './context-loader'
import {
  selectContext,
  selectionJsonBytes,
} from './context-selector'

const workRoot = path.join(process.cwd(), 'fixtures', '.test-work')
const createdDirectories: string[] = []
const realLibrary = path.join('fixtures', 'library')

beforeAll(async () => {
  await mkdir(workRoot, { recursive: true })
})

afterEach(async () => {
  await Promise.all(
    createdDirectories
      .splice(0)
      .map((directory) => rm(directory, { recursive: true, force: true })),
  )
})

describe('ContextSelector', () => {
  it('selects rules with OR across dimensions and scores matches (happy path)', async () => {
    const result = await selectContext({
      stage: 'construction',
      agent: 'developer',
      tags: ['routing'],
      libraryDirectory: realLibrary,
    })

    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.exitCode).toBe(0)
    expect(result.output.selected.length).toBeGreaterThanOrEqual(2)
    expect(result.output.selected.length).toBeLessThanOrEqual(4)
    // NFR1 target is <5 ms; use a generous local budget against wall-clock noise.
    expect(result.durationMs).toBeLessThan(50)
    const routing = result.output.selected.find((rule) => rule.id === 'routing.md')
    expect(routing?.score).toBeGreaterThanOrEqual(2)
  })

  it('uses case-sensitive prefix match for stage', async () => {
    const result = await selectContext({
      stage: 'construct',
      libraryDirectory: realLibrary,
    })

    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.output.selected.length).toBeGreaterThan(0)
    expect(
      result.output.selected.every((rule) =>
        rule.applicable_stages.some((stage) => stage.startsWith('construct')),
      ),
    ).toBe(true)
  })

  it('caps at four and breaks ties by ascending filename', async () => {
    const library = await makeLibrary()
    for (const name of ['e.md', 'd.md', 'c.md', 'b.md', 'a.md']) {
      await writeRule(library, name, {
        tags: 'shared',
        applicable_stages: 'construction',
        applicable_agents: 'developer',
      })
    }

    const result = await selectContext({
      tags: ['shared'],
      libraryDirectory: library,
    })

    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.output.selected.map((rule) => rule.id)).toEqual([
      'a.md',
      'b.md',
      'c.md',
      'd.md',
    ])
  })

  it('treats no filters as all candidates then top four by filename', async () => {
    const result = await selectContext({ libraryDirectory: realLibrary })

    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.output.selected.length).toBeLessThanOrEqual(4)
    const ids = result.output.selected.map((rule) => rule.id)
    expect(ids).toEqual([...ids].sort((a, b) => a.localeCompare(b)))
  })

  it('under-floor returns JSON, warns, and exits 0', async () => {
    const library = await makeLibrary()
    await writeRule(library, 'only.md', {
      tags: 'unique-tag-xyz',
      applicable_stages: 'other',
      applicable_agents: 'other',
    })

    const stderr: string[] = []
    const stdout: string[] = []
    const code = await runContextLoader(
      ['--tags', 'unique-tag-xyz', '--library', library],
      {
        stdout: { write: (chunk) => stdout.push(chunk) },
        stderr: { write: (chunk) => stderr.push(chunk) },
      },
    )

    expect(code).toBe(0)
    expect(stderr.join('')).toMatch(/under preferred floor/i)
    const payload = JSON.parse(stdout.join('')) as {
      selected: unknown[]
      index: { underFloor: boolean }
    }
    expect(payload.selected.length).toBe(1)
    expect(payload.index.underFloor).toBe(true)
  })

  it('keeps compact JSON under 3 KB', async () => {
    const result = await selectContext({
      stage: 'construction',
      libraryDirectory: realLibrary,
    })

    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(selectionJsonBytes(result.output)).toBeLessThan(3 * 1024)
  })

  it('hard-fails with non-zero exit on malformed library', async () => {
    const library = await makeLibrary()
    await writeFile(path.join(library, 'bad.md'), 'not yaml\n')

    const stderr: string[] = []
    const code = await runContextLoader(['--library', library], {
      stdout: { write: () => undefined },
      stderr: { write: (chunk) => stderr.push(chunk) },
    })

    expect(code).toBe(1)
    expect(stderr.join('')).toMatch(/unreadable/i)
  })
})

async function makeLibrary(): Promise<string> {
  const directory = await mkdtemp(path.join(workRoot, 'sel-'))
  createdDirectories.push(directory)
  return directory
}

async function writeRule(
  library: string,
  filename: string,
  fields: Record<string, string>,
): Promise<void> {
  const frontmatter = Object.entries(fields)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n')
  await writeFile(
    path.join(library, filename),
    `---\n${frontmatter}\n---\nBody for ${filename}\n`,
  )
}
