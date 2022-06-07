import type { Linter } from 'eslint';
export declare const getBase: ({ isReact, pathFileTSConfig, }: {
    readonly isReact?: boolean | undefined;
    readonly pathFileTSConfig: string;
}) => {
    env: {
        es2021: boolean;
        node: boolean;
    };
    extends: (string | false | undefined)[];
    parser: string;
    parserOptions: {
        extraFileExtensions: string[];
        project: string[];
    };
    plugins: string[];
    root: boolean;
    rules: Linter.RulesRecord;
    settings: {
        react: {
            version: string;
        };
    };
};
export declare const getBaseESLint: <T1 extends {
    readonly isReact?: boolean | undefined;
    readonly pathFileTSConfig: string;
} & {
    readonly pathDirRoot: string;
}>(options: T1) => {
    env: {
        es2021: boolean;
        node: boolean;
    };
    extends: (string | false | undefined)[];
    parser: string;
    parserOptions: {
        extraFileExtensions: string[];
        project: string[];
    };
    plugins: string[];
    root: boolean;
    rules: Linter.RulesRecord;
    settings: {
        react: {
            version: string;
        };
    };
} | {
    env: {
        jest: boolean;
        'jest/globals': boolean;
        es2021: boolean;
        node: boolean;
    };
    extends: (string | false | undefined)[];
    parser: string;
    parserOptions: {
        extraFileExtensions: string[];
        project: string[];
    };
    plugins: string[];
    root: boolean;
    rules: Linter.RulesRecord;
    settings: {
        react: {
            version: string;
        };
    };
};
