import { Package } from '@this/src/modules/package'
import config from '@this/src/config'

class SetupProject {
  static setup() {
    return Package.syncPeerDependencies({
      pathFilePackageJSON: config.paths.files['package.json'],
    })
  }
}

// eslint-disable-next-line no-console
SetupProject.setup().catch(console.error)
