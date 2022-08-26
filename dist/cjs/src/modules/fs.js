"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FS = void 0;
const promises_1 = require("fs/promises");
class FS {
    static readFileToString = ({ pathFile }) => (0, promises_1.readFile)(pathFile).then((x) => x.toString());
    static readFileParseJSON = async (x) => JSON.parse(await FS.readFileToString(x));
}
exports.FS = FS;
