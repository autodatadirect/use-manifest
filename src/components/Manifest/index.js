import React, { createContext, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import useManifest from '../../hooks/useManifest'
import useManifestState from '../../hooks/useManifestState'

export const manifestContext = createContext()

const useBuildFetcher = ({ fn, setLoading, setResult }) => {
  const { page, pageSize, sorts, setError } = useManifest() || {}

  return async filter => {
    setLoading(true)
    try {
      const rows = await fn(filter, { page, pageSize, sorts })
      setResult(rows)
    } catch (error) {
      setError(error)
    }
    setLoading(false)
  }
}

const cleanEmpty = x => x || x === 0 ? x : null

const hasChanged = (lastValue, thisValue) => JSON.stringify(cleanEmpty(lastValue)) !== JSON.stringify(cleanEmpty(thisValue))

const Effects = ({ fetchRows, fetchCount, filter }) => {
  const { setLoadingCount, setLoadingRows, setCount, setRows, setFilter } = useManifest()
  const previousFilterRef = useRef()

  const runFetchCount = useBuildFetcher({ fn: setCount, setLoading: setLoadingCount })
  const runFetchRows = useBuildFetcher({ fn: setRows, setLoading: setLoadingRows, setResult: setRows })
  const runRefresh = () => null
  const runReset = () => null

  useEffect(() => {
    if (hasChanged(previousFilterRef.current, filter)) setFilter(filter)
    previousFilterRef.current = filter
  }, [filter, setFilter])

  // reload count and rows on filter change, and sorts

  // reload count on page 0?

  // how to refresh via button

  return null
}

const Manifest = ({ children, fetchRows, fetchCount, filter, definition }) => {
  const state = useManifestState()

  return (
    <manifestContext.Provider value={state}>
      <Effects filter={filter} />
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
