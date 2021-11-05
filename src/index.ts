import * as baseESLint from './eslint/base'
import * as baseJest from './jest/base'

export const eslint = { base: baseESLint }

// jest global object is reserved, don't wanna fight it
export const Jest = { base: baseJest }
