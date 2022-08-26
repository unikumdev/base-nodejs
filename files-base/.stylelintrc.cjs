/** @type {import("stylelint").Config } */

const {
  stylelint: {
    base: { getBase },
  },
} = require('@unikum/base-nodejs')

const configBase = getBase()

module.exports = {
  ...configBase,
}
