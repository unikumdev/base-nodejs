import { readFile } from 'fs/promises'

export class FS {
  static readFileToString = ({ pathFile }: { readonly pathFile: string }) =>
    readFile(pathFile).then((x) => x.toString())

  static readFileParseJSON = async (
    x: Parameters<(typeof FS)['readFileToString']>[0],
  ) => JSON.parse(await FS.readFileToString(x))
}
