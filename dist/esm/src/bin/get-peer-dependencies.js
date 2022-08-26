#!/usr/bin/env node
import { constants } from 'fs';
import * as fs from 'node:fs/promises';
import { join, resolve } from 'node:path';
const execute = async () => {
    const argsUser = process.argv.slice(2);
    const pathDirProject = resolve(argsUser[0] || '');
    const pathFilePackageJSON = join(pathDirProject, 'package.json');
    if (!(await fs
        .access(pathFilePackageJSON, constants.R_OK)
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
