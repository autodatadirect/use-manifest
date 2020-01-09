import { useContext, useCallback } from 'react'
import { manifestContext } from '../components/Manifest'
import * as pagerLogic from '../utils/pagerLogic'
import * as actions from '../actions'

export default () => {
  const { state, dispatch } = useContext(manifestContext)
  const { page, pageSize, count } = state
  const totalPages = pagerLogic.determineTotalPages(pageSize, count)
  const setPage = useCallback(page => dispatch(actions.setPage(page)), [dispatch])
  const setPageSize = useCallback(pageSize => dispatch(actions.setPageSize(pageSize)), [dispatch])

  return {
    count,
    page,
    pageSize,
    totalPages,
    setPage,
    setPageSize
  }
}
