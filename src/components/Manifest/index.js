import React, { createContext, useCallback, useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import reducer, { initialState } from '../../utils/reducer'
import * as actions from '../../actions'
import DefaultManifestTable from '../DefaultManifestTable'

export const manifestContext = createContext()

const Manifest = ({ children, fetch, filter, definition }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { page, pageSize, sorts } = state
  const value = { state, dispatch }
  value.state.definition = definition

  const load = useCallback(async filter => {
    const { rows, count } = await fetch(filter, { page, pageSize, sorts })
    dispatch(actions.setRows(rows))
    dispatch(actions.setCount(count))
  }, [fetch, page, pageSize, sorts])

  useEffect(() => {
    load(filter)
  }, [load, dispatch, filter])

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
