import React, { FC, useCallback } from 'react'
import usePager from '../hooks/usePager'

const Pager: FC<{ className?: string }> = ({ className }) => {
  const { page, pages, count, pageSize, loading, showFirst, showPrevious, showNext, showLast } = usePager({ numberOfPages: 5 })
  const lastPage = Math.ceil(count ?? 0 / pageSize) - 1

  if (count != null && count < 1) return null

  return (
    <div className={`manifest-pager ${className ?? ''}`} aria-label='pager'>
      {showFirst ? <PagerButton page={0} loading={loading}>First</PagerButton> : null}
      {showPrevious ? <PagerButton page={page - 1} loading={loading}>{'<'}</PagerButton> : null}
      {pages.map(i => <PagerButton key={i} page={i} isCurrentPage={page === i} loading={loading}>{i + 1}</PagerButton>)}
      {showNext ? <PagerButton page={page + 1} loading={loading}>{'>'}</PagerButton> : null}
      {showLast ? <PagerButton page={lastPage} loading={loading}>Last</PagerButton> : null}
    </div>
  )
}

interface PagerButtonProps {
  page: number
  loading: boolean
  isCurrentPage?: boolean
  children: React.ReactNode
}

const PagerButton: FC<PagerButtonProps> = ({ page, loading, isCurrentPage, children }) => {
  const { setPage } = usePager({})
  const handleClick = useCallback(() => setPage(page), [page])

  let buttonStyle = 'pager-button'
  if (isCurrentPage !== undefined && isCurrentPage) buttonStyle += ' current-page'
  return (
    <button data-page={page} className={buttonStyle} onClick={handleClick} disabled={loading}>
      {children}
    </button>
  )
}

export default Pager
