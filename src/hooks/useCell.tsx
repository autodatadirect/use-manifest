import useManifest from './useManifest'
import get from '../utils/get'

export default function<Row>({columnIndex, rowIndex}: { columnIndex: number, rowIndex: number }) {
  const {definition, rows, sorts, setSorts, loading} = useManifest<unknown, Row>()
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
