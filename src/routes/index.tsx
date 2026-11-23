import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [{ title: 'The app is up' }],
  }),
  component: Home,
})

function Home() {
  return (
    <main>
      <h1>The app is up</h1>
    </main>
  )
}
