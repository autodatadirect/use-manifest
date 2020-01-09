import { useContext, useCallback } from 'react'
import { manifestContext } from '../components/Manifest'
import * as actions from '../actions'

export default (index) => {
  const { state, dispatch } = useContext(manifestContext)
  const def = state.definition[index]
  const setSorts = useCallback((id, isAsc) => dispatch(actions.setSorts(id, isAsc)), [dispatch])

  return {
    ...def,
    sorts: state.sorts,
    setSorts
  }
}
