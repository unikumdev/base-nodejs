/* eslint-disable import/no-extraneous-dependencies */
import { join } from 'node:path'

import PluginTSConfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    PluginTSConfigPaths({
      projects: [join(__dirname, 'tsconfig.json')],
      root: __dirname,
    }),
  ],
  test: {
    coverage: {
      branches: 95,
      functions: 95,
      lines: 95,
      provider: 'c8',
      reporter: ['text', 'json', 'html'],
      statements: 95,
    },
    environment: 'node',
    include: ['./src/**/__tests__/*.spec.ts'],

    root: __dirname,
  },
})
