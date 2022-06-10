/** @type {import("stylelint").Config } */

const { getBase } = require('./dist/src/stylelint/base')

const configBase = getBase()

module.exports = {
  ...configBase,
}
