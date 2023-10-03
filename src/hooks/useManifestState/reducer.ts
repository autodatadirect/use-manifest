import * as actionTypes from './actionTypes'
import { ASCENDING } from '../../constants/sortDirections'
import * as pagerLogic from '../../utils/pagerLogic'
import { Reducer } from 'react'
import { Sort } from '../useManifest'

export interface State {
  loadingRows: boolean
  loadingCount: boolean
  page: number
  pageSize: number
  sorts: Sort[]
  count: number | null
  rows: any[]
  filter: any
  error: any
  rowsLength: number | null
}

export const initialState: State = {
  loadingRows: false,
  loadingCount: false,
  page: 0,
  pageSize: 10,
  sorts: [],
  count: null,
  rows: [],
  filter: null,
  error: null,
  rowsLength: null
}

export const initialSort = {
  id: '',
  direction: ASCENDING
}

const setLoadingCount = (state: State, action: any): State => ({
  ...state,
  loadingCount: action.loadingCount
})

const setLoadingRows = (state: State, action: any): State => ({
  ...state,
  loadingRows: action.loadingRows
})

const setPage = (state: State, action: any): State => ({
  ...state,
  page: action.page
})

const setPageSize = (state: State, action: any): State => ({
  ...state,
  pageSize: action.pageSize,
  page: 0
})

const setSorts = (state: State, action: any): State => ({
  ...state,
  sorts: [
    {
      ...initialSort,
      id: action.id,
      direction: action.direction
    }
  ],
  page: 0
})

const setRows = (state: State, action: any): State => {
  return correctRowCount({
    ...state,
    rows: action.rows,
    loadingRows: false,
    rowsLength: action.rows.length
  })
}

type CorrectRowCountState = Pick<State, 'rows' | 'page' | 'pageSize' | 'count'>

export const correctRowCount = function<T extends CorrectRowCountState>(state: T): T {
  if (!onLastPage(state)) return state

  let calculatedCount: number | null = (state.page * state.pageSize) + state.rows.length
  if ((state.rows.length > 0) && state.count != null && state.count === calculatedCount) return state

  if (state.pageSize === state.rows.length) {
    calculatedCount = null
  }

  return {
    ...state,
    count: calculatedCount,
    page: state.page
  }
}

const onLastPage = (state: CorrectRowCountState): boolean => {
  if (state.count === null) {
    return (state.rows?.length) < state.pageSize
  }
  return pagerLogic.determineTotalPages(state.pageSize, state.count) <= (state.page + 1)
}

const setCount = (state: State, action: any): State => ({
  ...state,
  count: action.count
})

const setFilter = (state: State, action: any): State => ({
  ...state,
  filter: action.filter,
  page: 0,
  count: null
})

const updateState = (state: State, action: any): State => {
  const updatedState = { ...state }

  if (action.filter == null) {
    if (action.filter !== updatedState.filter) {
      updatedState.count = null
      updatedState.filter = action.filter
      updatedState.page = 0
    }
  }
  if (action.sorts?.length > 0) {
    updatedState.sorts = action.sorts
    updatedState.page = 0
  }
  if (action.pageSize > 0) {
    updatedState.pageSize = action.pageSize
    updatedState.page = 0
  }
  if (action.page >= 0) {
    updatedState.page = action.page
  }

  return updatedState
}

const setError = (state: State, action: any): State => ({
  ...state,
  error: action.error
})

const reducer: Reducer<State, any> = (state: State, action: any): State => {
  switch (action.type) {
    case actionTypes.SET_PAGE: return setPage(state, action)
    case actionTypes.SET_PAGE_SIZE: return setPageSize(state, action)
    case actionTypes.SET_SORTS: return setSorts(state, action)
    case actionTypes.SET_ROWS: return setRows(state, action)
    case actionTypes.SET_COUNT: return setCount(state, action)
    case actionTypes.SET_LOADING_COUNT: return setLoadingCount(state, action)
    case actionTypes.SET_LOADING_ROWS: return setLoadingRows(state, action)
    case actionTypes.SET_FILTER: return setFilter(state, action)
    case actionTypes.SET_ERROR: return setError(state, action)
    case actionTypes.UPDATE_STATE: return updateState(state, action)
    default: return state
  }
}

export default reducer
