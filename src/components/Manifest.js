import React, { createContext, useRef, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import useManifest from '../hooks/useManifest'
import useManifestState from '../hooks/useManifestState'
import DefaultTable from './DefaultTable'
import DefaultControls from './DefaultControls'

export const manifestContext = createContext()

let rowCallId = 0
let countCallId = 0

const useCountFetcher = ({ fetchCount }) => {
  const { setLoadingCount, setCount, setError } = useManifest()
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

const useRowFetcher = ({ fetchRows }) => {
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

const useDetectChange = (name, value) => {
  const ref = useRef()
  if (ref.current !== value) {
    ref.current = value
    return true
  }
  return false
}

const useIsFirstLoad = () => {
  const ref = useRef()
  if (!ref.current) {
    ref.current = true
    return true
  }
  return false
}

const Effects = ({ fetchRows, fetchCount, autoLoad = false }) => {
  const { page, pageSize, sorts, filter, count } = useManifest()
  const isFirstLoad = useIsFirstLoad()

  const runFetchCount = useCountFetcher({ fetchCount })
  const runFetchRows = useRowFetcher({ fetchRows })

  const pageChanged = useDetectChange('page', page)
  const pageSizeChanged = useDetectChange('pageSize', pageSize)
  const sortsChanged = useDetectChange('sorts', sorts)
  const filterChanged = useDetectChange('filter', filter)

  useEffect(() => {
    if (isFirstLoad && !autoLoad) return

    if (pageChanged || pageSizeChanged || filterChanged) {
      runFetchRows(filter, { page, pageSize, sorts })
      if (!page || filterChanged || count === null) {
        runFetchCount(filter, { page, pageSize, sorts })
      }
    } else if (sortsChanged) {
      runFetchRows(filter, { page, pageSize, sorts })
    }
  })

  return null
}

const DefaultChildren = () =>
  <>
    <DefaultTable />
    <DefaultControls />
  </>

const Manifest = ({ children, fetchRows, fetchCount, definition, autoLoad }) => {
  const state = useManifestState()
  const totalPages = Math.ceil(state.count / state.pageSize)

  let showNext = state.count > (state.page + 1) * state.pageSize
  let showLast = (state.page) < totalPages - 2

  if (state.count === null) {
    showNext = state.rows.length === state.pageSize
    showLast = false
  }

  const contextValue = {
    ...state,
    definition,
    hasNextPage: showNext,
    showFirst: state.page > 1,
    showPrevious: state.page > 0,
    showNext: showNext,
    showLast: showNext && showLast
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
