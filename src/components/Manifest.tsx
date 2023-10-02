import React, { createContext, useRef, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import useManifest, {ManifestContext, Sort} from '../hooks/useManifest.js'
import useManifestState from '../hooks/useManifestState/index.js'
import DefaultTable from './DefaultTable/index.js'
import DefaultControls from './DefaultControls/index.js'
import Cell from "./DefaultTable/DataCell";
import SimpleHeader from "./DefaultHeader";

export type Filter = {
    todo: unknown
}

export type Row = {
  todo: unknown
}

export type Definition = {
  id: string
  label: React.ReactNode
  sortable: boolean
  cellComponent: typeof Cell
  headerComponent: typeof SimpleHeader
}

export type CountFetcher = {
    (filter: Filter): Promise<number>
}

export type RowFetcherProps = {
    page: number
    pageSize: number
    sorts: Sort[]
}

export type RowFetcher = {
    (filter: Filter, props: RowFetcherProps): Promise<any[]>
}

// @ts-ignore
export const manifestContext: React.Context<ManifestContext> = createContext(null)

let rowCallId = 0
let countCallId = 0

const useCountFetcher = ({ fetchCount }: { fetchCount?: CountFetcher }): (filter: Filter, props: RowFetcherProps) => Promise<void> => {
  const { setLoadingCount, setCount, setError } = useManifest()
  if (!fetchCount) {
    return async () => {}
  }
  return useCallback(
    async filter => {
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
    }
    , [setError, fetchCount, setLoadingCount, setCount])
}

const useRowFetcher = ({ fetchRows }: { fetchRows: RowFetcher }): (filter: Filter, {page, pageSize, sorts}: RowFetcherProps) => Promise<void> => {
  const { setLoadingRows, setRows, setError } = useManifest()
  return useCallback(
    async (filter, { page, pageSize, sorts }) => {
      const id = ++rowCallId
      setLoadingRows(true)
      try {
        const rows = await fetchRows(filter, { page, pageSize, sorts })
        if (id !== rowCallId) return
        setRows(rows)
      } catch (error) {
        setError(error)
      }
      setLoadingRows(false)
    }, [setError, fetchRows, setLoadingRows, setRows])
}

const useDetectChange = (value: any): boolean => {
  const ref = useRef()
  if (ref.current !== value) {
    ref.current = value
    return true
  }
  return false
}

export const useIsFirstLoad = () => {
  const ref = useRef<boolean>()
  if (!ref.current) {
    ref.current = true
    return true
  }
  return false
}

export type EffectsProps = {
    fetchRows: RowFetcher
    fetchCount?: CountFetcher
    autoLoad?: boolean
}

const Effects = ({ fetchRows, fetchCount, autoLoad = false }: EffectsProps) => {
  const { page, pageSize, sorts, filter, count } = useManifest()
  const isFirstLoad = useIsFirstLoad()

  const runFetchCount = useCountFetcher({ fetchCount })
  const runFetchRows = useRowFetcher({ fetchRows })

  const pageChanged = useDetectChange(page)
  const pageSizeChanged = useDetectChange(pageSize)
  const sortsChanged = useDetectChange(sorts)
  const filterChanged = useDetectChange(filter)

  useEffect(() => {
    if (isFirstLoad && !autoLoad) return

    if (pageChanged || pageSizeChanged || filterChanged || sortsChanged) {
      runFetchRows(filter, { page, pageSize, sorts })
    }
    if (filterChanged && count === null && fetchCount) {
      runFetchCount(filter, { page, pageSize, sorts })
    }
  })

  return null
}

const DefaultChildren = () =>
  <>
    <DefaultTable />
    <DefaultControls />
  </>

export type ManifestProps = {
    children: React.ReactNode
    fetchRows: RowFetcher
    fetchCount: CountFetcher
    definition: object[]
    autoLoad?: boolean
}

const Manifest = ({ children, fetchRows, fetchCount, definition, autoLoad }: ManifestProps) => {
  const state = useManifestState()

  const contextValue = {
    ...state,
    fetchCount,
    definition
  }

  return (
    <manifestContext.Provider value={contextValue}>
      <Effects fetchCount={fetchCount} fetchRows={fetchRows} autoLoad={autoLoad} />
      {children || <DefaultChildren />}
    </manifestContext.Provider>
  )
}

Manifest.propTypes = {
  fetchRows: PropTypes.func.isRequired,
  fetchCount: PropTypes.func,
  children: PropTypes.any,
  filter: PropTypes.any,
  definition: PropTypes.array.isRequired
}

export default Manifest
