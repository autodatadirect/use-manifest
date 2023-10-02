import useManifest from './useManifest'
import get from '../utils/get'

export default ({ columnIndex, rowIndex }: { columnIndex: number, rowIndex: number }) => {
  const { definition, rows, sorts, setSorts, loading } = useManifest()
  const def = definition[columnIndex]
  const row = rows[rowIndex]
  const value = get(row, def.id)

  return {
    ...def,
    sorts,
    def,
    row,
    value,
    setSorts,
    loading
  }
}
