describe('swc configuration', () => {
  it.concurrent('jsc.paths config', () =>
    expect(
      import('@this/src/jest/__tests__/fixtures/class2'),
    ).resolves.toBeDefined(),
  )

  it.concurrent('jsc.paths config for jest coverage', async () => {
    const { Class2 } = await import('@this/src/jest/__tests__/fixtures/class2')

    expect(new Class2()).toBeDefined()
  })
})
