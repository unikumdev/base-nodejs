import { nodeModuleIsAvailable } from '../moduleExists'

describe(nodeModuleIsAvailable.name, () => {
  it('exists', () => {
    expect(nodeModuleIsAvailable('fs')).toEqual(true)
  })

  it('not exist', () => {
    expect(nodeModuleIsAvailable('fs33')).toEqual(false)
  })
})
