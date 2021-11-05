import type * as typeTypeScript from 'typescript';
export declare class TSConfig {
    static readTSConfig: (x: Parameters<typeof TSConfig['readTSConfigRecursive']>[0]) => any;
    static readTSConfigRecursive({ pathFile }: {
        readonly pathFile: string;
    }): {
        extends?: string | undefined;
        readonly compilerOptions?: typeTypeScript.CompilerOptions | undefined;
    };
}
