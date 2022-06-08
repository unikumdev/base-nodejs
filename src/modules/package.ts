import { writeFile } from 'fs/promises'

import { FS } from './fs'

type TObjectGeneric = Record<string, string | number>

export class Package {
  static async syncPeerDependencies({
    pathFilePackageJSON,
  }: {
    readonly pathFilePackageJSON: string
  }) {
    const content = await FS.readFileToString({
      pathFile: pathFilePackageJSON,
    })
    const contentParsed: {
      readonly dependencies?: TObjectGeneric
      readonly devDependencies?: TObjectGeneric
      peerDependencies?: TObjectGeneric
    } = JSON.parse(content)

    const allDependencies = {
      ...contentParsed.devDependencies,
      ...contentParsed.dependencies,
    }

    contentParsed.peerDependencies = contentParsed.peerDependencies || {}

    // eslint-disable-next-line no-console
    console.info(
      'Syncing peerDependency along with dependency and devDependency...',
    )
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const k in allDependencies) {
      const valuePeerDependency = contentParsed.peerDependencies[k]

      if (valuePeerDependency) {
        const valueNormalOrDevDependency = allDependencies[k]

        if (valuePeerDependency !== valueNormalOrDevDependency) {
          contentParsed.peerDependencies[k] = allDependencies[k]
          // eslint-disable-next-line no-console
          console.info(
            `updated: ${valuePeerDependency} => ${valueNormalOrDevDependency}`,
          )
        }
      }
    }

    const contentNew = JSON.stringify(contentParsed, undefined, 2)

    if (contentNew !== content) {
      await writeFile(pathFilePackageJSON, contentNew)
    }
  }
}
