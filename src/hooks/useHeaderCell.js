import useManifest from './useManifest'

export default (index) => {
  const { definition, setSorts, sorts, loading } = useManifest()
  const def = definition[index]

  return {
    ...def,
    loading,
    sorts,
    setSorts
  }
}
