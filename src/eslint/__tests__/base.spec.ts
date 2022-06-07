import { join } from 'path'

// eslint-disable-next-line import/no-extraneous-dependencies
import { ESLint } from 'eslint'

import * as theModule from '@this/src/eslint/base'

const paths = {
  dir: {
    fixtures: join(__dirname, 'fixtures'),
    root: join(__dirname, '../../..'),
  },
}

describe('eslint base', () => {
  const pathFileTSConfigValid = join(paths.dir.root, 'tsconfig.json')
  const filterConfigResults = (
    x:
      | ReturnType<typeof theModule['getBase']>
      | ReturnType<typeof theModule['getBaseESLint']>,
  ) => {
    // eslint-disable-next-line no-param-reassign
    x.parserOptions.project = x.parserOptions.project.filter(
      (y) =>
        // this is local computer path and should not be included in test
        !y.endsWith('tsconfig.json'),
    )

    return x
  }

  describe('getBase', () => {
    it('returns config', () => {
      expect(
        filterConfigResults(
          theModule.getBase({ pathFileTSConfig: pathFileTSConfigValid }),
        ),
      ).toMatchInlineSnapshot(`
        Object {
          "env": Object {
            "es2021": true,
            "node": true,
          },
          "extends": Array [
            "eslint-config-airbnb-base",
            "eslint-config-airbnb-typescript/base",
            "plugin:@typescript-eslint/recommended",
            "plugin:@typescript-eslint/recommended-requiring-type-checking",
            "prettier",
          ],
          "parser": "@typescript-eslint/parser",
          "parserOptions": Object {
            "extraFileExtensions": Array [
              ".mjs",
            ],
            "project": Array [
              "**/*.js",
              "**/*.ts",
            ],
          },
          "plugins": Array [
            "@typescript-eslint",
          ],
          "root": true,
          "rules": Object {
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-unsafe-call": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
            "@typescript-eslint/no-unsafe-return": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "@typescript-eslint/no-var-requires": "off",
            "@typescript-eslint/unbound-method": "off",
            "arrow-body-style": Array [
              "error",
              "as-needed",
            ],
            "block-spacing": "error",
            "comma-dangle": Array [
              "error",
              Object {
                "arrays": "only-multiline",
                "exports": "only-multiline",
                "functions": "only-multiline",
                "imports": "only-multiline",
                "objects": "only-multiline",
              },
            ],
            "eol-last": "error",
            "import/order": Array [
              "error",
              Object {
                "alphabetize": Object {
                  "caseInsensitive": false,
                  "order": "asc",
                },
                "groups": Array [
                  "builtin",
                  "external",
                  "index",
                  "internal",
                  "object",
                  "type",
                  Array [
                    "sibling",
                    "parent",
                  ],
                ],
                "newlines-between": "always",
                "pathGroups": Array [
                  Object {
                    "group": "internal",
                    "pattern": "@this/**/*",
                    "position": "after",
                  },
                ],
                "pathGroupsExcludedImportTypes": Array [
                  "internal",
                ],
              },
            ],
            "import/prefer-default-export": "off",
            "no-multi-spaces": "error",
            "no-multiple-empty-lines": Array [
              "error",
              Object {
                "max": 1,
                "maxEOF": 0,
              },
            ],
            "no-plusplus": "off",
            "no-restricted-syntax": "off",
            "no-underscore-dangle": "off",
            "no-unused-vars": "error",
            "object-curly-spacing": Array [
              "error",
              "always",
            ],
            "padding-line-between-statements": Array [
              "error",
              Object {
                "blankLine": "always",
                "next": "*",
                "prev": Array [
                  "block-like",
                  "block",
                  "class",
                  "const",
                  "directive",
                  "for",
                  "function",
                  "iife",
                  "let",
                  "switch",
                  "try",
                  "var",
                  "while",
                ],
              },
              Object {
                "blankLine": "any",
                "next": Array [
                  "const",
                  "let",
                  "var",
                ],
                "prev": Array [
                  "const",
                  "let",
                  "var",
                ],
              },
              Object {
                "blankLine": "always",
                "next": "*",
                "prev": Array [
                  "case",
                  "default",
                ],
              },
            ],
            "prefer-arrow-callback": "error",
            "quotes": Array [
              "error",
              "single",
            ],
            "semi": Array [
              "error",
              "never",
            ],
          },
          "settings": Object {
            "react": Object {
              "version": "detect",
            },
          },
        }
      `)
    })

    it('option isReact', () => {
      expect(
        filterConfigResults(
          theModule.getBase({
            isReact: true,
            pathFileTSConfig: pathFileTSConfigValid,
          }),
        ),
      ).toMatchInlineSnapshot(`
        Object {
          "env": Object {
            "es2021": true,
            "node": true,
          },
          "extends": Array [
            "eslint-config-airbnb-base",
            "plugin:react/recommended",
            "eslint-config-airbnb-typescript",
            "plugin:@typescript-eslint/recommended",
            "plugin:@typescript-eslint/recommended-requiring-type-checking",
            "prettier",
          ],
          "parser": "@typescript-eslint/parser",
          "parserOptions": Object {
            "extraFileExtensions": Array [
              ".mjs",
            ],
            "project": Array [
              "**/*.js",
              "**/*.ts",
            ],
          },
          "plugins": Array [
            "@typescript-eslint",
          ],
          "root": true,
          "rules": Object {
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-unsafe-call": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
            "@typescript-eslint/no-unsafe-return": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "@typescript-eslint/no-var-requires": "off",
            "@typescript-eslint/unbound-method": "off",
            "arrow-body-style": Array [
              "error",
              "as-needed",
            ],
            "block-spacing": "error",
            "comma-dangle": Array [
              "error",
              Object {
                "arrays": "only-multiline",
                "exports": "only-multiline",
                "functions": "only-multiline",
                "imports": "only-multiline",
                "objects": "only-multiline",
              },
            ],
            "eol-last": "error",
            "import/order": Array [
              "error",
              Object {
                "alphabetize": Object {
                  "caseInsensitive": false,
                  "order": "asc",
                },
                "groups": Array [
                  "builtin",
                  "external",
                  "index",
                  "internal",
                  "object",
                  "type",
                  Array [
                    "sibling",
                    "parent",
                  ],
                ],
                "newlines-between": "always",
                "pathGroups": Array [
                  Object {
                    "group": "internal",
                    "pattern": "@this/**/*",
                    "position": "after",
                  },
                ],
                "pathGroupsExcludedImportTypes": Array [
                  "internal",
                ],
              },
            ],
            "import/prefer-default-export": "off",
            "no-multi-spaces": "error",
            "no-multiple-empty-lines": Array [
              "error",
              Object {
                "max": 1,
                "maxEOF": 0,
              },
            ],
            "no-plusplus": "off",
            "no-restricted-syntax": "off",
            "no-underscore-dangle": "off",
            "no-unused-vars": "error",
            "object-curly-spacing": Array [
              "error",
              "always",
            ],
            "padding-line-between-statements": Array [
              "error",
              Object {
                "blankLine": "always",
                "next": "*",
                "prev": Array [
                  "block-like",
                  "block",
                  "class",
                  "const",
                  "directive",
                  "for",
                  "function",
                  "iife",
                  "let",
                  "switch",
                  "try",
                  "var",
                  "while",
                ],
              },
              Object {
                "blankLine": "any",
                "next": Array [
                  "const",
                  "let",
                  "var",
                ],
                "prev": Array [
                  "const",
                  "let",
                  "var",
                ],
              },
              Object {
                "blankLine": "always",
                "next": "*",
                "prev": Array [
                  "case",
                  "default",
                ],
              },
            ],
            "prefer-arrow-callback": "error",
            "quotes": Array [
              "error",
              "single",
            ],
            "react/button-has-type": "error",
            "react/jsx-newline": Array [
              "error",
              Object {
                "prevent": false,
              },
            ],
            "react/jsx-sort-default-props": "error",
            "react/jsx-sort-props": "error",
            "react/no-children-prop": "off",
            "react/no-unused-prop-types": "error",
            "react/no-unused-state": "error",
            "react/prefer-stateless-function": Array [
              "error",
              Object {
                "ignorePureComponents": true,
              },
            ],
            "react/self-closing-comp": "error",
            "react/sort-comp": "error",
            "react/sort-prop-types": "error",
            "semi": Array [
              "error",
              "never",
            ],
          },
          "settings": Object {
            "react": Object {
              "version": "detect",
            },
          },
        }
      `)
    })
  })

  describe('getBaseJest', () => {
    it('returns config', () => {
      expect(
        filterConfigResults(
          theModule.getBaseESLint({
            pathDirRoot: paths.dir.root,
            pathFileTSConfig: pathFileTSConfigValid,
          }),
        ),
      ).toMatchInlineSnapshot(`
        Object {
          "env": Object {
            "es2021": true,
            "jest": true,
            "jest/globals": true,
            "node": true,
          },
          "extends": Array [
            "eslint-config-airbnb-base",
            "eslint-config-airbnb-typescript/base",
            "plugin:@typescript-eslint/recommended",
            "plugin:@typescript-eslint/recommended-requiring-type-checking",
            "prettier",
            "plugin:jest/recommended",
          ],
          "parser": "@typescript-eslint/parser",
          "parserOptions": Object {
            "extraFileExtensions": Array [
              ".mjs",
            ],
            "project": Array [
              "**/*.js",
              "**/*.ts",
            ],
          },
          "plugins": Array [
            "@typescript-eslint",
          ],
          "root": true,
          "rules": Object {
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-unsafe-call": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
            "@typescript-eslint/no-unsafe-return": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "@typescript-eslint/no-var-requires": "off",
            "@typescript-eslint/unbound-method": "off",
            "arrow-body-style": Array [
              "error",
              "as-needed",
            ],
            "block-spacing": "error",
            "comma-dangle": Array [
              "error",
              Object {
                "arrays": "only-multiline",
                "exports": "only-multiline",
                "functions": "only-multiline",
                "imports": "only-multiline",
                "objects": "only-multiline",
              },
            ],
            "eol-last": "error",
            "import/order": Array [
              "error",
              Object {
                "alphabetize": Object {
                  "caseInsensitive": false,
                  "order": "asc",
                },
                "groups": Array [
                  "builtin",
                  "external",
                  "index",
                  "internal",
                  "object",
                  "type",
                  Array [
                    "sibling",
                    "parent",
                  ],
                ],
                "newlines-between": "always",
                "pathGroups": Array [
                  Object {
                    "group": "internal",
                    "pattern": "@this/**/*",
                    "position": "after",
                  },
                ],
                "pathGroupsExcludedImportTypes": Array [
                  "internal",
                ],
              },
            ],
            "import/prefer-default-export": "off",
            "no-multi-spaces": "error",
            "no-multiple-empty-lines": Array [
              "error",
              Object {
                "max": 1,
                "maxEOF": 0,
              },
            ],
            "no-plusplus": "off",
            "no-restricted-syntax": "off",
            "no-underscore-dangle": "off",
            "no-unused-vars": "error",
            "object-curly-spacing": Array [
              "error",
              "always",
            ],
            "padding-line-between-statements": Array [
              "error",
              Object {
                "blankLine": "always",
                "next": "*",
                "prev": Array [
                  "block-like",
                  "block",
                  "class",
                  "const",
                  "directive",
                  "for",
                  "function",
                  "iife",
                  "let",
                  "switch",
                  "try",
                  "var",
                  "while",
                ],
              },
              Object {
                "blankLine": "any",
                "next": Array [
                  "const",
                  "let",
                  "var",
                ],
                "prev": Array [
                  "const",
                  "let",
                  "var",
                ],
              },
              Object {
                "blankLine": "always",
                "next": "*",
                "prev": Array [
                  "case",
                  "default",
                ],
              },
            ],
            "prefer-arrow-callback": "error",
            "quotes": Array [
              "error",
              "single",
            ],
            "semi": Array [
              "error",
              "never",
            ],
          },
          "settings": Object {
            "react": Object {
              "version": "detect",
            },
          },
        }
      `)
    })
  })

  describe('linter', () => {
    describe('errors', () => {
      it('when errors are present', async () => {
        const eslint = new ESLint()
        const results = await eslint.lintFiles([
          join(paths.dir.fixtures, 'error/1.ts.fixture'),
        ])

        expect(results.length).toBeGreaterThan(0)

        results.forEach(({ errorCount }) => {
          expect(errorCount).toBeGreaterThan(0)
        })
      })
    })
  })
})
