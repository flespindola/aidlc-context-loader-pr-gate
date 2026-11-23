import { renderToStaticMarkup } from 'react-dom/server'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Route as RootRoute } from './__root'
import { Route } from './index'

const heading = 'The app is up'

describe('HomeApp', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('responds with the heading The app is up', () => {
    const html = renderPage()

    expect(html).toContain('<main>')
    expect(html).toContain(`<h1>${heading}</h1>`)
  })

  it('uses that sentence as the tab title', () => {
    expect(readTitle(RootRoute.options.head)).toBe(heading)
    expect(readTitle(Route.options.head)).toBe(heading)
  })

  it('shows no gameplay', () => {
    expect(renderPage()).not.toMatch(/gameplay/i)
  })

  it('shows no account, score, or saved progress', () => {
    const html = renderPage()

    expect(html).not.toMatch(/account/i)
    expect(html).not.toMatch(/score/i)
    expect(html).not.toMatch(/saved progress/i)
  })

  it('has no sign-in', () => {
    const html = renderPage()

    expect(html).not.toMatch(/sign[- ]?in/i)
    expect(html).not.toMatch(/log[- ]?in/i)
  })

  it('makes no remote request', () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    renderPage()

    expect(fetchMock).not.toHaveBeenCalled()
  })
})

function renderPage(): string {
  const Page = Route.options.component
  if (!Page) throw new Error('Home route has no component')
  return renderToStaticMarkup(<Page />)
}

function readTitle(head: unknown): string | undefined {
  const resolved = typeof head === 'function' ? head() : head
  if (!resolved || typeof resolved !== 'object' || !('meta' in resolved))
    return undefined
  const meta = resolved.meta
  if (!Array.isArray(meta)) return undefined
  const titled = meta.find(
    (item) => item && typeof item === 'object' && 'title' in item,
  )
  if (!titled || typeof titled !== 'object' || !('title' in titled))
    return undefined
  return typeof titled.title === 'string' ? titled.title : undefined
}
