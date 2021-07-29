import { useEffect } from 'react'
import useManifest from './useManifest'
import * as pagerLogic from '../utils/pagerLogic'
import { useIsFirstLoad } from '../components/Manifest'

export default ({ numberOfPages }) => {
  const { loadingRows, page, pageSize, count, setPage, setCount, setPageSize, rows, fetchCount } = useManifest()
  const { showFirst, showPrevious, showNext, showLast } = pagerLogic.showRelativePages({ count, pageSize, page, rows })

  const pages = pagerLogic.determinePages({ numberOfPages, currentPage: page, pageSize, count, showNext, loadingRows })
  const totalPages = pagerLogic.determineTotalPages(pageSize, count)
  const onLastPage = (pages.length && page === pages[pages.length - 1]) && !showNext

  const isFirstLoad = useIsFirstLoad()

  useEffect(() => {
    if (!isFirstLoad && onLastPage) {
      const newCount = page * pageSize + rows.length

      if (!count || count !== newCount) setCount(newCount)
      if (fetchCount && rows.length === pageSize) setCount(null)
    }
  }, [setCount, page, pageSize, rows])

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
