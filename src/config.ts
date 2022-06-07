import { join } from 'path'

/* istanbul ignore next */
import { Configuration } from './configuration'

export { Configuration }

export default new Configuration({
  pathRoot: join(__dirname, '..'),
})
