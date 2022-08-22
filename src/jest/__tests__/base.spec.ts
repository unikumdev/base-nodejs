/* eslint-disable max-len */
import { join } from 'path'

import { file } from 'tmp-promise'
import { describe, expect, it } from 'vitest'

import * as theModule from '@this/src/jest/base'

describe.concurrent('jest base', () => {
  const defaults = {
    paths: {
      dirs: {
        root: join(__dirname, '../../..'),
      },
    },
  }
  const filterConfigResults = (x: ReturnType<typeof theModule['getBase']>) => {
    // contains local paths
    // eslint-disable-next-line no-param-reassign
    x.rootDir = undefined

    return x
  }

  describe.concurrent('getBase', () => {
    describe.concurrent('options', () => {
      it.concurrent('absent', () => {
        expect(filterConfigResults(theModule.getBase())).toMatchSnapshot()
      })

      describe.concurrent('pathFileTSConfig', () => {
        it.concurrent('provided (fake file)', async ({ expect: ex }) => {
          const { cleanup, path: pathFileTSConfig } = await file()

          ex(
            filterConfigResults(
              theModule.getBase({
                pathDirRoot: defaults.paths.dirs.root,
                pathFileTSConfig,
              }),
            ),
          ).toMatchSnapshot()
          return cleanup()
        })

        it.concurrent('real file', () => {
          const result = theModule.getBase({
            pathDirRoot: defaults.paths.dirs.root,
            pathFileTSConfig: join(defaults.paths.dirs.root, 'tsconfig.json'),
          })

          // paths for the real file will be translated with local path
          const keyFirstTransform = Object.keys(result.transform || {})[0]

          expect(
            ((result.transform || {})[keyFirstTransform][1] as any).jsc.paths,
          ).toBeDefined()
          ;((result.transform || {})[keyFirstTransform][1] as any).jsc.paths =
            undefined

          expect(filterConfigResults(result)).toMatchSnapshot()
        })
      })
    })
  })
})
