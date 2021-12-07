import { join } from 'path'

/* istanbul ignore next */
import { Configuration } from './configuration'

export default new Configuration({
  pathRoot: join(__dirname, '..'),
})

export { Configuration }
