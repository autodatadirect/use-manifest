import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import usePager from '../../hooks/usePager'

const PagerButton = ({ page, loading, isCurrentPage, children, className }) => {
  const { setPage } = usePager()
  const handleClick = useCallback(() => setPage(page), [page])

  let buttonStyle = 'pager-button'
  if (className) buttonStyle += ' ' + className
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
  currentPage: PropTypes.number.isRequired,
  children: PropTypes.any.isRequired,
  className: PropTypes.string
}

export default PagerButton
