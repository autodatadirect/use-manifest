import { useContext } from 'react'
import { DefArray, Definition, manifestContext, RowType } from '../components/Manifest'
import { ASCENDING, DESCENDING, NOT_SORTED } from '../constants/sortDirections'
import { State } from './useManifestState/reducer'

export interface Sort {
  id?: string
  direction: typeof ASCENDING | typeof DESCENDING | typeof NOT_SORTED
}

export interface ManifestContext<Filter, Row> {
  count: number | null
  setCount: (count: number) => void
  setLoadingCount: (loading: boolean) => void
  loadingCount: boolean

  rows: Row[]
  setRows: (rows: Row[]) => void
  setLoadingRows: (loading: boolean) => void
  loadingRows: boolean

  definition: readonly Definition[]

  updateState: (state: Partial<State>) => void
  resetState: () => void
  error: any
  setError: (error: any) => void

  pageSize: number
  setPageSize: (pageSize: number) => void

  setSorts: (id: Definition['id'], direction: Sort['direction']) => void
  sorts: Sort[]

  setPage: (page: number) => void
  page: number
  filter: Filter
  setFilter: (filter: Filter) => void
}

function useManifest<Def extends DefArray, Filter> (): ManifestContext<Filter, RowType<Def>> {
  return useManifestRaw<Filter, RowType<Def>>()
}

export function useManifestRaw<Filter, Def> (): ManifestContext<Filter, Def> {
  return useContext(manifestContext)
}

export default useManifest
