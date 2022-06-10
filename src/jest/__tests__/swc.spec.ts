describe('swc configuration', () => {
  it.concurrent('jsc.paths config', () =>
    expect(
      import('@this/src/jest/__tests__/fixtures/class2'),
    ).resolves.toBeDefined(),
  )
})
