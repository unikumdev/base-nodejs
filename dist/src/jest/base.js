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
                parser: {
                    dynamicImport: true,
                    syntax: 'typescript',
                    tsx: false,
                },
                target: 'es2021',
                externalHelpers: true,
            },
            module: {
                type: 'es6',
            },
        },
    },
    moduleNameMapper: {
        '\\.(css|less|scss|sss|styl|sass)$': '<rootDir>/node_modules/identity-obj-proxy',
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
};
const getSWCPaths = (options) => {
    if (options.paths) {
        Object.keys(options.paths).forEach((k) => {
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
        ?
            tsconfig_1.TSConfig.readTSConfig({ pathFile: pathFileTSConfig })
        : {};
    return {
        rootDir: pathDirRoot,
        moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
        coverageReporters: ['html', 'lcov'],
        extensionsToTreatAsEsm: ['.ts', '.tsx'],
        moduleNameMapper: {
            ...defaults.moduleNameMapper,
        },
        testEnvironment: 'node',
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
                            tsx: (contenFileTSConfig.compilerOptions?.jsx && true) ||
                                defaults.configs['@swc/jest'].jsc
                                    ?.parser.tsx,
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
                    sourceMaps: true,
                }),
            ],
        },
    };
};
exports.getBase = getBase;
