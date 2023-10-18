import React, { createContext, FC, useCallback, useEffect, useRef } from 'react'
import useManifest, { ManifestContext, Sort } from '../hooks/useManifest.js'
import useManifestState from '../hooks/useManifestState/index.js'
import DefaultTable from './DefaultTable/index.js'
import DefaultControls from './DefaultControls/index.js'
import Cell from './DefaultTable/DataCell'
import SimpleHeader from './DefaultHeader'

export interface Definition {
  id: string
  label?: React.ReactNode
  sortable?: boolean
  cellComponent?: typeof Cell
  headerComponent?: typeof SimpleHeader
}

export type DefArray = readonly Definition[]

export type CountFetcher<Filter> = (filter: Filter) => Promise<number>

export interface RowFetcherProps {
  page: number
  pageSize: number
  sorts: Sort[]
}

export type RowFetcher<Filter, Row> = (filter: Filter, props?: RowFetcherProps) => Promise<Row[]>

export const manifestContext: React.Context<ManifestContext<any, any>> = createContext(null as any)

let rowCallId = 0
let countCallId = 0

function useCountFetcher<Filter> ({ fetchCount }: { fetchCount?: CountFetcher<Filter> }): (filter: Filter, props: RowFetcherProps) => Promise<void> {
  const { setLoadingCount, setCount, setError } = useManifest<any, unknown>()
  if (fetchCount == null) {
    return async () => { }
  }
  return useCallback(async (filter: Filter) => {
    const id = ++countCallId
    setLoadingCount(true)
    try {
      const count = await fetchCount(filter)
      if (id !== countCallId) return
      setCount(count)
    } catch (error) {
      setError(error)
    }
    setLoadingCount(false)
  }, [setError, fetchCount, setLoadingCount, setCount])
}

function useRowFetcher<Filter, Row> ({ fetchRows }: { fetchRows: RowFetcher<Filter, Row> }): (filter: Filter, { page, pageSize, sorts }: RowFetcherProps) => Promise<void> {
  const { setLoadingRows, setRows, setError } = useManifest<Row, unknown>()
  return useCallback(
    async (filter: Filter, { page, pageSize, sorts }: RowFetcherProps) => {
      const id = ++rowCallId
      setLoadingRows(true)
      try {
        const rows: Row[] = await fetchRows(filter, { page, pageSize, sorts })

        if (id !== rowCallId) return
        setRows(rows)
      } catch (error) {
        setError(error)
      }
      setLoadingRows(false)
    }, [setError, fetchRows, setLoadingRows, setRows])
}

const useDetectChange = (value: any): (() => boolean) => {
  const ref = useRef()
  return () => {
    if (ref.current !== value) {
      ref.current = value
      return true
    }
    return false
  }
}

export const useIsFirstLoad = (): boolean => {
  const ref = useRef<boolean>()
  if (ref.current === undefined || !ref.current) {
    ref.current = true
    return true
  }
  return false
}

export interface EffectsProps<Filter, Row> {
  fetchRows: RowFetcher<Filter, Row>
  fetchCount?: CountFetcher<Filter>
  autoLoad?: boolean
}

function Effects<Filter, Row> ({ fetchRows, fetchCount, autoLoad = false }: EffectsProps<Filter, Row>): null {
  const { page, pageSize, sorts, filter, count } = useManifest<Row, Filter>()
  const isFirstLoad = useIsFirstLoad()

  const runFetchCount = useCountFetcher<Filter>({ fetchCount })
  const runFetchRows = useRowFetcher<Filter, Row>({ fetchRows })

  const pageChanged = useDetectChange(page)
  const pageSizeChanged = useDetectChange(pageSize)
  const sortsChanged = useDetectChange(sorts)
  const filterChanged = useDetectChange(filter)

  useEffect(() => {
    if (isFirstLoad && !autoLoad) {
      return
    }

    const filterChange = filterChanged()
    const changes = [pageChanged(), pageSizeChanged(), filterChange, sortsChanged()]

    if (changes.filter(c => c).length > 0) {
      runFetchRows(filter, { page, pageSize, sorts }).catch(console.error)
    }
    if (filterChange && count === null && (fetchCount != null)) {
      runFetchCount(filter, { page, pageSize, sorts }).catch(console.error)
    }
  })

  return null
}

export const DefaultChildren: FC = () =>
  <>
    <DefaultTable />
    <DefaultControls />
  </>

export interface ManifestProps<Filter, Row, Def extends DefArray> {
  children?: React.ReactNode | null
  fetchCount: CountFetcher<Filter>
  definition: Def
  autoLoad?: boolean
  // TODO: May want to union Row with [key: string]: unknown for non-display columns
  fetchRows: RowFetcher<Filter, Row>
}

export type IdNames<Def extends DefArray> = string extends Def[number]['id'] ? never : Def[number]['id']

/**
 * Builds an object type from the `id` values in a Definition array.
 * For example, say you have a definition like so:
 * @example
 * const definition = [
 *   { id: 'fullName', ... },
 *   { id: 'birthday', ... },
 * ] as const
 *
 * // RowType<typeof definition> will thus produce the type
 * {
 *   fullName: unknown,
 *   birthday: unknown
 * }
 *
 * // And using Manifest with a mismatched Row type will be a compilation error:
 * interface Row {
 *   fullName: string
 * }
 *
 * const rowFetcher = async (): Promise<Row[]> => []
 * <Manifest ... fetchRows={rowFetcher} definition={definition} />
 *
 * // Will cause the error: Property 'birthday' is missing in type 'Row' but required in...
 *
 * // If for some reason the provided definition can't be const,
 * // RowType<typeof definition> will just produce the type {}
 * // In this case, the Manifest will be unable to check its Row type against its definition.
 */
export type RowType<Def extends DefArray> = Pick<Record<string, unknown>, IdNames<Def>>

function Manifest<Filter, Row extends RowType<Def>, Def extends DefArray> (props: ManifestProps<Filter, Row, Def>): React.JSX.Element {
  const state = useManifestState()
  const { children, fetchRows, fetchCount, definition, autoLoad } = props

  const contextValue = {
    ...state,
    fetchCount,
    definition
  }

  return (
    <manifestContext.Provider value={contextValue}>
      <Effects fetchCount={fetchCount} fetchRows={fetchRows} autoLoad={autoLoad} />
      {children ?? <DefaultChildren />}
    </manifestContext.Provider>
  )
}

export default Manifest
