import useManifest from './useManifest'

const determineFirstOnPage = (page, pageSize) => Math.max(page * pageSize, 0)

const determineLastOnPage = (page, pageSize, count) => Math.min(determineFirstOnPage(page + 1, pageSize), count)

export default () => {
  const { page, pageSize, count } = useManifest()
  const lastOnPage = determineLastOnPage(page, pageSize, count)
  const firstOnPage = determineFirstOnPage(page, pageSize) + 1
  return {
    page,
    pageSize,
    count,
    lastOnPage,
    firstOnPage
  }
}
