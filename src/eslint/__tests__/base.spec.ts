import { join } from 'path'

// eslint-disable-next-line import/no-extraneous-dependencies
import { ESLint } from 'eslint'
import { describe, expect, it } from 'vitest'

import * as theModule from '@this/src/eslint/base'

const paths = {
  dir: {
    fixtures: join(__dirname, 'fixtures'),
    root: join(__dirname, '../../..'),
  },
}

describe.concurrent('eslint base', () => {
  const pathFileTSConfigValid = join(paths.dir.root, 'tsconfig.json')
  const filterConfigResults = (
    x:
      | ReturnType<(typeof theModule)['getBase']>
      | ReturnType<(typeof theModule)['getBaseESLint']>,
  ) => {
    // eslint-disable-next-line no-param-reassign
    x.parserOptions.project = x.parserOptions.project.filter(
      (y) =>
        // this is local computer path and should not be included in test
        !y.endsWith('tsconfig.json'),
    )

    return x
  }

  describe.concurrent('getBase', () => {
    it.concurrent('returns config', ({ expect: ex }) => {
      ex(
        filterConfigResults(
          theModule.getBase({ pathFileTSConfig: pathFileTSConfigValid }),
        ),
      ).toBeDefined()
    })

    it.concurrent('option isReact', ({ expect: ex }) => {
      ex(
        filterConfigResults(
          theModule.getBase({
            isReact: true,
            pathFileTSConfig: pathFileTSConfigValid,
          }),
        ),
      ).toMatchSnapshot()
    })
  })

  describe.concurrent('getBaseESLint', () => {
    it.concurrent('returns config', ({ expect: ex }) => {
      ex(
        filterConfigResults(
          theModule.getBaseESLint({
            pathDirRoot: paths.dir.root,
            pathFileTSConfig: pathFileTSConfigValid,
          }),
        ),
      ).toMatchSnapshot()
    })
  })

  describe.concurrent('linter', () => {
    describe.concurrent('errors', () => {
      it('when errors are present', async () => {
        const eslint = new ESLint()
        const results = await eslint.lintFiles([
          join(paths.dir.fixtures, 'error/1.ts.fixture'),
        ])

        expect(results.length).toBeGreaterThan(0)

        results.forEach(({ errorCount }) => {
          expect(errorCount).toBeGreaterThan(0)
        })
      })
    })
  })
})
