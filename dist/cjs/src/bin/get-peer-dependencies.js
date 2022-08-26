#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = require("fs");
const fs = tslib_1.__importStar(require("node:fs/promises"));
const node_path_1 = require("node:path");
const execute = async () => {
    const argsUser = process.argv.slice(2);
    const pathDirProject = (0, node_path_1.resolve)(argsUser[0] || '');
    const pathFilePackageJSON = (0, node_path_1.join)(pathDirProject, 'package.json');
    if (!(await fs
        .access(pathFilePackageJSON, fs_1.constants.R_OK)
        .catch(() => false)
        .then(() => true))) {
        throw new Error(`${pathFilePackageJSON} cannot read`);
    }
    const filePackageJSONContents = JSON.parse(await fs.readFile(pathFilePackageJSON, 'utf-8'));
    if (filePackageJSONContents.peerDependencies) {
        // eslint-disable-next-line no-console
        console.log(Object.entries(filePackageJSONContents.peerDependencies)
            .map(([key, value]) => `${key}@${value}`, '')
            .join(' '));
    }
    else {
        // eslint-disable-next-line no-console
        console.warn(`${pathFilePackageJSON} has no peerDependencies field`);
    }
};
execute().catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
});
