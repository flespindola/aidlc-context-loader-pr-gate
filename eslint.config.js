import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'src/routeTree.gen.ts',
      'aidlc/**',
      '.cursor/**',
      'fixtures/.test-work/**',
    ],
  },
  tseslint.configs.recommended,
)
