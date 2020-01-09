import useManifest from './useManifest'
import * as pagerLogic from '../utils/pagerLogic'

export default () => {
  const { loading, page, pageSize, count, setPage, setPageSize } = useManifest()
  const totalPages = pagerLogic.determineTotalPages(pageSize, count)

  return {
    loading,
    count,
    page,
    pageSize,
    totalPages,
    setPage,
    setPageSize
  }
}
