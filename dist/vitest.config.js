"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/* eslint-disable import/no-extraneous-dependencies */
const vite_tsconfig_paths_1 = tslib_1.__importDefault(require("vite-tsconfig-paths"));
const config_1 = require("vitest/config");
exports.default = (0, config_1.defineConfig)({
    plugins: [(0, vite_tsconfig_paths_1.default)()],
    test: {
        coverage: {
            provider: 'c8',
            reporter: ['text', 'json', 'html'],
        },
        environment: 'node',
        include: ['./src/**/__tests__/*.spec.ts'],
        root: __dirname,
    },
});
