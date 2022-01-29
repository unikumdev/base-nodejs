"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBase = void 0;
const merge_anything_1 = require("merge-anything");
const tsconfig_1 = require("../modules/tsconfig");
const defaults = {
    configs: {
        '@swc/jest': {
            sourceMaps: true,
            jsc: {
                externalHelpers: true,
                parser: {
                    dynamicImport: true,
                    syntax: 'typescript',
                    tsx: false,
                },
                target: 'es2021',
                transform: {
                    react: {
                        runtime: 'automatic',
                    },
                },
            },
            module: {
                type: 'es6',
            },
        },
    },
    moduleNameMapper: {
        '\\.(css|less|scss|sss|styl|sass)$': '<rootDir>/node_modules/identity-obj-proxy',
        // ESM needs a `.js` file extension
        '^(\\.{1,2}/.*)\\.js$': '$1',
        // @TODO remove this when SWC has fixed https://github.com/swc-project/swc/issues/2753
        // right now the jsc.paths does nothing
        '@this/(.*)': '<rootDir>',
    },
};
const getSWCPaths = (options) => {
    if (options.paths) {
        Object.keys(options.paths).forEach((k) => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, no-param-reassign
            options.paths[k] = options.paths[k].reduce((acc, x) => {
                if (x.startsWith('./')) {
                    acc.push(x.replace('./', `${options.pathDirRoot}/`));
                }
                else {
                    acc.push(x);
                }
                return acc;
            }, []);
        });
    }
    return options.paths;
};
const getBase = ({ pathDirRoot, pathFileTSConfig, } = {}) => {
    const shouldReadTSConfig = Boolean(pathFileTSConfig && pathDirRoot);
    const contenFileTSConfig = shouldReadTSConfig
        ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            tsconfig_1.TSConfig.readTSConfig({ pathFile: pathFileTSConfig })
        : {};
    return {
        coverageReporters: ['html-spa', 'lcov'],
        coveragePathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/dist/'],
        extensionsToTreatAsEsm: ['.ts', '.tsx'],
        moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
        moduleNameMapper: {
            ...defaults.moduleNameMapper,
        },
        rootDir: pathDirRoot,
        testEnvironment: 'node',
        testMatch: ['**/__tests__/**/*.spec.[t]s?(x)'],
        transform: {
            '^.+\\.(t|j)sx?$': [
                '@swc/jest',
                (0, merge_anything_1.merge)(defaults.configs['@swc/jest'], {
                    jsc: {
                        baseUrl: contenFileTSConfig.compilerOptions?.baseUrl || undefined,
                        paths: pathDirRoot && contenFileTSConfig.compilerOptions?.paths
                            ? getSWCPaths({
                                pathDirRoot,
                                paths: contenFileTSConfig.compilerOptions.paths,
                            })
                            : undefined,
                        parser: {
                            decorators: contenFileTSConfig.compilerOptions?.experimentalDecorators ||
                                false,
                            tsx: 
                            /* istanbul ignore next */
                            (contenFileTSConfig.compilerOptions?.jsx && true) ||
                                defaults.configs['@swc/jest'].jsc.parser.tsx,
                        },
                        transform: {
                            legacyDecorator: contenFileTSConfig.compilerOptions?.experimentalDecorators ||
                                false,
                            decoratorMetadata: contenFileTSConfig.compilerOptions?.emitDecoratorMetadata ||
                                false,
                        },
                        target: contenFileTSConfig.compilerOptions?.target ||
                            defaults.configs['@swc/jest'].jsc?.target,
                    },
                    // needed for snapthots, user may not override this
                    sourceMaps: true,
                }),
            ],
        },
    };
};
exports.getBase = getBase;
