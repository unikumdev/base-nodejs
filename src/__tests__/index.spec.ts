import { describe, expect, it } from 'vitest'

import * as theModule from '@this/src/index'

describe('index', () => {
  it.concurrent('has no errors', () => {
    expect(theModule).toMatchInlineSnapshot(`
      {
        "Jest": {
          "base": {
            "getBase": [Function],
          },
        },
        "eslint": {
          "base": {
            "getBase": [Function],
            "getBaseESLint": [Function],
          },
        },
        "stylelint": {
          "base": {
            "getBase": [Function],
          },
        },
      }
    `)
  })
})
