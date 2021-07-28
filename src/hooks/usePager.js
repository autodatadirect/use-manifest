import useManifest from './useManifest'
import * as pagerLogic from '../utils/pagerLogic'

export default ({ numberOfPages }) => {
  const { loadingCount, loadingRows, page, pageSize, count, setPage, setPageSize, hasNextPage, showFirst, showPrevious, showNext, showLast } = useManifest()
  const totalPages = pagerLogic.determineTotalPages(pageSize, count)
  const pages = pagerLogic.determinePages({ numberOfPages, currentPage: page, pageSize, count, hasNextPage })
  return {
    loading: loadingCount || loadingRows,
    count,
    page,
    pages,
    pageSize,
    totalPages,
    setPage,
    setPageSize,
    hasNextPage,
    showFirst,
    showPrevious,
    showNext,
    showLast
  }
}
