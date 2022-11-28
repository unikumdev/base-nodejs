"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/* eslint-disable import/no-extraneous-dependencies */
const promises_1 = require("fs/promises");
const node_os_1 = require("node:os");
const path = tslib_1.__importStar(require("node:path"));
const get_tsconfig_1 = require("get-tsconfig");
const yargs_parser_1 = tslib_1.__importDefault(require("yargs-parser"));
class Script {
    static defaults = {
        encoding: 'utf-8',
        importMap: {},
        unwantedDirectories: ['__tests__', '__testUtils__', '__mocks__'],
    };
    static utilities = {
        getTSConfig() {
            const x = (0, get_tsconfig_1.getTsconfig)();
            if (!x) {
                throw new Error('no valid TSConfig found');
            }
            return x;
        },
        replaceFileContents: (contents, onLine) => contents.split(node_os_1.EOL).map(onLine).join(node_os_1.EOL),
        resolveEntry: (pathParent, pathPartial) => path.join(pathParent, pathPartial),
    };
    static parseCMDArguments() {
        const argsParsed = (0, yargs_parser_1.default)(process.argv);
        if (!argsParsed.dirProject) {
            throw new Error('--dir-project needs to be present');
        }
        if (!argsParsed.dirTarget) {
            throw new Error('--dir-target needs to be present');
        }
        argsParsed.dirProject = path.resolve(argsParsed.dirProject);
        argsParsed.dirTarget = path.resolve(argsParsed.dirTarget);
        return argsParsed;
    }
    static tasks = {
        async processSource({ dirTarget }) {
            const espree = await Promise.resolve().then(() => tslib_1.__importStar(require('espree')));
            const pathsMap = Object.entries(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            Script.utilities.getTSConfig().config.compilerOptions?.paths || {}).reduce((acc, [key, values]) => {
                const keyNew = (key.endsWith('/*') ? key.slice(0, -2) : key).replace('.', dirTarget);
                const valuesNew = values.map((x) => (x.endsWith('/*') ? x.slice(0, -2) : x).replace('.', dirTarget));
                acc[keyNew] = valuesNew;
                return acc;
            }, {});
            if (!Object.keys(pathsMap).length) {
                return;
            }
            const pathsMapArray = Object.entries(pathsMap);
            const targetExtensions = ['.js', '.jsx'];
            const traverseEntryForDirTarget = async (thePath) => {
                try {
                    const pathName = path.basename(thePath);
                    const entryStat = await (0, promises_1.stat)(thePath);
                    if (entryStat.isDirectory()) {
                        if (Script.defaults.unwantedDirectories.some((matcher) => pathName === matcher)) {
                            await (0, promises_1.rm)(thePath, { recursive: true });
                        }
                        else {
                            for (const entry of await (0, promises_1.readdir)(thePath)) {
                                // eslint-disable-next-line no-await-in-loop
                                await traverseEntryForDirTarget(Script.utilities.resolveEntry(thePath, entry));
                            }
                        }
                    }
                    else if (entryStat.isFile()) {
                        const pathExtName = path.extname(pathName);
                        if (!targetExtensions.some((x) => x === pathExtName)) {
                            return;
                        }
                        const pathParent = path.dirname(thePath);
                        const fileContents = await (0, promises_1.readFile)(thePath, {
                            encoding: Script.defaults.encoding,
                        });
                        const contentsNew = pathsMapArray.reduce((acc, [importSearch, [importRemap]]) => Script.utilities.replaceFileContents(acc, (line) => {
                            if (line.includes(importSearch) &&
                                (line.includes('require') || line.startsWith('import'))) {
                                const tokens = espree.tokenize(line, { ecmaVersion: 'latest' });
                                const stateLocal = {
                                    importValueNoQuotes: '',
                                    importValueOriginal: '',
                                    quoteChar: '',
                                };
                                for (const { value } of tokens.reverse()) {
                                    if (value.includes(importSearch)) {
                                        // eslint-disable-next-line prefer-destructuring
                                        stateLocal.quoteChar = value[0];
                                        stateLocal.importValueOriginal = value;
                                        stateLocal.importValueNoQuotes = value.slice(1, -1);
                                        break;
                                    }
                                }
                                let pathRelative = path.relative(pathParent, stateLocal.importValueNoQuotes.replace(importSearch, 
                                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                importRemap));
                                pathRelative = pathRelative.startsWith('.')
                                    ? pathRelative
                                    : `./${pathRelative}`;
                                return line.replace(stateLocal.importValueOriginal, stateLocal.quoteChar +
                                    pathRelative +
                                    stateLocal.quoteChar);
                            }
                            return line;
                        }), fileContents);
                        if (contentsNew && contentsNew !== fileContents) {
                            await (0, promises_1.writeFile)(thePath, contentsNew, {
                                encoding: Script.defaults.encoding,
                            });
                        }
                    }
                    // eslint-disable-next-line no-empty
                }
                catch { }
            };
            await traverseEntryForDirTarget(dirTarget);
        },
    };
    static async execute() {
        const { dirTarget } = Script.parseCMDArguments();
        console.log(dirTarget);
        await Promise.all([Script.tasks.processSource({ dirTarget })]);
    }
}
Script.execute().catch((err) => {
    throw err;
});
