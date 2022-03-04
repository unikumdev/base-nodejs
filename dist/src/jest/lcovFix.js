#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LCOVFix = void 0;
const tslib_1 = require("tslib");
/**
 * https://github.com/kulshekhar/ts-jest/issues/542
 */
const path = tslib_1.__importStar(require("path"));
const fs_extra_1 = require("fs-extra");
const yargs_1 = tslib_1.__importDefault(require("yargs/yargs"));
const helpers_1 = require("yargs/helpers");
class LCOVFix {
    static async fix({ pathFile, pathFileOutput, }) {
        const pathPrefix = process.cwd();
        const rawFile = await (0, fs_extra_1.readFile)(pathFile, 'utf8');
        const rebuiltPaths = rawFile
            .split('\n')
            .map((singleLine) => {
            if (singleLine.startsWith('SF:') && !singleLine.startsWith('SF:/')) {
                return singleLine.replace('SF:', `SF:${pathPrefix}/`);
            }
            return singleLine;
        })
            .join('\n');
        // eslint-disable-next-line no-console
        console.info(rebuiltPaths);
        await (0, fs_extra_1.ensureDir)(path.dirname(pathFileOutput));
        return (0, fs_extra_1.writeFile)(pathFileOutput, rebuiltPaths, 'utf8');
    }
    static async execute(options) {
        const { pathFile, pathFileOutput } = await LCOVFix.tasks.checks(options);
        return LCOVFix.fix({ pathFile, pathFileOutput });
    }
}
exports.LCOVFix = LCOVFix;
LCOVFix.defaults = {
    encoding: 'utf-8',
};
LCOVFix.tasks = {
    async checks({ pathFile, pathFileOutput } = {}) {
        if (!pathFile) {
            // eslint-disable-next-line no-console
            console.error('\x1b[31m%s\x1b[0m', 'argument --path-file[string] is missing');
            throw new Error('program exit(1)');
        }
        const pathFileResolved = path.resolve(pathFile);
        await (0, fs_extra_1.access)(pathFileResolved, fs_extra_1.constants.R_OK);
        return {
            pathFile: pathFileResolved,
            pathFileOutput: pathFileOutput
                ? path.resolve(pathFileOutput)
                : pathFileResolved,
        };
    },
};
/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
    const { argv } = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv));
    const { pathFile, pathFileOutput } = argv;
    LCOVFix.execute({ pathFile, pathFileOutput }).catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
        process.exit(1);
    });
}
