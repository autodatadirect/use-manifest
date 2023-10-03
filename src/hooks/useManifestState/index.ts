import { useReducer, useRef } from 'react'
import reducer, { initialState, State } from './reducer'
import * as types from './actionTypes'

type Dispatch = (value: any) => void
type ActionCreator = (...value: any) => any

const bindDispatch = function (dispatch: Dispatch, actionCreator: ActionCreator) {
  return (...args: any) => dispatch(actionCreator(...args))
}

export default (): State => {
  const [state, dispatch]: [State, Dispatch] = useReducer(reducer, initialState, undefined as any)
  const dispatchersRef = useRef<Partial<State>>()

  if (dispatchersRef.current == null) {
    dispatchersRef.current = {
      setPage: bindDispatch(dispatch, page => ({ type: types.SET_PAGE, page })),
      setPageSize: bindDispatch(dispatch, pageSize => ({ type: types.SET_PAGE_SIZE, pageSize })),
      setSorts: bindDispatch(dispatch, (id, direction) => ({ type: types.SET_SORTS, id, direction })),
      setRows: bindDispatch(dispatch, rows => ({ type: types.SET_ROWS, rows })),
      setCount: bindDispatch(dispatch, count => ({ type: types.SET_COUNT, count })),
      setLoadingCount: bindDispatch(dispatch, loadingCount => ({ type: types.SET_LOADING_COUNT, loadingCount })),
      setLoadingRows: bindDispatch(dispatch, loadingRows => ({ type: types.SET_LOADING_ROWS, loadingRows })),
      setFilter: bindDispatch(dispatch, filter => ({ type: types.SET_FILTER, filter })),
      updateState: bindDispatch(dispatch, ({ filter, sorts, pageSize, page }) => ({ type: types.UPDATE_STATE, filter, sorts, pageSize, page })),
      resetState: bindDispatch(dispatch, () => ({ type: types.RESET })),
      setError: bindDispatch(dispatch, error => ({ type: types.SET_ERROR, error }))
    } as unknown as State
  }

  return {
    ...state,
    ...dispatchersRef.current
  } as State
}
