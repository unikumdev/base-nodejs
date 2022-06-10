interface IConfigurationOptions {
    readonly pathRoot: string;
}
export declare class Configuration {
    static createPathsConfig: ({ pathRoot }: {
        readonly pathRoot: string;
    }) => {
        dirs: {
            root: string;
        };
        files: {
            'package.json': string;
        };
    };
    paths: ReturnType<typeof Configuration.createPathsConfig>;
    constructor({ pathRoot }: IConfigurationOptions);
}
export {};
