"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Package = void 0;
const promises_1 = require("fs/promises");
const fs_1 = require("./fs");
class Package {
    static async syncPeerDependencies({ pathFilePackageJSON, }) {
        const content = await fs_1.FS.readFileToString({
            pathFile: pathFilePackageJSON,
        });
        const contentParsed = JSON.parse(content);
        const allDependencies = {
            ...contentParsed.devDependencies,
            ...contentParsed.dependencies,
        };
        contentParsed.peerDependencies = contentParsed.peerDependencies || {};
        console.info('Syncing peerDependency along with dependency and devDependency...');
        for (const k in allDependencies) {
            const valuePeerDependency = contentParsed.peerDependencies[k];
            if (valuePeerDependency) {
                const valueNormalOrDevDependency = allDependencies[k];
                if (valuePeerDependency !== valueNormalOrDevDependency) {
                    contentParsed.peerDependencies[k] = allDependencies[k];
                    console.info(`updated: ${valuePeerDependency} => ${valueNormalOrDevDependency}`);
                }
            }
        }
        const contentNew = JSON.stringify(contentParsed, undefined, 2);
        if (contentNew !== content) {
            await (0, promises_1.writeFile)(pathFilePackageJSON, contentNew);
        }
    }
}
exports.Package = Package;
