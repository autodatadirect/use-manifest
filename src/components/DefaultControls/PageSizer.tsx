import React, { FC, useCallback } from 'react'
import useManifest from '../../hooks/useManifest'

export const DEFAULT_PAGE_SIZES = [10, 20, 50, 100, 200]

export const DEFAULT_TEXT_GENERATOR = (size: number): string => `Show ${size} entries`

export interface PageSizerProps {
  className?: string
  pageSizes?: typeof DEFAULT_PAGE_SIZES
  pageSizeLabelGenerator?: typeof DEFAULT_TEXT_GENERATOR
}

const PageSizer: FC<PageSizerProps> = ({ className, pageSizes = DEFAULT_PAGE_SIZES, pageSizeLabelGenerator = DEFAULT_TEXT_GENERATOR }) => {
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
