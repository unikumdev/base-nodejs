"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TSConfig = void 0;
const tslib_1 = require("tslib");
const path_1 = require("path");
const import_from_1 = tslib_1.__importDefault(require("import-from"));
const merge_anything_1 = require("merge-anything");
const typescript_1 = require("typescript");
const config_1 = tslib_1.__importDefault(require("../../../src/config"));
class TSConfig {
    static readTSConfig = (x) => (0, typescript_1.parseConfigFileTextToJson)(
    // eslint-disable-next-line
    '' /*'tsconfig.json'*/, JSON.stringify(TSConfig.readTSConfigRecursive(x), undefined, 2)).config;
    static readTSConfigRecursive({ pathFile }) {
        let accumulated = {
            ...(0, import_from_1.default)(config_1.default.paths.dirs.root, pathFile),
        };
        const extendsOriginal = accumulated.extends;
        if (accumulated.extends) {
            accumulated = (0, merge_anything_1.merge)(TSConfig.readTSConfigRecursive({
                pathFile: accumulated.extends.startsWith('./')
                    ? (0, path_1.resolve)((0, path_1.dirname)(pathFile), accumulated.extends)
                    : accumulated.extends,
            }), accumulated);
        }
        if (extendsOriginal) {
            accumulated.extends = extendsOriginal;
        }
        return accumulated;
    }
}
exports.TSConfig = TSConfig;
