import config from "../src/config";
import { Package } from "../src/modules/package";
class SetupProject {
    static setup = () => Package.syncPeerDependencies({
        pathFilePackageJSON: config.paths.files['package.json'],
    });
}
// eslint-disable-next-line no-console
SetupProject.setup().catch(console.error);
