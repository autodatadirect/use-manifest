import useManifest from './useManifest'

const determineFirstOnPage = (page: number, pageSize: number) => Math.max(page * pageSize, 0)

const determineLastOnPage = (page: number, pageSize: number, count: number) => Math.min(determineFirstOnPage(page + 1, pageSize), count)

const determineLastOnPageWithoutCount = (page: number, pageSize: number) => (page + 1) * pageSize

export default () => {
  const { page, pageSize, count, loadingCount, loadingRows } = useManifest()

  const firstOnPage = determineFirstOnPage(page, pageSize) + 1

  let lastOnPage
  if (count === null) {
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
