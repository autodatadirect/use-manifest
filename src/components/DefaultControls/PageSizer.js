import React, { useCallback } from 'react'
import propTypes from 'prop-types'
import useManifest from '../../hooks/useManifest'

const DEFAULT_PAGE_SIZES = [10, 20, 50, 100, 200]

const DEFAULT_TEXT_GENERATOR = size => `Show ${size} entries`

const PageSizer = ({ pageSizes = DEFAULT_PAGE_SIZES, pageSizeLableGenerator = DEFAULT_TEXT_GENERATOR }) => {
  const { pageSize, setPageSize } = useManifest()

  const handlePageSizeChange = useCallback(ev => {
    setPageSize(+ev.target.value)
  }, [setPageSize])

  return (
    <select value={pageSize} onChange={handlePageSizeChange}>
      {pageSizes.map(size => <option key={size} value={size}>{pageSizeLableGenerator(size)}</option>)}
    </select>
  )
}

PageSizer.propTypes = {
  pageSizes: propTypes.arrayOf(propTypes.number),
  pageSizeLableGenerator: propTypes.func
}

export default PageSizer
