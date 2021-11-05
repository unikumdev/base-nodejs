"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jest = exports.eslint = void 0;
const tslib_1 = require("tslib");
const baseESLint = (0, tslib_1.__importStar)(require("./eslint/base"));
const baseJest = (0, tslib_1.__importStar)(require("./jest/base"));
exports.eslint = { base: baseESLint };
exports.Jest = { base: baseJest };
