import * as baseESLint from '@this/src/eslint/base'
import * as baseJest from '@this/src/jest/base'
import * as baseStylelint from '@this/src/stylelint/base'

export const eslint = { base: baseESLint }

// jest global object is reserved, don't wanna fight it
export const Jest = { base: baseJest }

export const stylelint = { base: baseStylelint }
