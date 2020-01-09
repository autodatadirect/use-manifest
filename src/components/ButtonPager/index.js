import React from 'react'
import PropTypes from 'prop-types'
import * as pagerLogic from '../../utils/pagerLogic'
import PagerButton from '../PagerButton'
import usePager from '../../hooks/usePager'

const isFirstPage = currentPage => currentPage <= 1
const isLastPage = (currentPage, totalPages) => currentPage === totalPages

const Pager = ({ className }) => {
  const { page, pageSize, count, totalPages } = usePager()
  const numberedPageButtons = pagerLogic.determinePages(page, pageSize, count)

  if (count < 1) return null
  return (
    <div className={`manifest-pager ${className || ''}`} aria-label='pager'>
      {!isFirstPage(page) ? <PagerButton page={1}>First</PagerButton> : null}
      {!isFirstPage(page) ? <PagerButton page={page - 1}>{'<'}</PagerButton> : null}
      {numberedPageButtons.map(i => <PagerButton key={i} page={i} isCurrentPage={page === i}>{i}</PagerButton>)}
      {!isLastPage(page, totalPages) ? <PagerButton page={page + 1}>{'>'}</PagerButton> : null}
      {!isLastPage(page, totalPages) ? <PagerButton page={totalPages}>Last</PagerButton> : null}
    </div>
  )
}

Pager.propTypes = {
  className: PropTypes.string
}

export default Pager
