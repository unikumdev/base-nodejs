"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jest = exports.eslint = void 0;
const tslib_1 = require("tslib");
const baseESLint = tslib_1.__importStar(require("./eslint/base"));
const baseJest = tslib_1.__importStar(require("./jest/base"));
exports.eslint = { base: baseESLint };
// jest global object is reserved, don't wanna fight it
exports.Jest = { base: baseJest };
