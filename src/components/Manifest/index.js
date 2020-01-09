import React, { createContext, useCallback, useEffect, useReducer, useState } from 'react'
import PropTypes from 'prop-types'
import reducer, { initialState } from '../../utils/reducer'
import * as actions from '../../actions'
import DefaultManifestTable from '../DefaultManifestTable'

export const manifestContext = createContext()

const Manifest = ({ children, fetch, filter, definition }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [lastFilter, setLastFilter] = useState()
  const { page, pageSize, sorts } = state
  const value = { state, dispatch }
  value.state.definition = definition

  const load = useCallback(async filter => {
    dispatch(actions.setLoadingCount(true))
    dispatch(actions.setLoadingData(true))
    const { rows, count } = await fetch(filter, { page, pageSize, sorts })
    if (filter !== lastFilter) {
      dispatch(actions.setPage(1))
    }
    dispatch(actions.setRows(rows))
    dispatch(actions.setCount(count))
    setLastFilter(filter)
    dispatch(actions.setLoadingCount(false))
    dispatch(actions.setLoadingData(false))
  }, [fetch, page, pageSize, sorts, lastFilter])

  useEffect(() => {
    load(filter)
  }, [load, filter])

  return (
    <manifestContext.Provider value={value}>
      {children || <DefaultManifestTable />}
    </manifestContext.Provider>
  )
}

Manifest.propTypes = {
  fetch: PropTypes.func.isRequired,
  children: PropTypes.element,
  filter: PropTypes.object.isRequired,
  definition: PropTypes.array.isRequired
}

export default Manifest
