import useManifest from './useManifest'
import * as pagerLogic from '../utils/pagerLogic'

export default ({ numberOfPages }) => {
  const { loadingRows, page, pageSize, count, setPage, setPageSize, rows } = useManifest()
  const { showFirst, showPrevious, showNext, showLast } = pagerLogic.showRelativePages({ count, pageSize, page, rows })

  const pages = pagerLogic.determinePages({ numberOfPages, currentPage: page, pageSize, count, showNext, loadingRows })
  const totalPages = pagerLogic.determineTotalPages(pageSize, count)

  return {
    loading: loadingRows,
    count,
    page,
    pages,
    pageSize,
    totalPages,
    setPage,
    setPageSize,
    showFirst,
    showPrevious,
    showNext,
    showLast
  }
}
