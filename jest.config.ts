import type { Config } from './src/jest/base'

export default async () => {
  const { join } = await import('path')
  const { getBase } = await import('./src/jest/base')

  return {
    ...getBase({
      pathDirRoot: __dirname,
      pathFileTSConfig: join(__dirname, 'tsconfig.json'),
    }),
    coverageThreshold: {
      global: {
        branches: 95,
        functions: 95,
        lines: 95,
        statements: 95,
      },
    },
    resolver: '<rootDir>/jest.resolver.cjs',
  } as Config.InitialOptions
}
