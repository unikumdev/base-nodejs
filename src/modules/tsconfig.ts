import { parseConfigFileTextToJson } from 'typescript'
import { merge } from 'merge-anything'
import importFrom from 'import-from'
import { dirname, resolve } from 'path'
import type * as typeTypeScript from 'typescript'

import config from '@this/src/config'

export class TSConfig {
  static readTSConfig = (
    x: Parameters<typeof TSConfig['readTSConfigRecursive']>[0]
  ) =>
    parseConfigFileTextToJson(
      // eslint-disable-next-line
      '' /*'tsconfig.json'*/,
      JSON.stringify(TSConfig.readTSConfigRecursive(x), undefined, 2)
    ).config

  static readTSConfigRecursive({ pathFile }: { readonly pathFile: string }) {
    let accumulated: {
      extends?: string
      readonly compilerOptions?: typeTypeScript.CompilerOptions
    } = {
      ...(importFrom(config.paths.dirs.root, pathFile) as any),
    }

    const extendsOriginal = accumulated.extends

    if (accumulated.extends) {
      accumulated = merge(
        TSConfig.readTSConfigRecursive({
          pathFile: accumulated.extends.startsWith('./')
            ? resolve(dirname(pathFile), accumulated.extends)
            : accumulated.extends,
        }),

        accumulated
      ) as any
    }

    if (extendsOriginal) {
      accumulated.extends = extendsOriginal
    }

    return accumulated
  }
}
