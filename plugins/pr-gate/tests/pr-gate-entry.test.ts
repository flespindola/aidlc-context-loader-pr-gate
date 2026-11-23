import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { runPrGate } from '../src/pr-gate-entry.ts'

const library = path.join('plugins', 'pr-gate', 'tests', 'fixtures')

describe('PrGateEntry', () => {
  it('uses the given diff and spec and leaves both unchanged', async () => {
    const diff = addedFile('src/used-by-entry.test.ts', [
      "import { expect, it } from 'vitest'",
      "it('covers the spec', () => { expect(true).toBe(true) })",
    ])
    const spec = ['AC-941 shows the receipt.', 'AC-942 stores the card.'].join(
      '\n',
    )
    const input = Object.freeze({ diff, spec, libraryDirectory: library })

    const result = await runPrGate(input)

    expect(input.diff).toBe(diff)
    expect(input.spec).toBe(spec)
    expect(result.verdict.blocking).toBe(false)
    expect(result.verdict.findings).toEqual([])
    expect(
      result.verdict.notChecked.some((name) => name.endsWith('prose-rule.md')),
    ).toBe(true)
  })

  it('passes a clean diff, blocks a missing test, and blocks a forbidden literal', async () => {
    const clean = await runPrGate({
      diff: '',
      spec: 'No numbered criteria.',
      libraryDirectory: library,
    })
    expect(clean.verdict.blocking).toBe(false)
    expect(
      clean.verdict.notChecked.some((name) => name.endsWith('prose-rule.md')),
    ).toBe(true)

    const missingTest = await runPrGate({
      diff: addedFile('src/screen.ts', ['export const title = "Checkout"']),
      spec: 'AC-8 shows the title.',
      libraryDirectory: library,
    })
    expect(missingTest.verdict.blocking).toBe(true)
    expect(
      missingTest.verdict.findings.some(
        (finding) => finding.includes('AC-8') && finding.includes('spec.md'),
      ),
    ).toBe(true)

    const forbidden = await runPrGate({
      diff: [
        'diff --git a/src/pay.ts b/src/pay.ts',
        'index 1111111..2222222 100644',
        '--- a/src/pay.ts',
        '+++ b/src/pay.ts',
        '@@ -1 +1,2 @@',
        ' const keep = true',
        '+const bad = "FORBIDDEN_TOKEN"',
        '',
      ].join('\n'),
      spec: 'No numbered criteria.',
      libraryDirectory: library,
    })
    expect(forbidden.verdict.blocking).toBe(true)
    expect(forbidden.verdict.findings).toContain('src/pay.ts:2')
  })

  it('returns the same verdict for the same diff, spec, and library', async () => {
    const input = {
      diff: addedFile('src/screen.ts', ['export const title = "Checkout"']),
      spec: 'AC-3 shows the title.',
      libraryDirectory: library,
    }

    const first = await runPrGate(input)
    const second = await runPrGate(input)

    expect(second.verdict).toEqual(first.verdict)
    expect(second.json).toBe(first.json)
    expect(second.markdown).toBe(first.markdown)
  })
})

function addedFile(filePath: string, lines: string[]): string {
  const body = lines.map((line) => `+${line}`).join('\n')
  return [
    `diff --git a/${filePath} b/${filePath}`,
    'new file mode 100644',
    'index 0000000..abc1234',
    '--- /dev/null',
    `+++ b/${filePath}`,
    `@@ -0,0 +1,${lines.length} @@`,
    body,
    '',
  ].join('\n')
}
