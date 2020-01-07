import React, { createContext, useReducer, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import reducer, { initialState } from '../../utils/reducer'
import * as actions from '../../actions'
import Table from '../Table'

export const manifestContext = createContext()

const Manifest = ({ children, fetch, filter, definition }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { meta } = state
  const value = { state, dispatch }
  value.state.definition = definition

  const load = useCallback(async filter => {
    const { rows, count } = await fetch(filter, meta)
    dispatch(actions.setRows(rows))
    dispatch(actions.setCount(count))
  }, [fetch, meta])

  useEffect(() => {
    load(filter)
  }, [load, filter])

  return (
    <manifestContext.Provider value={value}>
      {children || <Table />}
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
