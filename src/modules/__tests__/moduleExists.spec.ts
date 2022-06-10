import { nodeModuleIsAvailable } from '../moduleExists'

describe(nodeModuleIsAvailable.name, () => {
  it.concurrent('exists', () => {
    expect(nodeModuleIsAvailable('fs')).toEqual(true)
  })

  it.concurrent('not exist', () => {
    expect(nodeModuleIsAvailable('fs33')).toEqual(false)
  })
})
