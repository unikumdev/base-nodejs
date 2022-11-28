"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stylelint = exports.eslint = void 0;
const tslib_1 = require("tslib");
const baseESLint = tslib_1.__importStar(require("../../src/eslint/base"));
const baseStylelint = tslib_1.__importStar(require("../../src/stylelint/base"));
exports.eslint = { base: baseESLint };
exports.stylelint = { base: baseStylelint };
