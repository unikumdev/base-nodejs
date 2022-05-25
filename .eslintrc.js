const { join } = require('path')
const baseEslint = require('./dist/src/eslint/base')

module.exports = {
  ...baseEslint.getBase({
    isReact: true,
    pathFileTSConfig: join(__dirname, 'tsconfig.eslint.json'),
  }),
  ignorePatterns: ['build/**/*'],
}
