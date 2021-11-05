"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = void 0;
const path_1 = require("path");
class Configuration {
    constructor({ pathRoot }) {
        this.paths = Configuration.createPathsConfig({ pathRoot });
    }
    static createPathsConfig({ pathRoot }) {
        return {
            dirs: {
                root: pathRoot,
            },
            files: {
                'package.json': (0, path_1.join)(pathRoot, 'package.json'),
            },
        };
    }
}
exports.Configuration = Configuration;
