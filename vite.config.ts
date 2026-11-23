import { defineConfig } from 'vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    tanstackStart({
      router: {
        routeFileIgnorePattern: '\\.test\\.',
      },
    }),
    viteReact(),
  ],
})

export default config
