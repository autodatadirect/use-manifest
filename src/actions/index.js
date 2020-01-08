import * as types from '../constants/actionTypes'

export const setPage = page => ({
  type: types.SET_PAGE,
  page
})

export const setPageSize = pageSize => ({
  type: types.SET_PAGE_SIZE,
  pageSize
})

export const setSort = (id, isAsc) => ({
  type: types.SET_SORT,
  id,
  isAsc
})

export const setRows = rows => ({
  type: types.SET_ROWS,
  rows
})

export const setCount = count => ({
  type: types.SET_COUNT,
  count
})
