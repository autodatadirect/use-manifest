import useManifest from './useManifest'
import * as pagerLogic from '../utils/pagerLogic'

export default ({ numberOfPages }) => {
  const { loading, page, pageSize, count, setPage, setPageSize } = useManifest()
  const totalPages = pagerLogic.determineTotalPages(pageSize, count)
  const pages = pagerLogic.determinePages(numberOfPages, page, pageSize, count)
  return {
    loading,
    count,
    page,
    pages,
    pageSize,
    totalPages,
    setPage,
    setPageSize
  }
}
