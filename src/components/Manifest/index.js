import React, { createContext, useEffect, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import useManifest from '../../hooks/useManifest'
import useManifestState from '../../hooks/useManifestState'

export const manifestContext = createContext()

const useBuildFetcher = ({ fn, setLoading, setResult }) => {
  const { page, pageSize, sorts, setError } = useManifest() || {}
  return useCallback(
    console.log('building fetcher') ||
    (async filter => {
      console.log('INVOKE!')
      setLoading(true)
      try {
        const rows = await fn(filter, { page, pageSize, sorts })
        console.log('fetch done', rows)
        setResult(rows)
      } catch (error) {
        setError(error)
        console.log('fetch failed', error)
      }
      setLoading(false)
    })
    , [page, pageSize, sorts, setError, fn, setLoading, setResult])
}

const cleanEmpty = x => x || x === 0 ? x : null

const hasChanged = (lastValue, thisValue) => JSON.stringify(cleanEmpty(lastValue)) !== JSON.stringify(cleanEmpty(thisValue))

const Effects = ({ fetchRows, fetchCount, filter }) => {
  const { setFilter, setLoadingCount, setLoadingRows, setRows, setCount, page, pageSize } = useManifest()

  const previousFilterRef = useRef()
  const previuosPageRef = useRef()
  const previousPageSizeRef = useRef()

  const runFetchCount = useBuildFetcher({ fn: fetchCount, setLoading: setLoadingCount, setResult: setCount })
  const runFetchRows = useBuildFetcher({ fn: fetchRows, setLoading: setLoadingRows, setResult: setRows })

  useEffect(() => {
    // TODO see if the equality check can be removed in favor of idendity only
    if (hasChanged(previousFilterRef.current, filter)) setFilter(filter)
    previousFilterRef.current = filter
  }, [filter, setFilter])

  if (page !== previuosPageRef.current) {
    console.log('page changed!', previuosPageRef.current, page)
    runFetchRows()
    previuosPageRef.current = page
  }

  // reload count and rows on filter change, and sorts

  // reload count on page 0?

  // how to refresh via button

  return null
}

// const useManifestFetchers = ({ state, fetchRows, fetchCount }) => {
//   const { setLoadingCount, setLoadingRows, setCount, setRows, resetState } = state

//   // const runRefresh = useCallback(() => Promise.all(runFetchCount, runFetchRows), [runFetchCount, runFetchRows])
//   // const runReset = () => resetState()

//   return {
//     runFetchCount,
//     runFetchRows,
//     runRefresh,
//     runReset
//   }
// }

const Manifest = ({ children, fetchRows, fetchCount, filter, definition }) => {
  const state = useManifestState()

  const contextValue = {
    ...state,
    // ...useManifestFetchers({ state, fetchRows, fetchCount }),
    definition
  }

  return (
    <manifestContext.Provider value={contextValue}>
      <Effects filter={filter} fetchCount={fetchCount} fetchRows={fetchRows} />
      {children}
    </manifestContext.Provider>
  )
}

Manifest.propTypes = {
  fetchRows: PropTypes.func.isRequired,
  fetchCount: PropTypes.func.isRequired,
  children: PropTypes.any,
  filter: PropTypes.any,
  definition: PropTypes.array.isRequired
}

export default Manifest
