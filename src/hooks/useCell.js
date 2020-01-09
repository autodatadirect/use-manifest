import useManifest from './useManifest'

export default ({ columnIndex, rowIndex }) => {
  const { definition, rows, sorts, setSorts, loading } = useManifest()
  const def = definition[columnIndex]
  const row = rows[rowIndex]
  const value = row[def.id]

  return {
    sorts,
    def,
    row,
    value,
    setSorts,
    loading
  }
}
