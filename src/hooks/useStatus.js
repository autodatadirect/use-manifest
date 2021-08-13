import useManifest from './useManifest'

const determineFirstOnPage = (page, pageSize) => Math.max(page * pageSize, 0)

const determineLastOnPage = (page, pageSize, count) => Math.min(determineFirstOnPage(page + 1, pageSize), count)

const determineLastOnPageWithoutCount = (page, pageSize) => (page + 1) * pageSize

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
