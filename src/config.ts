import { join } from 'path'

import { Configuration } from './configuration'

export default new Configuration({
  pathRoot: join(__dirname, '..'),
})

export { Configuration }
