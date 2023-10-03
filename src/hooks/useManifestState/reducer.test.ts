import { correctRowCount } from './reducer'

const is = {
  rows: [],
  page: 0,
  pageSize: 10,
  count: null
}

const makeArraySize = (n: number): number[] => {
  const arr: number[] = []
  for (let i = 0; i < n; i++) {
    arr.push(i)
  }
  return arr
}

const test = (rowsLength: number, pageIndex: number, pageSize: number, count: null | number): number | null => {
  const state = correctRowCount({
    ...is,
    rows: makeArraySize(rowsLength),
    page: pageIndex !== 0 ? pageIndex : is.page,
    pageSize: pageSize !== 0 ? pageSize : is.pageSize,
    count: (count != null && count !== 0) ? count : is.count
  })
  return state.count
}

describe('correctRowCount', () => {
  it('calculates the count successfully', () => {
    expect(test(9, 1, 10, null)).toBe(19)
    expect(test(8, 0, 10, null)).toBe(8)
    expect(test(10, 2, 10, null)).toBe(null)
    expect(test(0, 3, 10, null)).toBe(30)
  })

  it('recalculates the count if it detects that count is wrong', () => {
    expect(test(9, 1, 10, 15)).toBe(19)
    expect(test(8, 0, 10, 0)).toBe(8)
    expect(test(10, 10, 10, 100)).toBe(100)
    expect(test(0, 10, 10, 100)).toBe(100)
    expect(test(0, 10, 10, 110)).toBe(100)
  })
})
