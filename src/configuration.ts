import { join } from 'path'

interface IConfigurationOptions {
  readonly pathRoot: string
}

export class Configuration {
  static createPathsConfig({ pathRoot }: { readonly pathRoot: string }) {
    return {
      dirs: {
        root: pathRoot,
      },

      files: {
        'package.json': join(pathRoot, 'package.json'),
      },
    }
  }

  paths: ReturnType<typeof Configuration.createPathsConfig>

  constructor({ pathRoot }: IConfigurationOptions) {
    this.paths = Configuration.createPathsConfig({ pathRoot })
  }
}
