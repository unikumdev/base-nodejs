/* eslint-disable import/no-extraneous-dependencies */
import { readdir, readFile, rm, stat, writeFile } from 'fs/promises'
import { EOL } from 'node:os'
import * as path from 'node:path'

import { getTsconfig } from 'get-tsconfig'
import argsParser from 'yargs-parser'

class Script {
  static defaults = {
    encoding: 'utf-8' as BufferEncoding,
    importMap: {},
    unwantedDirectories: ['__tests__', '__testUtils__', '__mocks__'],
  }

  static utilities = {
    getTSConfig() {
      const x = getTsconfig()

      if (!x) {
        throw new Error('no valid TSConfig found')
      }

      return x
    },

    replaceFileContents: (contents: string, onLine: (line: string) => string) =>
      contents.split(EOL).map(onLine).join(EOL),

    resolveEntry: (pathParent: string, pathPartial: string) =>
      path.join(pathParent, pathPartial),
  }

  static parseCMDArguments(): {
    readonly dirProject: string
    readonly dirTarget: string
  } {
    const argsParsed: {
      dirProject?: string
      dirTarget?: string
    } = argsParser(process.argv) as any

    if (!argsParsed.dirProject) {
      throw new Error('--dir-project needs to be present')
    }

    if (!argsParsed.dirTarget) {
      throw new Error('--dir-target needs to be present')
    }

    argsParsed.dirProject = path.resolve(argsParsed.dirProject)
    argsParsed.dirTarget = path.resolve(argsParsed.dirTarget)

    return argsParsed as any
  }

  static tasks = {
    async processSource({ dirTarget }: { readonly dirTarget: string }) {
      const espree: any = await import('espree')

      const pathsMap = Object.entries(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        Script.utilities.getTSConfig().config.compilerOptions?.paths || {},
      ).reduce((acc, [key, values]) => {
        const keyNew = (key.endsWith('/*') ? key.slice(0, -2) : key).replace(
          '.',
          dirTarget,
        )
        const valuesNew = values.map((x) =>
          (x.endsWith('/*') ? x.slice(0, -2) : x).replace('.', dirTarget),
        )

        acc[keyNew] = valuesNew

        return acc
      }, {} as Record<string, Array<string>>)

      if (!Object.keys(pathsMap).length) {
        return
      }

      const pathsMapArray = Object.entries(pathsMap)
      const targetExtensions = ['.js', '.jsx']

      const traverseEntryForDirTarget = async (thePath: string) => {
        try {
          const pathName = path.basename(thePath)
          const entryStat = await stat(thePath)

          if (entryStat.isDirectory()) {
            if (
              Script.defaults.unwantedDirectories.some(
                (matcher) => pathName === matcher,
              )
            ) {
              await rm(thePath, { recursive: true })
            } else {
              for (const entry of await readdir(thePath)) {
                // eslint-disable-next-line no-await-in-loop
                await traverseEntryForDirTarget(
                  Script.utilities.resolveEntry(thePath, entry),
                )
              }
            }
          } else if (entryStat.isFile()) {
            const pathExtName = path.extname(pathName)

            if (!targetExtensions.some((x) => x === pathExtName)) {
              return
            }

            const pathParent = path.dirname(thePath)
            const fileContents = await readFile(thePath, {
              encoding: Script.defaults.encoding,
            })
            const contentsNew = pathsMapArray.reduce(
              (acc, [importSearch, [importRemap]]) =>
                Script.utilities.replaceFileContents(acc, (line) => {
                  if (
                    line.includes(importSearch) &&
                    (line.includes('require') || line.startsWith('import'))
                  ) {
                    const tokens: Array<{
                      readonly value: string
                    }> = espree.tokenize(line, { ecmaVersion: 'latest' })

                    const stateLocal = {
                      importValueNoQuotes: '',
                      importValueOriginal: '',
                      quoteChar: '',
                    }

                    for (const { value } of tokens.reverse()) {
                      if (value.includes(importSearch)) {
                        // eslint-disable-next-line prefer-destructuring
                        stateLocal.quoteChar = value[0] as any
                        stateLocal.importValueOriginal = value
                        stateLocal.importValueNoQuotes = value.slice(1, -1)
                        break
                      }
                    }

                    let pathRelative = path.relative(
                      pathParent,
                      stateLocal.importValueNoQuotes.replace(
                        importSearch,
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        importRemap!,
                      ),
                    )

                    pathRelative = pathRelative.startsWith('.')
                      ? pathRelative
                      : `./${pathRelative}`

                    return line.replace(
                      stateLocal.importValueOriginal,
                      stateLocal.quoteChar +
                        pathRelative +
                        stateLocal.quoteChar,
                    )
                  }

                  return line
                }),
              fileContents,
            )

            if (contentsNew && contentsNew !== fileContents) {
              await writeFile(thePath, contentsNew, {
                encoding: Script.defaults.encoding,
              })
            }
          }
          // eslint-disable-next-line no-empty
        } catch {}
      }

      await traverseEntryForDirTarget(dirTarget)
    },
  }

  static async execute() {
    const { dirTarget } = Script.parseCMDArguments()

    await Promise.all([Script.tasks.processSource({ dirTarget })])
  }
}

Script.execute().catch((err) => {
  throw err
})
