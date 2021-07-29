import React, { useCallback } from 'react'
import propTypes from 'prop-types'
import useManifest from '../../hooks/useManifest'

const DEFAULT_PAGE_SIZES = [10, 20, 50, 100, 200]

const DEFAULT_TEXT_GENERATOR = size => `Show ${size} entries`

const PageSizer = ({ className, pageSizes = DEFAULT_PAGE_SIZES, pageSizeLabelGenerator = DEFAULT_TEXT_GENERATOR }) => {
  const { pageSize, setPageSize, rows } = useManifest()

  const handlePageSizeChange = useCallback(ev => {
    setPageSize(+ev.target.value)
  }, [setPageSize, rows])

  return (
    <select className={className} value={pageSize} onChange={handlePageSizeChange}>
      {pageSizes.map(size => <option key={size} value={size}>{pageSizeLabelGenerator(size)}</option>)}
    </select>
  )
}

PageSizer.propTypes = {
  pageSizes: propTypes.arrayOf(propTypes.number),
  pageSizeLableGenerator: propTypes.func,
  className: propTypes.string
}

export default PageSizer
