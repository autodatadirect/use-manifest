import { useContext, useCallback } from 'react'
import { manifestContext } from '../components/Manifest'
import * as actions from '../actions'

export default () => {
  const { state, dispatch } = useContext(manifestContext)
  const setSort = useCallback((id, isAsc) => dispatch(actions.setSort(id, isAsc)), [dispatch])
  const setPage = useCallback(page => dispatch(actions.setPage(page)), [dispatch])
  const setPageSize = useCallback(pageSize => dispatch(actions.setPageSize(pageSize)), [dispatch])

  return {
    setSort,
    setPage,
    setPageSize,
    meta: state.meta,
    count: state.count,
    definition: state.definition,
    rows: state.rows
  }
}
