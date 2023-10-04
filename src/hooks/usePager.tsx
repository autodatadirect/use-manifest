import useManifest from './useManifest'
import * as pagerLogic from '../utils/pagerLogic'

export default ({ numberOfPages }: { numberOfPages?: number }): {
  pages: number[]
  count: number
  totalPages: number | null
  pageSize: number
  showLast: boolean
  page: number
  showFirst: boolean
  showNext: boolean
  loading: boolean
  setPageSize: (pageSize: number) => void
  setPage: (page: number) => void
  showPrevious: boolean
} => {
  const { loadingRows, page, pageSize, count, setPage, setPageSize, rows } = useManifest()
  const { showFirst, showPrevious, showNext, showLast } = pagerLogic.showRelativePages({ count, pageSize, page, rows })

  numberOfPages ??= 0
  const pages = pagerLogic.determinePages({ numberOfPages, currentPage: page, pageSize, count, showNext })
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
