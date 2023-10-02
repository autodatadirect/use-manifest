import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import usePager from '../hooks/usePager'

const Pager = ({ className }: { className?: string }) => {
  const { page, pages, count, pageSize, loading, showFirst, showPrevious, showNext, showLast } = usePager({ numberOfPages: 5 })
  const lastPage = Math.ceil(count / pageSize) - 1

  if (count != null && count < 1) return null

  return (
    <div className={`manifest-pager ${className || ''}`} aria-label='pager'>
      {showFirst ? <PagerButton page={0} loading={loading}>First</PagerButton> : null}
      {showPrevious ? <PagerButton page={page - 1} loading={loading}>{'<'}</PagerButton> : null}
      {pages.map(i => <PagerButton key={i} page={i} isCurrentPage={page === i} loading={loading}>{i + 1}</PagerButton>)}
      {showNext ? <PagerButton page={page + 1} loading={loading}>{'>'}</PagerButton> : null}
      {showLast ? <PagerButton page={lastPage} loading={loading}>Last</PagerButton> : null}
    </div>
  )
}

Pager.propTypes = {
  className: PropTypes.string
}

interface PagerButtonProps {
  page: number
  loading: boolean
  isCurrentPage?: boolean
  children: React.ReactNode
}

const PagerButton = ({ page, loading, isCurrentPage, children }: PagerButtonProps) => {
  const { setPage } = usePager({})
  const handleClick = useCallback(() => setPage(page), [page])

  let buttonStyle = 'pager-button'
  if (isCurrentPage) buttonStyle += ' current-page'
  return (
    <button data-page={page} className={buttonStyle} onClick={handleClick} disabled={loading}>
      {children}
    </button>
  )
}

export default Pager
