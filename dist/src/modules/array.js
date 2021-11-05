"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toArray = exports.returnArray = void 0;
const returnArray = (x) => Array.isArray(x) ? x : [];
exports.returnArray = returnArray;
const toArray = (x) => Array.isArray(x) ? x : [x];
exports.toArray = toArray;
