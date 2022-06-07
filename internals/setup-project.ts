import config from '@this/src/config'
import { Package } from '@this/src/modules/package'

class SetupProject {
  static setup() {
    return Package.syncPeerDependencies({
      pathFilePackageJSON: config.paths.files['package.json'],
    })
  }
}

// eslint-disable-next-line no-console
SetupProject.setup().catch(console.error)
