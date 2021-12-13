#!/usr/bin/env node
export interface IOptionsCLI {
    readonly pathFile?: string;
    readonly pathFileOutput?: string;
}
export declare class LCOVFix {
    static defaults: {
        encoding: string;
    };
    static tasks: {
        checks({ pathFile, pathFileOutput }?: IOptionsCLI): Promise<{
            pathFile: string;
            pathFileOutput: string;
        }>;
    };
    static fix({ pathFile, pathFileOutput, }: {
        readonly pathFile: string;
        readonly pathFileOutput: string;
    }): Promise<void>;
    static execute(options: IOptionsCLI): Promise<void>;
}
