import useManifest, { Sort } from './useManifest'
import get from '../utils/get'
import { Definition } from '../components/Manifest'

export interface UseCellReturn<Row> extends Definition {
  def: Definition
  sorts: Sort[]
  row: Row
  value: any
  setSorts: (id: Definition['id'], direction: Sort['direction']) => void
  loading: boolean
}

export default function<Row>({ columnIndex, rowIndex }: { columnIndex: number, rowIndex: number }): UseCellReturn<Row> {
  const { definition, rows, sorts, setSorts, loadingCount, loadingRows } = useManifest<Row, unknown>()
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
    loading: loadingRows || loadingCount
  }
}
