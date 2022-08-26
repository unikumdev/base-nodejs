import { describe, expect, it } from 'vitest'

import * as theModule from '@this/src/index'

describe.concurrent('index', () => {
  it.concurrent('has no errors', () => {
    expect(theModule).toMatchInlineSnapshot(`
      {
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
