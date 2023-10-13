import useManifest from './useManifest'

const determineFirstOnPage = (page: number, pageSize: number): number => {
  return Math.max(page * pageSize, 0)
}

const determineLastOnPage = (page: number, pageSize: number, count: number): number => {
  return Math.min(determineFirstOnPage(page + 1, pageSize), count)
}

const determineLastOnPageWithoutCount = (page: number, pageSize: number): number => {
  return (page + 1) * pageSize
}

export default (): {
  lastOnPage: number
  count: number | null
  pageSize: number
  firstOnPage: number
  page: number
  loading: boolean
} => {
  const { page, pageSize, count, loadingCount, loadingRows } = useManifest()

  const firstOnPage = determineFirstOnPage(page, pageSize) + 1

  let lastOnPage
  if (count == null) {
    lastOnPage = determineLastOnPageWithoutCount(page, pageSize)
  } else {
    lastOnPage = determineLastOnPage(page, pageSize, count)
  }

  const loading = loadingRows || loadingCount

  return {
    page,
    pageSize,
    count,
    lastOnPage,
    firstOnPage,
    loading
  }
}
