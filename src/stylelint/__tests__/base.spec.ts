import { join } from 'node:path'

import * as stylelint from 'stylelint'
import { describe, expect, it } from 'vitest'

import { getBase } from '../base'

describe.concurrent('stylelint', () => {
  const pathRoot = join(__dirname, '../../..')
  const paths = {
    dirs: {
      fixtures: join(__dirname, 'fixtures'),
    },
    files: {
      stylelintRC: join(pathRoot, '.stylelintrc.cjs'),
    },
  }

  const stateLocal = {
    configLintBase: {
      configFile: paths.files.stylelintRC,
      fix: false,
    } as stylelint.LinterOptions,
  }

  describe.concurrent('getBase', () => {
    it.concurrent('config', () => {
      expect(getBase()).toMatchInlineSnapshot(`
        {
          "defaultSeverity": "error",
          "extends": [
            "stylelint-config-sass-guidelines",
            "stylelint-config-prettier-scss",
          ],
          "overrides": [],
          "plugins": [],
          "rules": {
            "declaration-empty-line-before": [
              "always",
              {
                "ignore": [
                  "after-comment",
                  "after-declaration",
                  "first-nested",
                  "inside-single-line-block",
                ],
              },
            ],
            "no-eol-whitespace": true,
            "no-missing-end-of-source-newline": true,
            "scss/at-extend-no-missing-placeholder": true,
          },
        }
      `)
    })
  })

  describe.concurrent('lint ok', () => {
    it.concurrent(
      'no errors, file path',
      async () => {
        const { errored } = await stylelint.lint({
          ...stateLocal.configLintBase,
          files: [join(paths.dirs.fixtures, 'example-1/main.scss')],
        })

        expect(errored).toEqual(false)
      },
      30000,
    )

    it.concurrent(
      'no errors, getBase',
      async () => {
        const { errored } = await stylelint.lint({
          ...stateLocal.configLintBase,
          config: getBase(),
          configFile: undefined as any,
          files: [join(paths.dirs.fixtures, 'example-1/main.scss')],
        })

        expect(errored).toEqual(false)
      },
      30000,
    )
  })

  describe.concurrent('lint not ok', () => {
    it.concurrent(
      'error',
      async () => {
        const { errored } = await stylelint.lint({
          ...stateLocal.configLintBase,
          config: getBase(),
          configFile: undefined as any,
          files: [join(paths.dirs.fixtures, 'example-1/plugin/flickity.scss')],
        })

        expect(errored).toEqual(true)
      },
      30000,
    )
  })
})
