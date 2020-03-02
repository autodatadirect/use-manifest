import * as actionTypes from './actionTypes'

export const initialState = {
  loadingRows: false,
  loadingCount: false,
  page: 0,
  pageSize: 10,
  sorts: [],
  count: null,
  rows: [],
  filter: null,
  error: null
}

export const initialSort = {
  id: '',
  isAsc: true
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
  page: action.page,
  count: action.page ? state.count : null
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
      isAsc: action.isAsc
    }
  ],
  page: 0
})

const setRows = (state, action) => ({
  ...state,
  rows: action.rows
})

const setCount = (state, action) => ({
  ...state,
  count: action.count
})

const setFilter = (state, action) => ({
  ...state,
  filter: action.filter,
  page: 0
})

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
    default: return state
  }
}
