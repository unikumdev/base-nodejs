#!/usr/bin/env node

/**
 * https://github.com/kulshekhar/ts-jest/issues/542
 */
import * as path from 'path'

import {
  access,
  constants as constantsFS,
  ensureDir,
  readFile,
  writeFile,
} from 'fs-extra'
import { Argv } from 'yargs'
import { hideBin } from 'yargs/helpers'
import yargs from 'yargs/yargs'

export interface IOptionsCLI {
  readonly pathFile?: string
  readonly pathFileOutput?: string
}

export class LCOVFix {
  static defaults = {
    encoding: 'utf-8',
  }

  static tasks = {
    async checks({ pathFile, pathFileOutput }: IOptionsCLI = {}) {
      if (!pathFile) {
        // eslint-disable-next-line no-console
        console.error(
          '\x1b[31m%s\x1b[0m',
          'argument --path-file[string] is missing',
        )
        throw new Error('program exit(1)')
      }

      const pathFileResolved = path.resolve(pathFile)

      await access(pathFileResolved, constantsFS.R_OK)

      return {
        pathFile: pathFileResolved,
        pathFileOutput: pathFileOutput
          ? path.resolve(pathFileOutput)
          : pathFileResolved,
      }
    },
  }

  static async fix({
    pathFile,
    pathFileOutput,
  }: {
    readonly pathFile: string
    readonly pathFileOutput: string
  }) {
    const pathPrefix = process.cwd()
    const rawFile = await readFile(pathFile, 'utf8')
    const rebuiltPaths = rawFile
      .split('\n')
      .map((singleLine) => {
        if (singleLine.startsWith('SF:') && !singleLine.startsWith('SF:/')) {
          return singleLine.replace('SF:', `SF:${pathPrefix}/`)
        }

        return singleLine
      })
      .join('\n')

    // eslint-disable-next-line no-console
    console.info(rebuiltPaths)

    await ensureDir(path.dirname(pathFileOutput))

    return writeFile(pathFileOutput, rebuiltPaths, 'utf8')
  }

  static async execute(options: IOptionsCLI) {
    const { pathFile, pathFileOutput } = await LCOVFix.tasks.checks(options)

    return LCOVFix.fix({ pathFile, pathFileOutput })
  }
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
  const { argv } = yargs(hideBin(process.argv)) as Argv<
    Parameters<typeof LCOVFix['execute']>[0]
  >
  const { pathFile, pathFileOutput } = argv

  LCOVFix.execute({ pathFile, pathFileOutput }).catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err)
    process.exit(1)
  })
}
