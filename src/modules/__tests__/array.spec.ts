import { returnArray, toArray } from '@this/src/modules/array'

describe('array utils', () => {
  describe(returnArray.name, () => {
    it.concurrent('return empty array if not an array', () => {
      ;['', 0, {}, null, undefined].forEach((x) => {
        expect(returnArray(x as any)).toEqual([])
      })
    })

    it.concurrent('return array as is if an array', () => {
      const theArray = [1, 2, 3]

      expect(returnArray(theArray)).toEqual(theArray)
    })
  })

  describe(toArray.name, () => {
    it.concurrent('converts payloads to array', () => {
      ;[undefined, null, {}, {}, 1, '1'].forEach((x) => {
        expect(toArray(x)).toEqual([x])
      })
    })

    it.concurrent('returns as is if an array', () => {
      const input: any[] = []

      expect(toArray(input) === input).toBeTruthy()
    })
  })
})
