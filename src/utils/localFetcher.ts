interface Sorter {
  (a: any, b: any): number
}

const reverse = (sorter: Sorter) => (a: any, b: any) => {
  const res = sorter(a, b)
  if (res < 0) return 1
  if (res > 0) return -1
  return 0
}

const sorter = (tableState: { sorts?: any[] } = {}) => {
  const { sorts = [] } = tableState

  if (!sorts.length) return

  const sort = sorts[0]
  if (!sort || !sort.id) return

  if (sort.direction === 'DESCENDING') {
    return reverse(fieldSorter(sort.id))
  } else {
    return fieldSorter(sort.id)
  }
}

const paginate = ({ page = 0, pageSize = 10 } = {}, rows = undefined) => rows.slice(page * pageSize, page * pageSize + pageSize)

const fieldSorter = id => (a, b) => {
  const nameA = a[id]
  const nameB = b[id]
  if (typeof nameA === 'string') nameA.toUpperCase()
  if (typeof nameB === 'string') nameB.toUpperCase()
  if (nameA < nameB) return -1
  if (nameA > nameB) return 1
  return 0
}

const KEEP_ALL = () => true

export default (data, filterer = KEEP_ALL) => {
  const preprocess = (filter, tableViewState) => data.filter(filterer).sort(sorter(tableViewState))

  const fetchRows = (filter, tableViewState) => {
    const all = preprocess(filter, tableViewState)
    return Promise.resolve(paginate(tableViewState, all))
  }

  const fetchCount = (filter, tableViewState) => {
    return Promise.resolve(preprocess(filter, tableViewState).length)
  }

  return {
    fetchRows,
    fetchCount
  }
}
