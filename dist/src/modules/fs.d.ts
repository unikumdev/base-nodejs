export declare class FS {
    static readFileToString: ({ pathFile }: {
        readonly pathFile: string;
    }) => Promise<string>;
    static readFileParseJSON: (x: Parameters<(typeof FS)['readFileToString']>[0]) => Promise<any>;
}
