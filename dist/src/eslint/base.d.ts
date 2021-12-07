export declare const getBase: ({ pathFileTSConfig, }: {
    readonly pathFileTSConfig: string;
}) => {
    env: {
        es2021: boolean;
        node: boolean;
    };
    extends: string[];
    parser: string;
    parserOptions: {
        extraFileExtensions: string[];
        project: string[];
    };
    plugins: string[];
    root: boolean;
    rules: {
        '@typescript-eslint/explicit-module-boundary-types': string;
        '@typescript-eslint/no-unsafe-assignment': string;
        '@typescript-eslint/no-explicit-any': string;
        '@typescript-eslint/no-unsafe-call': string;
        '@typescript-eslint/no-unsafe-member-access': string;
        '@typescript-eslint/no-unsafe-return': string;
        '@typescript-eslint/no-unused-vars': string;
        '@typescript-eslint/no-var-requires': string;
        '@typescript-eslint/unbound-method': string;
        'arrow-body-style': string[];
        'block-spacing': string;
        'comma-dangle': (string | {
            arrays: string;
            exports: string;
            functions: string;
            imports: string;
            objects: string;
        })[];
        'eol-last': string;
        'import/prefer-default-export': string;
        'no-multi-spaces': string;
        'no-multiple-empty-lines': (string | {
            max: number;
            maxEOF: number;
        })[];
        'no-plusplus': string;
        'no-restricted-syntax': string;
        'no-unused-vars': string;
        'prefer-arrow-callback': string;
        quotes: string[];
        semi: string[];
    };
};
export declare const getBaseJest: (options: Parameters<typeof getBase>[0]) => {
    env: {
        jest: boolean;
        'jest/globals': boolean;
        es2021: boolean;
        node: boolean;
    };
    extends: string[];
    parser: string;
    parserOptions: {
        extraFileExtensions: string[];
        project: string[];
    };
    plugins: string[];
    root: boolean;
    rules: {
        '@typescript-eslint/explicit-module-boundary-types': string;
        '@typescript-eslint/no-unsafe-assignment': string;
        '@typescript-eslint/no-explicit-any': string;
        '@typescript-eslint/no-unsafe-call': string;
        '@typescript-eslint/no-unsafe-member-access': string;
        '@typescript-eslint/no-unsafe-return': string;
        '@typescript-eslint/no-unused-vars': string;
        '@typescript-eslint/no-var-requires': string;
        '@typescript-eslint/unbound-method': string;
        'arrow-body-style': string[];
        'block-spacing': string;
        'comma-dangle': (string | {
            arrays: string;
            exports: string;
            functions: string;
            imports: string;
            objects: string;
        })[];
        'eol-last': string;
        'import/prefer-default-export': string;
        'no-multi-spaces': string;
        'no-multiple-empty-lines': (string | {
            max: number;
            maxEOF: number;
        })[];
        'no-plusplus': string;
        'no-restricted-syntax': string;
        'no-unused-vars': string;
        'prefer-arrow-callback': string;
        quotes: string[];
        semi: string[];
    };
};
