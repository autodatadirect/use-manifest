import React, { createContext, FC, useCallback, useEffect, useRef } from 'react'
import useManifest, { ManifestContext, Sort } from '../hooks/useManifest.js'
import useManifestState from '../hooks/useManifestState/index.js'
import DefaultTable from './DefaultTable/index.js'
import DefaultControls from './DefaultControls/index.js'
import Cell from './DefaultTable/DataCell'
import SimpleHeader from './DefaultHeader'

export interface Definition {
  id: string
  // type?: keyof TypeMap
  label?: React.ReactNode
  sortable?: boolean
  cellComponent?: typeof Cell
  headerComponent?: typeof SimpleHeader
}

// export interface TypeMap {
//   string: string,
//   number: number,
//   boolean: boolean,
//   symbol: Symbol,
//   undefined: undefined,
//   object: object,
//   function: Function
// }

export type DefArray = readonly Definition[]

export type CountFetcher<Filter> = (filter: Filter) => Promise<number>

export interface RowFetcherProps {
  page: number
  pageSize: number
  sorts: Sort[]
}

/**
 * Builds an object type from the `id` values in a Definition array.
 * For example, say you have a definition like so:
 * const definition = [
 *   { id: 'fullName', ... },
 *   { id: 'birthday', ... },
 * ] as const
 *
 * RowType<typeof definition> will thus produce the type
 * {
 *   fullName: string | number | object | any[] | undefined,
 *   birthday: string | number | object | any[] | undefined
 * }
 */
export type RowType<Def extends DefArray> =
  Pick<Record<string, string | number | object | any[] | undefined>, Def[number]['id']>

// export type TypeField<Def extends DefArray> = Def[number]['type']

// export type DefType<Def extends DefArray> =
//   TypeField<Def> extends keyof TypeMap ? TypeMap[TypeField<Def>] : unknown

// export type RowType<Def extends DefArray> =
//   Pick<
//     Record<string, DefType<Def>>,
//     Def[number]['id']>

// export type RowType<Def extends DefArray> =
//   Pick<
//     Record<string, Def[number]['type'] extends keyof TypeMap ? TypeMap[Def[number]['type']] : unknown>,
//     Def[number]['id']>

export type RowFetcher<Filter, Def extends DefArray> = (filter: Filter, props?: RowFetcherProps) => Promise<Array<RowType<Def>>>

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

function useRowFetcher<Filter, Def extends DefArray> ({ fetchRows }: { fetchRows: RowFetcher<Filter, Def> }): (filter: Filter, { page, pageSize, sorts }: RowFetcherProps) => Promise<void> {
  const { setLoadingRows, setRows, setError } = useManifest<Def, unknown>()
  return useCallback(
    async (filter: Filter, { page, pageSize, sorts }: RowFetcherProps) => {
      const id = ++rowCallId
      setLoadingRows(true)
      try {
        const rows: Array<RowType<Def>> = await fetchRows(filter, { page, pageSize, sorts })

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

export interface EffectsProps<Filter, Def extends DefArray> {
  fetchRows: RowFetcher<Filter, Def>
  fetchCount?: CountFetcher<Filter>
  autoLoad?: boolean
}

function Effects<Filter, Def extends DefArray> ({ fetchRows, fetchCount, autoLoad = false }: EffectsProps<Filter, Def>): null {
  const { page, pageSize, sorts, filter, count } = useManifest<Def, Filter>()
  const isFirstLoad = useIsFirstLoad()

  const runFetchCount = useCountFetcher<Filter>({ fetchCount })
  const runFetchRows = useRowFetcher<Filter, Def>({ fetchRows })

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

export interface ManifestProps<Filter, Def extends DefArray> {
  children?: React.ReactNode | null
  // TODO: May want to union with [key: string]: unknown for non-display columns
  fetchRows: RowFetcher<Filter, Def>
  fetchCount: CountFetcher<Filter>
  definition: Def
  autoLoad?: boolean
}

function Manifest<Filter, Def extends DefArray> ({ children, fetchRows, fetchCount, definition, autoLoad }: ManifestProps<Filter, Def>): React.JSX.Element {
  const state = useManifestState()

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
