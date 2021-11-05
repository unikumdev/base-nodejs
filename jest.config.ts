import type { Config } from './src/jest/base'

export default async () =>
{
  const { join } =  await import('path')
  const { getBase } = await import('./src/jest/base')

  return {
    ...getBase({
      pathDirRoot: __dirname,
      pathFileTSConfig: join(__dirname, 'tsconfig.json'),
    }),
    coverageThreshold: {
      global: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
    resolver: '<rootDir>/jest.resolver.cjs',
  } as Config.InitialOptions
}
