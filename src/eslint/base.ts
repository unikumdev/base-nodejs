import { join } from 'path'

export const getBase = ({
  pathFileTSConfig,
}: {
  readonly pathFileTSConfig: string
}) => ({
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'eslint-config-airbnb-base',
    'eslint-config-airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    extraFileExtensions: ['.mjs'],
    project: [pathFileTSConfig, '**/*.js', '**/*.ts'],
  },

  plugins: ['@typescript-eslint'],

  root: true,
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/unbound-method': 'off',
    'arrow-body-style': ['error', 'as-needed'],
    'block-spacing': 'error',
    'comma-dangle': [
      'error',
      {
        arrays: 'only-multiline',
        exports: 'only-multiline',
        functions: 'only-multiline',
        imports: 'only-multiline',
        objects: 'only-multiline',
      },
    ],
    'eol-last': 'error',
    'import/prefer-default-export': 'off',
    'no-multi-spaces': 'error',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 0,
      },
    ],
    'no-plusplus': 'off',
    'no-restricted-syntax': 'off',
    'no-unused-vars': 'error',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: [
          'block-like',
          'block',
          'class',
          'const',
          'directive',
          'for',
          'function',
          'iife',
          'let',
          'switch',
          'try',
          'var',
          'while',
        ],
        next: '*',
      },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
      { blankLine: 'always', prev: ['case', 'default'], next: '*' },
    ],
    'prefer-arrow-callback': 'error',
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
  },
})

/* istanbul ignore next */
export const getBaseESLint = <
  T1 extends Parameters<typeof getBase>[0] & {
    readonly pathDirRoot: string
  },
>(
  options: T1,
) => {
  /* istanbul ignore next */
  const baseConfig = getBase(options)

  // eslint-disable-next-line import/no-dynamic-require, global-require
  const packageJSON = require(join(options.pathDirRoot, 'package.json')) as {
    readonly devDependencies?: {
      readonly [x: string]: string
    }
  }

  if (packageJSON.devDependencies?.jest) {
    return {
      ...baseConfig,
      env: {
        ...baseConfig.env,
        jest: true,
        'jest/globals': true,
      },

      extends: [...baseConfig.extends, 'plugin:jest/recommended'],
    }
  }

  /* istanbul ignore next */
  return baseConfig
}
