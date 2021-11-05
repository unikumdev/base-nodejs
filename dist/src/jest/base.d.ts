import type { Config } from '@jest/types';
export type { Config };
export declare const getBase: ({ pathDirRoot, pathFileTSConfig, }?: {
    readonly pathDirRoot?: string | undefined;
    readonly pathFileTSConfig?: string | undefined;
}) => Config.InitialOptions;
