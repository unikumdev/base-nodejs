import * as baseESLint from "./eslint/base";
import * as baseJest from "./jest/base";
import * as baseStylelint from "./stylelint/base";
export declare const eslint: {
    base: typeof baseESLint;
};
export declare const Jest: {
    base: typeof baseJest;
};
export declare const stylelint: {
    base: typeof baseStylelint;
};
