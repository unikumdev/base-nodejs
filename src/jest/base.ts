import { merge } from 'merge-anything'

import { TSConfig } from '@this/src/modules/tsconfig'

import type { Config } from '@jest/types'
import type * as typeSWC from '@swc/core'
import type * as typeTypeScript from 'typescript'

export type { Config }

const defaults = {
  configs: {
    '@swc/jest': {
      jsc: {
        externalHelpers: true,
        parser: {
          dynamicImport: true,
          syntax: 'typescript',
          tsx: false,
        },
        target: 'es2021',
        transform: {
          react: {
            runtime: 'automatic',
          },
        },
      },
      module: {
        type: 'es6',
      },
      sourceMaps: true,
    },
  },

  moduleNameMapper: {
    // @TODO remove this when SWC has fixed https://github.com/swc-project/swc/issues/2753
    // right now the jsc.paths does nothing
    '@this/(.*)': '<rootDir>',
    '\\.(css|less|scss|sss|styl|sass)$':
      '<rootDir>/node_modules/identity-obj-proxy',
    // ESM needs a `.js` file extension
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
}

const getSWCPaths = <
  T1 extends {
    readonly paths?: typeTypeScript.MapLike<string[]>
    readonly pathDirRoot: string
  },
>(
  options: T1,
) => {
  if (options.paths) {
    Object.keys(options.paths).forEach((k) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, no-param-reassign
      options.paths![k] = options.paths![k].reduce((acc, x) => {
        if (x.startsWith('./')) {
          acc.push(x.replace('./', `${options.pathDirRoot}/`))
        } else {
          acc.push(x)
        }

        return acc
      }, [] as string[])
    })
  }

  return options.paths
}

export const getBase = ({
  pathDirRoot,
  pathFileTSConfig,
}: {
  readonly pathDirRoot?: string
  readonly pathFileTSConfig?: string
} = {}): Config.InitialOptions => {
  const shouldReadTSConfig = Boolean(pathFileTSConfig && pathDirRoot)
  const contenFileTSConfig: {
    readonly compilerOptions?: typeTypeScript.CompilerOptions
  } = shouldReadTSConfig
    ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      TSConfig.readTSConfig({ pathFile: pathFileTSConfig! })
    : {}

  return {
    coveragePathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/dist/'],
    coverageReporters: ['html-spa', 'lcov'],
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    moduleFileExtensions: [
      'cjs',
      'js',
      'json',
      'jsx',
      'mjs',
      'node',
      'ts',
      'tsx',
      'wasm',
    ],
    moduleNameMapper: {
      ...defaults.moduleNameMapper,
    },
    rootDir: pathDirRoot,
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.spec.[t]s?(x)'],
    transform: {
      '^.+\\.(t|j)sx?$': [
        '@swc/jest',
        merge(defaults.configs['@swc/jest'], {
          jsc: {
            baseUrl: contenFileTSConfig.compilerOptions?.baseUrl || undefined,
            parser: {
              decorators:
                contenFileTSConfig.compilerOptions?.experimentalDecorators ||
                false,
              tsx:
                /* istanbul ignore next */
                (contenFileTSConfig.compilerOptions?.jsx && true) ||
                defaults.configs['@swc/jest'].jsc.parser.tsx,
            } as typeSWC.TsParserConfig,
            paths:
              pathDirRoot && contenFileTSConfig.compilerOptions?.paths
                ? getSWCPaths({
                    pathDirRoot,
                    paths: contenFileTSConfig.compilerOptions.paths,
                  })
                : undefined,
            target:
              contenFileTSConfig.compilerOptions?.target ||
              defaults.configs['@swc/jest'].jsc?.target,
            transform: {
              decoratorMetadata:
                contenFileTSConfig.compilerOptions?.emitDecoratorMetadata ||
                false,
              legacyDecorator:
                contenFileTSConfig.compilerOptions?.experimentalDecorators ||
                false,
            },
          },
          // needed for snapthots, user may not override this
          sourceMaps: true,
        } as Partial<typeSWC.Config> as any),
      ],
    },
  }
}
