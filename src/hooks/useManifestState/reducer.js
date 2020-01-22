import * as actionTypes from './actionTypes'

export const initialState = {
  loadingData: false,
  loadingCount: false,
  page: 0,
  pageSize: 10,
  sorts: [],
  count: 0,
  rows: [],
  filter: {}
}

export const initialSort = {
  id: '',
  isAsc: true
}

const setLoadingCount = (state, action) => ({
  ...state,
  loadingCount: action.loadingCount
})

const setLoadingData = (state, action) => ({
  ...state,
  loadingData: action.loadingData
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
  filter: action.filter || {},
  page: 0
})

export default (state, action) => {
  switch (action.type) {
    case actionTypes.SET_PAGE: return setPage(state, action)
    case actionTypes.SET_PAGE_SIZE: return setPageSize(state, action)
    case actionTypes.SET_SORTS: return setSorts(state, action)
    case actionTypes.SET_ROWS: return setRows(state, action)
    case actionTypes.SET_COUNT: return setCount(state, action)
    case actionTypes.SET_LOADING_COUNT: return setLoadingCount(state, action)
    case actionTypes.SET_LOADING_DATA: return setLoadingData(state, action)
    case actionTypes.SET_FILTER: return setFilter(state, action)
    default: return state
  }
}
