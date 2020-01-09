import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import * as pagerLogic from '../../utils/pagerLogic'
import usePager from '../../hooks/usePager'

const isFirstPage = currentPage => currentPage <= 1
const isLastPage = (currentPage, totalPages) => currentPage === totalPages

const Pager = ({ className }) => {
  const { page, pageSize, count, totalPages, loading } = usePager()
  const numberedPageButtons = pagerLogic.determinePages(page, pageSize, count)

  if (count < 1) return null
  return (
    <div className={`manifest-pager ${className || ''}`} aria-label='pager'>
      {!isFirstPage(page) ? <PagerButton page={1} loading={loading}>First</PagerButton> : null}
      {!isFirstPage(page) ? <PagerButton page={page - 1} loading={loading}>{'<'}</PagerButton> : null}
      {numberedPageButtons.map(i => <PagerButton key={i} page={i} isCurrentPage={page === i} loading={loading}>{i}</PagerButton>)}
      {!isLastPage(page, totalPages) ? <PagerButton page={page + 1} loading={loading}>{'>'}</PagerButton> : null}
      {!isLastPage(page, totalPages) ? <PagerButton page={totalPages} loading={loading}>Last</PagerButton> : null}
    </div>
  )
}

Pager.propTypes = {
  className: PropTypes.string
}

const PagerButton = ({ page, loading, isCurrentPage, children }) => {
  const { setPage } = usePager()
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
