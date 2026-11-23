import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { checkAdrCompliance } from '../src/adr-compliance.ts'

const library = path.join('plugins', 'pr-gate', 'tests', 'fixtures')

describe('AdrCompliance', () => {
  it('names the file and line of the forbidden literal and blocks', async () => {
    const diff = [
      'diff --git a/src/pay.ts b/src/pay.ts',
      'index 1111111..2222222 100644',
      '--- a/src/pay.ts',
      '+++ b/src/pay.ts',
      '@@ -1,2 +1,4 @@',
      ' const keep = true',
      '+const ok = 1',
      "+const bad = 'FORBIDDEN_TOKEN'",
      ' const end = true',
      '',
    ].join('\n')

    const result = await checkAdrCompliance(diff, library)
    const violation = result.checks.find((check) => check.outcome === 'violated')

    expect(violation?.file).toBe('src/pay.ts')
    expect(violation?.line).toBe(3)
    expect(result.blocking).toBe(true)
  })

  it('names the prose rule as not-checked and does not block', async () => {
    const result = await checkAdrCompliance(
      addedFile('src/screen.ts', ['export const title = "Checkout"']),
      library,
    )
    const prose = result.checks.find((check) =>
      check.rulePath.endsWith('prose-rule.md'),
    )

    expect(prose?.outcome).toBe('not-checked')
    expect(result.blocking).toBe(false)
  })

  it('does not block a secret log when no returned rule forbids it', async () => {
    const result = await checkAdrCompliance(
      addedFile('src/logger.ts', ["console.log('password=hunter2')"]),
      library,
    )

    expect(result.failed).toBe(false)
    expect(result.blocking).toBe(false)
    expect(result.checks.some((check) => check.outcome === 'violated')).toBe(
      false,
    )
  })

  it('calls the real loader with the fixture library and leaves it unchanged', async () => {
    const checkablePath = path.join(library, 'checkable-rule.md')
    const prosePath = path.join(library, 'prose-rule.md')
    const shippedPath = path.join('fixtures', 'library', 'testing.md')
    const before = {
      checkable: await readFile(checkablePath, 'utf8'),
      prose: await readFile(prosePath, 'utf8'),
      shipped: await readFile(shippedPath, 'utf8'),
    }

    const result = await checkAdrCompliance(
      addedFile('src/screen.ts', ['export const title = "Checkout"']),
      library,
    )

    expect(await readFile(checkablePath, 'utf8')).toBe(before.checkable)
    expect(await readFile(prosePath, 'utf8')).toBe(before.prose)
    expect(await readFile(shippedPath, 'utf8')).toBe(before.shipped)
    expect(result.failed).toBe(false)
    expect(result.checks.map((check) => check.rulePath).sort()).toEqual(
      [checkablePath, prosePath].sort(),
    )
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
