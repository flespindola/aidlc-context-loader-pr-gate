import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { runPrGate } from '../src/pr-gate-entry.ts'
import { runContextLoader } from '../../../tools/context-loader.ts'

const libraryDirectory = path.join('fixtures', 'library')
const spec = 'AC-1 The home page heading reads Checkout is ready.'

describe('context loader through the PR gate', () => {
  it('selects the shipped library the same way the gate calls the loader', async () => {
    const selected = await loadDefaultSelection()
    const shipped = await shippedSelection()

    expect(selected).toEqual(shipped)
    expect(selected).toHaveLength(4)
    expect(selected.some((rulePath) => rulePath.endsWith('testing.md'))).toBe(
      false,
    )
  })

  it('blocks a home-route change with no test and passes it once a test is in the diff', async () => {
    const before = await readLibrary()
    const selected = await loadDefaultSelection()
    const routeOnly = homeRouteDiff()

    const blocked = await runPrGate({ diff: routeOnly, spec })

    expect(blocked.verdict.blocking).toBe(true)
    expect(blocked.verdict.findings).toEqual(['AC-1 in spec.md'])
    expect(blocked.verdict.notChecked).toEqual(selected)
    expect(JSON.parse(blocked.json)).toEqual(blocked.verdict)
    expect(blocked.markdown).toContain('blocking: true')
    expect(blocked.markdown).toContain('- AC-1 in spec.md')
    for (const rulePath of selected) {
      expect(blocked.markdown).toContain(`- ${rulePath}`)
    }

    const passed = await runPrGate({
      diff: `${routeOnly}${homeRouteTestDiff()}`,
      spec,
    })

    expect(passed.verdict.blocking).toBe(false)
    expect(passed.verdict.findings).toEqual([])
    expect(passed.verdict.notChecked).toEqual(selected)
    expect(JSON.parse(passed.json)).toEqual(passed.verdict)
    expect(passed.markdown).toContain('blocking: false')
    expect(await readLibrary()).toEqual(before)
  })
})

async function loadDefaultSelection(): Promise<string[]> {
  let stdout = ''
  const exitCode = await runContextLoader([], {
    stdout: {
      write: (chunk: string) => {
        stdout += chunk
      },
    },
    stderr: { write: () => undefined },
  })
  expect(exitCode).toBe(0)
  const payload = JSON.parse(stdout) as { selected?: Array<{ path?: unknown }> }
  expect(Array.isArray(payload.selected)).toBe(true)
  return (payload.selected ?? []).map((rule) => {
    expect(typeof rule.path).toBe('string')
    return rule.path as string
  })
}

async function shippedSelection(): Promise<string[]> {
  const names = (await readdir(libraryDirectory))
    .filter((name) => name.endsWith('.md'))
    .sort((left, right) => left.localeCompare(right))
    .slice(0, 4)
  return names.map((name) => path.join(libraryDirectory, name))
}

async function readLibrary(): Promise<Record<string, string>> {
  const names = (await readdir(libraryDirectory))
    .filter((name) => name.endsWith('.md'))
    .sort()
  const files: Record<string, string> = {}
  for (const name of names) {
    files[name] = await readFile(path.join(libraryDirectory, name), 'utf8')
  }
  return files
}

function homeRouteDiff(): string {
  return [
    'diff --git a/src/routes/index.tsx b/src/routes/index.tsx',
    'index 1111111..2222222 100644',
    '--- a/src/routes/index.tsx',
    '+++ b/src/routes/index.tsx',
    '@@ -12,7 +12,7 @@ function Home() {',
    '   return (',
    '     <main>',
    '-      <h1>The app is up</h1>',
    '+      <h1>Checkout is ready</h1>',
    '     </main>',
    '   )',
    ' }',
    '',
  ].join('\n')
}

function homeRouteTestDiff(): string {
  return [
    'diff --git a/src/routes/index.test.tsx b/src/routes/index.test.tsx',
    'index 3333333..4444444 100644',
    '--- a/src/routes/index.test.tsx',
    '+++ b/src/routes/index.test.tsx',
    '@@ -16,6 +16,7 @@ describe("HomeApp", () => {',
    '     expect(html).toContain("<main>")',
    '+    expect(html).toContain("<h1>Checkout is ready</h1>")',
    '   })',
    '',
  ].join('\n')
}
