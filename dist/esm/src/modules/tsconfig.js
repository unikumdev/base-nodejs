import { dirname, resolve } from 'path';
import importFrom from 'import-from';
import { merge } from 'merge-anything';
import { parseConfigFileTextToJson } from 'typescript';
import config from "../config";
export class TSConfig {
    static readTSConfig = (x) => parseConfigFileTextToJson(
    // eslint-disable-next-line
    '' /*'tsconfig.json'*/, JSON.stringify(TSConfig.readTSConfigRecursive(x), undefined, 2)).config;
    static readTSConfigRecursive({ pathFile }) {
        let accumulated = {
            ...importFrom(config.paths.dirs.root, pathFile),
        };
        const extendsOriginal = accumulated.extends;
        if (accumulated.extends) {
            accumulated = merge(TSConfig.readTSConfigRecursive({
                pathFile: accumulated.extends.startsWith('./')
                    ? resolve(dirname(pathFile), accumulated.extends)
                    : accumulated.extends,
            }), accumulated);
        }
        if (extendsOriginal) {
            accumulated.extends = extendsOriginal;
        }
        return accumulated;
    }
}
