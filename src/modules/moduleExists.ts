export const nodeModuleIsAvailable = (name: string) => {
  try {
    require.resolve(name)
    return true
  } catch {
    return false
  }
}
