import { useReducer, useCallback } from 'react'
import reducer, { initialState } from './reducer'
import * as types from './actionTypes'

export default () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const bindDispatch = useCallback(actionCreator => (...args) => dispatch(actionCreator(...args)), [dispatch])

  return {
    ...state,
    setPage: bindDispatch(page => ({ type: types.SET_PAGE, page })),
    setPageSize: bindDispatch(pageSize => ({ type: types.SET_PAGE_SIZE, pageSize })),
    setSorts: bindDispatch((id, isAsc) => ({ type: types.SET_SORTS, id, isAsc })),
    setRows: bindDispatch(rows => ({ type: types.SET_ROWS, rows })),
    setCount: bindDispatch(count => ({ type: types.SET_COUNT, count })),
    setLoadingCount: bindDispatch(loadingCount => ({ type: types.SET_LOADING_COUNT, loadingCount })),
    setLoadingData: bindDispatch(loadingData => ({ type: types.SET_LOADING_DATA, loadingData })),
    setFilter: bindDispatch(filter => ({ type: types.SET_FILTER, filter }))
  }
}
