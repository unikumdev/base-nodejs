import { readFile } from 'fs/promises';
class FS {
    static readFileToString = ({ pathFile }) => readFile(pathFile).then((x) => x.toString());
    static readFileParseJSON = async (x) => JSON.parse(await FS.readFileToString(x));
}
export { FS };
