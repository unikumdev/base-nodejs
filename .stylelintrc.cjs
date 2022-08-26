/** @type {import("stylelint").Config } */

const { getBase } = require('./dist/cjs/src/stylelint/base')

const configBase = getBase()

module.exports = {
  ...configBase,
}
