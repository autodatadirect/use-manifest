import * as actionTypes from '../constants/actionTypes'

export const initialState = {
  meta: {
    page: 1,
    pageSize: 10,
    sort: []
  },
  count: 0,
  rows: []
}

export const initialSort = {
  id: '',
  isAsc: true
}

const setPage = (state, action) => ({
  ...state,
  meta: {
    ...state.meta,
    page: action.page
  }
})

const setPageSize = (state, action) => ({
  ...state,
  meta: {
    ...state.meta,
    pageSize: action.pageSize,
    page: 1
  }
})

const setSort = (state, action) => ({
  ...state,
  meta: {
    ...state.meta,
    sort: [
      {
        ...initialSort,
        id: action.id,
        isAsc: action.isAsc
      }
    ]
  }
})

const setRows = (state, action) => ({
  ...state,
  rows: action.rows
})

const setCount = (state, action) => ({
  ...state,
  count: action.count
})

export default (state, action) => {
  switch (action.type) {
    case actionTypes.SET_PAGE: return setPage(state, action)
    case actionTypes.SET_PAGE_SIZE: return setPageSize(state, action)
    case actionTypes.SET_SORT: return setSort(state, action)
    case actionTypes.SET_ROWS: return setRows(state, action)
    case actionTypes.SET_COUNT: return setCount(state, action)
    default: return state
  }
}
