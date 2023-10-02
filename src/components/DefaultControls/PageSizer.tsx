import React, { useCallback } from 'react'
import propTypes from 'prop-types'
import useManifest from '../../hooks/useManifest'

export const DEFAULT_PAGE_SIZES = [10, 20, 50, 100, 200]

export const DEFAULT_TEXT_GENERATOR = (size: number) => `Show ${size} entries`

export interface PageSizerProps {
  className?: string
  pageSizes?: typeof DEFAULT_PAGE_SIZES
  pageSizeLabelGenerator?: typeof DEFAULT_TEXT_GENERATOR
}

const PageSizer = ({ className, pageSizes = DEFAULT_PAGE_SIZES, pageSizeLabelGenerator = DEFAULT_TEXT_GENERATOR }: PageSizerProps) => {
  const { pageSize, setPageSize } = useManifest()

  const handlePageSizeChange = useCallback(({ target }: { target: HTMLSelectElement }) => {
    setPageSize(+target.value)
  }, [setPageSize])

  return (
    <select className={className} value={pageSize} onChange={handlePageSizeChange}>
      {pageSizes.map(size => <option key={size} value={size}>{pageSizeLabelGenerator(size)}</option>)}
    </select>
  )
}

export default PageSizer
