import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { renderToStaticMarkup } from 'react-dom/server'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import { checkRuleLibrary } from '../lib/rule-check'
import { Route as HomeRoute } from './index'

const heading = '<h1>The app is up</h1>'
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

describe('home page and rule library', () => {
  it('lets the home page respond when the library is empty', async () => {
    const library = await makeLibrary()

    const result = await checkRuleLibrary(library)
    const html = renderHome()

    expect(result.report).toBe('There are no rule files')
    expect(result.failedParse).toBe(false)
    expect(html).toContain(heading)
  })

  it('does not change the heading when a rule file is invalid', async () => {
    const before = renderHome()
    const library = await makeLibrary()
    await writeFile(
      path.join(library, 'broken.md'),
      '---\nnot frontmatter\n---\nBroken.\n',
    )

    const result = await checkRuleLibrary(library)
    const after = renderHome()

    expect(result.failures).toEqual([
      { filename: 'broken.md', detail: 'frontmatter is unreadable' },
    ])
    expect(after).toBe(before)
    expect(after).toContain(heading)
  })
})

async function makeLibrary(): Promise<string> {
  const directory = await mkdtemp(path.join(workRoot, 'library-'))
  createdDirectories.push(directory)
  return directory
}

function renderHome(): string {
  const Page = HomeRoute.options.component
  if (!Page) throw new Error('Home route has no component')
  return renderToStaticMarkup(<Page />)
}
