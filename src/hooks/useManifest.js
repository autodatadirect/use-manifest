import { useContext, useCallback } from 'react'
import { manifestContext } from '../components/Manifest'
import * as actions from '../actions'

export default () => {
  const { state, dispatch } = useContext(manifestContext)
  const setSorts = useCallback((id, isAsc) => dispatch(actions.setSorts(id, isAsc)), [dispatch])
  const setPage = useCallback(page => dispatch(actions.setPage(page)), [dispatch])
  const setPageSize = useCallback(pageSize => dispatch(actions.setPageSize(pageSize)), [dispatch])

  return {
    loading: state.loadingData && state.loadingCount,
    loadingData: state.loadingData,
    loadingCount: state.loadingCount,
    page: state.page,
    pageSize: state.pageSize,
    sorts: state.sorts,
    count: state.count,
    definition: state.definition,
    rows: state.rows,
    setSorts,
    setPage,
    setPageSize
  }
}
