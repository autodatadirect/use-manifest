import * as actionTypes from './actionTypes'
import { ASCENDING } from '../../constants/sortDirections'
import * as pagerLogic from '../../utils/pagerLogic'

export const initialState = {
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

const setLoadingCount = (state, action) => ({
  ...state,
  loadingCount: action.loadingCount
})

const setLoadingRows = (state, action) => ({
  ...state,
  loadingRows: action.loadingRows
})

const setPage = (state, action) => ({
  ...state,
  page: action.page
})

const setPageSize = (state, action) => ({
  ...state,
  pageSize: action.pageSize,
  page: 0
})

const setSorts = (state, action) => ({
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

const setRows = (state, action) => {
  return correctRowCount({
    ...state,
    rows: action.rows,
    loadingRows: false,
    rowsLength: action.rows.length
  })
}

export const correctRowCount = (state) => {
  if (!onLastPage(state)) return state

  let calculatedCount = state.page * state.pageSize + state.rows.length
  if (state.count && state.count === calculatedCount) return state

  if (state.pageSize === state.rows.length) {
    calculatedCount = null
  }

  return {
    ...state,
    count: calculatedCount,
    page: state.rows.length ? state.page : state.page - 1
  }
}

const onLastPage = state => {
  if (state.count === null) {
    return state.rows.length < state.pageSize
  }
  return pagerLogic.determineTotalPages(state.pageSize, state.count) === state.page + 1
}

const setCount = (state, action) => ({
  ...state,
  count: action.count
})

const setFilter = (state, action) => ({
  ...state,
  filter: action.filter,
  page: 0
})

const updateState = (state, action) => {
  const updatedState = { ...state }

  if (action.filter) {
    updatedState.filter = action.filter
    updatedState.page = 0
  }
  if (action.sorts && action.sorts.length) {
    updatedState.sorts = action.sorts
    updatedState.page = 0
  }
  if (action.pageSize) {
    updatedState.pageSize = action.pageSize
    updatedState.page = 0
  }
  if (action.page || action.page === 0) {
    updatedState.page = action.page
  }

  return updatedState
}

const setError = (state, action) => ({
  ...state,
  error: action.error
})

export default (state, action) => {
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
