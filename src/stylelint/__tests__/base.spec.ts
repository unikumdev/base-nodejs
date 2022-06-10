import { join } from 'node:path'

import * as stylelint from 'stylelint'

import { getBase } from '../base'

describe('stylelint', () => {
  const pathRoot = join(__dirname, '../../..')
  const paths = {
    dirs: {
      fixtures: join(__dirname, 'fixtures'),
    },
    files: {
      stylelintRC: join(pathRoot, '.stylelintrc.js'),
    },
  }

  const stateLocal = {
    configLintBase: {
      configFile: paths.files.stylelintRC,
      fix: false,
    } as stylelint.LinterOptions,
  }

  describe('getBase', () => {
    it('config', () => {
      expect(getBase()).toMatchInlineSnapshot(`
        Object {
          "defaultSeverity": "error",
          "extends": Array [
            "stylelint-config-sass-guidelines",
            "stylelint-config-prettier-scss",
          ],
          "overrides": Array [],
          "plugins": Array [],
          "rules": Object {
            "declaration-empty-line-before": Array [
              "always",
              Object {
                "ignore": Array [
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

  describe('lint ok', () => {
    it.concurrent('no errors, file path', async () => {
      const { errored } = await stylelint.lint({
        ...stateLocal.configLintBase,
        files: [join(paths.dirs.fixtures, 'example-1/main.scss')],
      })

      expect(errored).toEqual(false)
    })

    it.concurrent('no errors, getBase', async () => {
      const { errored } = await stylelint.lint({
        ...stateLocal.configLintBase,
        config: getBase(),
        configFile: undefined,
        files: [join(paths.dirs.fixtures, 'example-1/main.scss')],
      })

      expect(errored).toEqual(false)
    })
  })

  describe('lint not ok', () => {
    it.concurrent('error', async () => {
      const { errored } = await stylelint.lint({
        ...stateLocal.configLintBase,
        config: getBase(),
        configFile: undefined,
        files: [join(paths.dirs.fixtures, 'example-1/plugin/flickity.scss')],
      })

      expect(errored).toEqual(true)
    })
  })
})
