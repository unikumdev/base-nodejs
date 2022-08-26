"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const config_1 = tslib_1.__importDefault(require("../src/config"));
const package_1 = require("../src/modules/package");
class SetupProject {
    static setup = () => package_1.Package.syncPeerDependencies({
        pathFilePackageJSON: config_1.default.paths.files['package.json'],
    });
}
// eslint-disable-next-line no-console
SetupProject.setup().catch(console.error);
