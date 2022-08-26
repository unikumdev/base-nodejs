import type * as stylelint from 'stylelint'

export const getBase = (): stylelint.Config => ({
  defaultSeverity: 'error',
  extends: [
    'stylelint-config-sass-guidelines',
    'stylelint-config-prettier-scss',
  ],
  overrides: [],
  plugins: [],
  rules: {
    'declaration-empty-line-before': [
      'always',
      {
        ignore: [
          'after-comment',
          'after-declaration',
          'first-nested',
          'inside-single-line-block',
        ],
      },
    ],
    'no-eol-whitespace': true,
    'no-missing-end-of-source-newline': true,
    'scss/at-extend-no-missing-placeholder': true,
  },
})
