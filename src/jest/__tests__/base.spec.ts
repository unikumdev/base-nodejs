/* eslint-disable max-len */
import { join } from 'path'

import { file } from 'tmp-promise'

import * as theModule from '@this/src/jest/base'

describe('jest base', () => {
  const defaults = {
    paths: {
      dirs: {
        root: join(__dirname, '../../..'),
      },
    },
  }
  const filterConfigResults = (x: ReturnType<typeof theModule['getBase']>) => {
    // contains local paths
    // eslint-disable-next-line no-param-reassign
    x.rootDir = undefined

    return x
  }

  describe('getBase', () => {
    describe('options', () => {
      it('absent', () => {
        expect(filterConfigResults(theModule.getBase())).toMatchInlineSnapshot(`
          Object {
            "coveragePathIgnorePatterns": Array [
              "<rootDir>/build/",
              "<rootDir>/dist/",
            ],
            "coverageReporters": Array [
              "html-spa",
              "lcov",
            ],
            "extensionsToTreatAsEsm": Array [
              ".ts",
              ".tsx",
            ],
            "moduleFileExtensions": Array [
              "cjs",
              "js",
              "json",
              "jsx",
              "mjs",
              "node",
              "ts",
              "tsx",
              "wasm",
            ],
            "moduleNameMapper": Object {
              "@this/(.*)": "<rootDir>",
              "\\\\.(css|less|scss|sss|styl|sass)$": "<rootDir>/node_modules/identity-obj-proxy",
              "^(\\\\.{1,2}/.*)\\\\.js$": "$1",
            },
            "rootDir": undefined,
            "testEnvironment": "node",
            "testMatch": Array [
              "**/__tests__/**/*.spec.[t]s?(x)",
            ],
            "transform": Object {
              "^.+\\\\.(t|j)sx?$": Array [
                "@swc/jest",
                Object {
                  "jsc": Object {
                    "baseUrl": undefined,
                    "externalHelpers": true,
                    "parser": Object {
                      "decorators": false,
                      "dynamicImport": true,
                      "syntax": "typescript",
                      "tsx": false,
                    },
                    "paths": undefined,
                    "target": "es2021",
                    "transform": Object {
                      "decoratorMetadata": false,
                      "legacyDecorator": false,
                      "react": Object {
                        "runtime": "automatic",
                      },
                    },
                  },
                  "module": Object {
                    "type": "es6",
                  },
                  "sourceMaps": true,
                },
              ],
            },
          }
        `)
      })

      describe('pathFileTSConfig', () => {
        it('provided (fake file)', async () => {
          const { cleanup, path: pathFileTSConfig } = await file()

          expect(
            filterConfigResults(
              theModule.getBase({
                pathDirRoot: defaults.paths.dirs.root,
                pathFileTSConfig,
              }),
            ),
          ).toMatchInlineSnapshot(`
            Object {
              "coveragePathIgnorePatterns": Array [
                "<rootDir>/build/",
                "<rootDir>/dist/",
              ],
              "coverageReporters": Array [
                "html-spa",
                "lcov",
              ],
              "extensionsToTreatAsEsm": Array [
                ".ts",
                ".tsx",
              ],
              "moduleFileExtensions": Array [
                "cjs",
                "js",
                "json",
                "jsx",
                "mjs",
                "node",
                "ts",
                "tsx",
                "wasm",
              ],
              "moduleNameMapper": Object {
                "@this/(.*)": "<rootDir>",
                "\\\\.(css|less|scss|sss|styl|sass)$": "<rootDir>/node_modules/identity-obj-proxy",
                "^(\\\\.{1,2}/.*)\\\\.js$": "$1",
              },
              "rootDir": undefined,
              "testEnvironment": "node",
              "testMatch": Array [
                "**/__tests__/**/*.spec.[t]s?(x)",
              ],
              "transform": Object {
                "^.+\\\\.(t|j)sx?$": Array [
                  "@swc/jest",
                  Object {
                    "jsc": Object {
                      "baseUrl": undefined,
                      "externalHelpers": true,
                      "parser": Object {
                        "decorators": false,
                        "dynamicImport": true,
                        "syntax": "typescript",
                        "tsx": false,
                      },
                      "paths": undefined,
                      "target": "es2021",
                      "transform": Object {
                        "decoratorMetadata": false,
                        "legacyDecorator": false,
                        "react": Object {
                          "runtime": "automatic",
                        },
                      },
                    },
                    "module": Object {
                      "type": "es6",
                    },
                    "sourceMaps": true,
                  },
                ],
              },
            }
          `)
          return cleanup()
        })

        it('real file', () => {
          const result = theModule.getBase({
            pathDirRoot: defaults.paths.dirs.root,
            pathFileTSConfig: join(defaults.paths.dirs.root, 'tsconfig.json'),
          })

          // paths for the real file will be translated with local path
          const keyFirstTransform = Object.keys(result.transform || {})[0]

          expect(
            ((result.transform || {})[keyFirstTransform][1] as any).jsc.paths,
          ).toBeDefined()
          ;((result.transform || {})[keyFirstTransform][1] as any).jsc.paths =
            undefined

          expect(filterConfigResults(result)).toMatchInlineSnapshot(`
            Object {
              "coveragePathIgnorePatterns": Array [
                "<rootDir>/build/",
                "<rootDir>/dist/",
              ],
              "coverageReporters": Array [
                "html-spa",
                "lcov",
              ],
              "extensionsToTreatAsEsm": Array [
                ".ts",
                ".tsx",
              ],
              "moduleFileExtensions": Array [
                "cjs",
                "js",
                "json",
                "jsx",
                "mjs",
                "node",
                "ts",
                "tsx",
                "wasm",
              ],
              "moduleNameMapper": Object {
                "@this/(.*)": "<rootDir>",
                "\\\\.(css|less|scss|sss|styl|sass)$": "<rootDir>/node_modules/identity-obj-proxy",
                "^(\\\\.{1,2}/.*)\\\\.js$": "$1",
              },
              "rootDir": undefined,
              "testEnvironment": "node",
              "testMatch": Array [
                "**/__tests__/**/*.spec.[t]s?(x)",
              ],
              "transform": Object {
                "^.+\\\\.(t|j)sx?$": Array [
                  "@swc/jest",
                  Object {
                    "jsc": Object {
                      "baseUrl": ".",
                      "externalHelpers": true,
                      "parser": Object {
                        "decorators": false,
                        "dynamicImport": true,
                        "syntax": "typescript",
                        "tsx": true,
                      },
                      "paths": undefined,
                      "target": "es2021",
                      "transform": Object {
                        "decoratorMetadata": false,
                        "legacyDecorator": false,
                        "react": Object {
                          "runtime": "automatic",
                        },
                      },
                    },
                    "module": Object {
                      "type": "es6",
                    },
                    "sourceMaps": true,
                  },
                ],
              },
            }
          `)
        })
      })
    })
  })
})
