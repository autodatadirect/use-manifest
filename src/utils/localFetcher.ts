import { State } from '../hooks/useManifestState/reducer'

type Sorter = (a: any, b: any) => number

const reverse = (sorter: Sorter) => (a: any, b: any) => {
  const res = sorter(a, b)
  if (res < 0) return 1
  if (res > 0) return -1
  return 0
}

const sorter = (tableState: Partial<State> = {}) => {
  let { sorts } = tableState
  sorts ??= []

  if (sorts.length === 0) return

  const sort = sorts[0]
  if (!sort || !sort.id) return

  if (sort.direction === 'DESCENDING') {
    return reverse(fieldSorter(sort.id))
  } else {
    return fieldSorter(sort.id)
  }
}

const paginate = ({ page = 0, pageSize = 10 } = {}, rows: any[] | undefined = undefined) => rows?.slice(page * pageSize, page * pageSize + pageSize)

const fieldSorter = (id: string) => (a: [index: string], b: [index: string]) => {
  let nameA: any = (a as any)[id]
  if (typeof nameA === 'string') {
    nameA = nameA.toUpperCase()
  }

  let nameB: any = (b as any)[id]
  if (typeof nameB === 'string') {
    nameB = nameB.toUpperCase()
  }

  if (nameA < nameB) return -1
  if (nameA > nameB) return 1

  return 0
}

const KEEP_ALL = () => true

type DataFilter = (...args: any) => boolean
type TableViewState = any

export default (data: any[], filterer: DataFilter = KEEP_ALL) => {
  const preprocess = (filter: DataFilter, tableViewState: TableViewState) => data.filter(filterer).sort(sorter(tableViewState))

  const fetchRows = async (filter: DataFilter, tableViewState: TableViewState) => {
    const all = preprocess(filter, tableViewState)
    return paginate(tableViewState, all)
  }

  const fetchCount = async (filter: DataFilter, tableViewState: TableViewState) => {
    return preprocess(filter, tableViewState).length
  }

  return {
    fetchRows,
    fetchCount
  }
}
