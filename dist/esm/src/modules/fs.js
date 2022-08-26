import { readFile } from 'fs/promises';
export class FS {
    static readFileToString = ({ pathFile }) => readFile(pathFile).then((x) => x.toString());
    static readFileParseJSON = async (x) => JSON.parse(await FS.readFileToString(x));
}
