import { useContext, useCallback } from 'react'
import { manifestContext } from '../components/Manifest'
import * as actions from '../actions'

export default ({ columnIndex, rowIndex }) => {
  const { state, dispatch } = useContext(manifestContext)
  const def = state.definition[columnIndex]
  const row = state.rows[rowIndex]
  const value = row[def.id]
  const setSorts = useCallback((id, isAsc) => dispatch(actions.setSorts(id, isAsc)), [dispatch])

  return {
    sorts: state.sorts,
    def,
    row,
    value,
    setSorts
  }
}
