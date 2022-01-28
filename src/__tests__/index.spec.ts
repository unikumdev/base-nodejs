import * as theModule from '@this/src/index'

describe('index', () => {
  it('has no errors', () => {
    expect(theModule).toMatchInlineSnapshot(`
      Object {
        "Jest": Object {
          "base": Object {
            "getBase": [Function],
          },
        },
        "eslint": Object {
          "base": Object {
            "getBase": [Function],
            "getBaseESLint": [Function],
          },
        },
      }
    `)
  })
})
