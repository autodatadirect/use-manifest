import React, { createContext, useCallback, useEffect, useReducer, useState } from 'react'
import PropTypes from 'prop-types'
import reducer, { initialState } from '../../utils/reducer'
import * as actions from '../../actions'
import DefaultManifestTable from '../DefaultManifestTable'
import useManifestState from '../../hooks/useManifestState'

export const manifestContext = createContext()

const useManifestLoadCount = ({ fetchCount }) => {
  const { setLoadingCount, setCount, page, pageSize, sorts } = useManifestState()

  return useCallback(async filter => {
    setLoadingCount(true)
    const count = await fetchCount(filter, { page, pageSize, sorts })
    setCount(count)
    setLoadingCount(false)
  }, [fetchCount])
}

const useManifestLoadRows = ({ fetchRows }) => {
  const { setLoadingData, setRows, page, pageSize, sorts } = useManifestState()

  return useCallback(async filter => {
    setLoadingData(true)
    const rows = await fetchRows(filter, { page, pageSize, sorts })
    setRows(rows)
    setLoadingData(false)
  }, [fetchRows])
}

const Effects = () => {

  // reload count and rows on filter change, and sorts

  // reload count on page 0?

  // how to refresh via button

}

const Manifest = ({ children, fetchRows, fetchCount, filter, definition }) => {
  // const [state, dispatch] = useReducer(reducer, initialState)
  // const [lastFilter, setLastFilter] = useState()
  // const { page, pageSize, sorts } = state
  // const value = { state, dispatch }
  // value.state.definition = definition

  useManifestLoadCount({ fetchCount })

  // useEffect(() => {
  //   loadRows(filter)
  // }, [load, filter])

  const contextValue = {
    ...useManifestState(),
    fetchRows,
    fetchCount,
    filter,
    definition
  }

  return (
    <manifestContext.Provider value={contextValue}>
      <Effects />
      {children}
    </manifestContext.Provider>
  )
}

Manifest.propTypes = {
  fetchRows: PropTypes.func.isRequired,
  fetchCount: PropTypes.func.isRequired,
  children: PropTypes.any,
  filter: PropTypes.object.isRequired,
  definition: PropTypes.array.isRequired
}

export default Manifest
