import { describe, expect, it } from 'vitest'
import { checkAcCoverage } from '../src/ac-coverage.ts'

const twoIds = ['# Checkout', '', 'AC-1 shows the total.', 'AC-2 saves the card.'].join(
  '\n',
)

describe('AcCoverage', () => {
  it('covers every id when the diff adds one test file', () => {
    const result = checkAcCoverage(
      twoIds,
      addedFile('src/checkout.test.ts', [
        "import { expect, it } from 'vitest'",
        "it('covers the spec', () => { expect(true).toBe(true) })",
      ]),
    )

    expect(result.failed).toBe(false)
    expect(result.blocking).toBe(false)
    expect(result.criteria).toEqual([
      { id: 'AC-1', covered: true },
      { id: 'AC-2', covered: true },
    ])
  })

  it('lists every id and blocks when no test file is added or changed', () => {
    const result = checkAcCoverage(
      twoIds,
      addedFile('src/checkout.ts', ['export const total = 1']),
    )

    expect(result.blocking).toBe(true)
    expect(result.criteria).toEqual([
      { id: 'AC-1', covered: false },
      { id: 'AC-2', covered: false },
    ])
  })

  it('passes when the spec has no acceptance-criterion id', () => {
    const result = checkAcCoverage(
      'The screen shows a total.',
      addedFile('src/checkout.ts', ['export const total = 1']),
    )

    expect(result.failed).toBe(false)
    expect(result.blocking).toBe(false)
    expect(result.criteria).toEqual([])
  })

  it('does not treat a deletion, a rename, or a binary hunk as coverage', () => {
    const spec = 'AC-4 is covered only by a real test change.'
    for (const diff of [deletedTest(), renamedTest(), binaryTest()]) {
      const result = checkAcCoverage(spec, diff)
      expect(result.criteria).toEqual([{ id: 'AC-4', covered: false }])
      expect(result.blocking).toBe(true)
    }
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

function deletedTest(): string {
  return [
    'diff --git a/src/old.test.ts b/src/old.test.ts',
    'deleted file mode 100644',
    'index abc1234..0000000',
    '--- a/src/old.test.ts',
    '+++ /dev/null',
    '@@ -1 +0,0 @@',
    "-it('gone', () => {})",
    '',
  ].join('\n')
}

function renamedTest(): string {
  return [
    'diff --git a/src/old.test.ts b/src/renamed.test.ts',
    'similarity index 100%',
    'rename from src/old.test.ts',
    'rename to src/renamed.test.ts',
    '',
  ].join('\n')
}

function binaryTest(): string {
  return [
    'diff --git a/src/blob.test.ts b/src/blob.test.ts',
    'new file mode 100644',
    'index 0000000..abc1234',
    'Binary files /dev/null and b/src/blob.test.ts differ',
    '',
  ].join('\n')
}
