import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import { checkRuleLibrary } from './rule-check'

const workRoot = path.join(process.cwd(), 'fixtures', '.test-work')
const createdDirectories: string[] = []

const validFields = {
  tags: 'layout',
  applicable_stages: 'construction',
  applicable_agents: 'developer',
}

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
  it('treats two filenames as two rules', async () => {
    const library = await makeLibrary()
    await writeRule(library, 'alpha.md', validFields, 'Alpha is one rule.')
    await writeRule(library, 'beta.md', validFields, 'Beta is another rule.')

    const result = await checkRuleLibrary(library)

    expect(result.rules.map((rule) => rule.filename)).toEqual([
      'alpha.md',
      'beta.md',
    ])
  })

  it('does not treat a markdown file outside the library as a rule', async () => {
    const parent = await makeLibrary()
    const library = path.join(parent, 'library')
    await mkdir(library)
    await writeRule(
      library,
      'inside.md',
      validFields,
      'This file is in the library.',
    )
    await writeFile(path.join(parent, 'outside.md'), '# Not a rule\n')

    const result = await checkRuleLibrary(library)

    expect(result.rules.map((rule) => rule.filename)).toEqual(['inside.md'])
  })

  it('reports an empty directory as no rule files and not a failed parse', async () => {
    const library = await makeLibrary()

    const result = await checkRuleLibrary(library)

    expect(result.report).toBe('There are no rule files')
    expect(result.failedParse).toBe(false)
    expect(result.failures).toEqual([])
    expect(result.rules).toEqual([])
  })

  it('names the file and the field when tags is missing', async () => {
    const library = await makeLibrary()
    await writeRule(
      library,
      'missing-tags.md',
      {
        applicable_stages: 'construction',
        applicable_agents: 'developer',
      },
      'This file leaves out tags.',
    )

    const result = await checkRuleLibrary(library)

    expect(result.failures).toEqual([
      { filename: 'missing-tags.md', field: 'tags', detail: 'missing tags' },
    ])
    expect(result.rules).toEqual([])
  })

  it('names the file when frontmatter is unreadable', async () => {
    const library = await makeLibrary()
    await writeFile(
      path.join(library, 'broken.md'),
      '---\nthis is not frontmatter\n---\nThe body is still prose.\n',
    )

    const result = await checkRuleLibrary(library)

    expect(result.failures).toEqual([
      { filename: 'broken.md', detail: 'frontmatter is unreadable' },
    ])
    expect(result.failedParse).toBe(true)
    expect(result.rules).toEqual([])
  })

  it('keeps a valid neighbor valid', async () => {
    const library = await makeLibrary()
    await writeRule(
      library,
      'valid.md',
      validFields,
      'This neighbor stays a rule.',
    )
    await writeRule(
      library,
      'missing-tags.md',
      {
        applicable_stages: 'construction',
        applicable_agents: 'developer',
      },
      'This file leaves out tags.',
    )

    const result = await checkRuleLibrary(library)

    expect(result.rules.map((rule) => rule.filename)).toEqual(['valid.md'])
    expect(result.failures).toEqual([
      { filename: 'missing-tags.md', field: 'tags', detail: 'missing tags' },
    ])
  })

  it('accepts prose without a required heading', async () => {
    const library = await makeLibrary()
    const body =
      'Each screen is a route. This rule exists so a screen can be opened on its own. For example, the home page is the only route in this phase.'
    await writeRule(library, 'prose.md', validFields, body)

    const result = await checkRuleLibrary(library)

    expect(result.failures).toEqual([])
    expect(result.rules).toEqual([{ filename: 'prose.md', body: `${body}\n` }])
    expect(result.rules[0]?.body.includes('#')).toBe(false)
  })

  it('reads the starter rule files as rules', async () => {
    const result = await checkRuleLibrary()

    expect(result.failures).toEqual([])
    expect(result.rules.map((rule) => rule.filename)).toEqual([
      'app-structure.md',
      'routing.md',
      'server-data.md',
      'styling.md',
      'testing.md',
    ])
  })
})

async function makeLibrary(): Promise<string> {
  const directory = await mkdtemp(path.join(workRoot, 'library-'))
  createdDirectories.push(directory)
  return directory
}

async function writeRule(
  library: string,
  filename: string,
  fields: Record<string, string>,
  body: string,
): Promise<void> {
  const frontmatter = Object.entries(fields)
    .map(([field, value]) => `${field}: ${value}`)
    .join('\n')
  await writeFile(
    path.join(library, filename),
    `---\n${frontmatter}\n---\n${body}\n`,
  )
}
