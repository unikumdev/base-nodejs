import { join } from 'path'

import type { Linter } from 'eslint'

export const getBase = ({
  isReact,
  pathFileTSConfig,
}: {
  readonly isReact?: boolean
  readonly pathFileTSConfig: string
}) => {
  const rulesReact: Linter.RulesRecord = isReact
    ? {
        'react/button-has-type': 'error',
        'react/jsx-newline': ['error', { prevent: false }],
        'react/jsx-sort-default-props': 'error',
        'react/jsx-sort-props': 'error',
        'react/no-children-prop': 'off',
        'react/no-unused-prop-types': 'error',
        'react/no-unused-state': 'error',
        'react/prefer-stateless-function': [
          'error',
          { ignorePureComponents: true },
        ],
        'react/self-closing-comp': 'error',
        'react/sort-comp': 'error',
        'react/sort-prop-types': 'error',
      }
    : {}

  return {
    env: {
      es2021: true,
      node: true,
    },
    extends: [
      'eslint-config-airbnb-base',
      isReact && 'plugin:react/recommended',
      isReact
        ? 'eslint-config-airbnb-typescript'
        : 'eslint-config-airbnb-typescript/base',
      'plugin:sort/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
      'plugin:prettier/recommended',
    ].filter(Boolean),
    parser: '@typescript-eslint/parser',
    parserOptions: {
      extraFileExtensions: ['.mjs'],
      project: [pathFileTSConfig, '**/*.js', '**/*.ts'],
    },
    plugins: ['@typescript-eslint', 'prefer-arrow', 'prettier', 'sort'],
    root: true,
    rules: {
      ...rulesReact,
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
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
      'import/order': [
        'error',
        {
          alphabetize: {
            caseInsensitive: false,
            /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */
            order: 'asc',
          },
          groups: [
            'builtin',
            'external',
            'index',
            'internal',
            'object',
            'type',
            ['sibling', 'parent'],
          ],
          'newlines-between': 'always',
          pathGroups: [
            {
              group: 'internal',
              pattern: '@this/**/*',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['internal'],
        },
      ],
      'import/prefer-default-export': 'off',
      'max-len': [
        'error',
        {
          code: 80,
          comments: 120,
          ignoreRegExpLiterals: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreUrls: true,
          tabWidth: 2,
        },
      ],
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
      'no-underscore-dangle': 'off',
      'no-unused-vars': 'error',
      'object-curly-spacing': ['error', 'always'],
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          next: '*',
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
        },
        {
          blankLine: 'any',
          next: ['const', 'let', 'var'],
          prev: ['const', 'let', 'var'],
        },
        { blankLine: 'always', next: '*', prev: ['case', 'default'] },
      ],
      'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
      'prefer-arrow/prefer-arrow-functions': [
        'error',
        {
          classPropertiesAllowed: true,
          disallowPrototype: true,
          singleReturnOnly: true,
        },
      ],
      'prettier/prettier': 'error',
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'sort/imports': 'off',
      'sort/type-properties': 'error',
    } as typeof rulesReact,
    settings: {
      react: {
        version: 'detect',
      },
    },
  }
}

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
