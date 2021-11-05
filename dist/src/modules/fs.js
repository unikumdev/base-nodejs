"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FS = void 0;
const promises_1 = require("fs/promises");
class FS {
}
exports.FS = FS;
_a = FS;
FS.readFileToString = ({ pathFile }) => (0, promises_1.readFile)(pathFile).then((x) => x.toString());
FS.readFileParseJSON = async (x) => JSON.parse(await FS.readFileToString(x));
