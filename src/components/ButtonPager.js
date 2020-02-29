import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import usePager from '../hooks/usePager'

const Pager = ({ className }) => {
  const { page, pages, count, totalPages, loading } = usePager({ numberOfPages: 5 })
  const lastPage = totalPages - 1

  if (count < 1) return null
  return (
    <div className={`manifest-pager ${className || ''}`} aria-label='pager'>
      {page > 0 ? <PagerButton page={0} loading={loading}>First</PagerButton> : null}
      {page > 0 ? <PagerButton page={page - 1} loading={loading}>{'<'}</PagerButton> : null}
      {pages.map(i => <PagerButton key={i} page={i} isCurrentPage={page === i} loading={loading}>{i + 1}</PagerButton>)}
      {page < lastPage ? <PagerButton page={page + 1} loading={loading}>{'>'}</PagerButton> : null}
      {page < lastPage ? <PagerButton page={lastPage} loading={loading}>Last</PagerButton> : null}
    </div>
  )
}

Pager.propTypes = {
  className: PropTypes.string
}

const PagerButton = ({ page, loading, isCurrentPage, children }) => {
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

PagerButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  children: PropTypes.any.isRequired,
  isCurrentPage: PropTypes.bool
}

export default Pager
