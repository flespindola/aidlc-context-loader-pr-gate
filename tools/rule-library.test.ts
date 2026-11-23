import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import { loadRuleLibrary } from './rule-library'

const workRoot = path.join(process.cwd(), 'fixtures', '.test-work')
const createdDirectories: string[] = []

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

describe('RuleLibrary', () => {
  it('loads typed RuleDocuments from a valid library (happy path)', async () => {
    const result = await loadRuleLibrary(path.join('fixtures', 'library'))

    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.rules.length).toBeGreaterThanOrEqual(1)
    const first = result.rules[0]
    expect(first.filename).toMatch(/\.md$/)
    expect(first.tags.length).toBeGreaterThan(0)
    expect(first.applicableStages.length).toBeGreaterThan(0)
    expect(first.applicableAgents.length).toBeGreaterThan(0)
  })

  it('fails fast when a required frontmatter field is missing', async () => {
    const library = await makeLibrary()
    await writeFile(
      path.join(library, 'broken.md'),
      ['---', 'tags: x', 'applicable_stages: construction', '---', 'Body', ''].join(
        '\n',
      ),
    )

    const result = await loadRuleLibrary(library)

    expect(result.ok).toBe(false)
    if (result.ok) return
    expect(result.errors.some((error) => error.field === 'applicable_agents')).toBe(
      true,
    )
  })

  it('fails fast when frontmatter is unreadable', async () => {
    const library = await makeLibrary()
    await writeFile(path.join(library, 'bad.md'), 'no frontmatter here\n')

    const result = await loadRuleLibrary(library)

    expect(result.ok).toBe(false)
    if (result.ok) return
    expect(result.errors[0]?.detail).toBe('frontmatter is unreadable')
  })
})

async function makeLibrary(): Promise<string> {
  const directory = await mkdtemp(path.join(workRoot, 'lib-'))
  createdDirectories.push(directory)
  return directory
}
