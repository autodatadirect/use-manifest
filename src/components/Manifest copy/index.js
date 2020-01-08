import React, { createContext, useReducer, useEffect, useCallback } from 'react'
import reducer, { initialState } from '../../utils/reducer'
import * as actions from '../../actions'
import Headers from '../Headers'
import Controls from '../Controls'
import Debug from '../Debug'
import Rows from '../Rows'

export const manifestContext = createContext()

const Manifest = ({ fetch, filter, definition }) => {
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
      <table>
        <Headers />
        <Rows />
        <tfoot />
      </table>
      <Controls />
      <Debug />
    </manifestContext.Provider>
  )
}

Manifest.propTypes = {

}

export default Manifest
