import React from 'react'
import PropTypes from 'prop-types'
import * as pagerLogic from '../../utils/pagerLogic'
import PagerButton from '../PagerButton'
import usePager from '../../hooks/usePager'

const isFirstPage = currentPage => currentPage <= 1
const isLastPage = (currentPage, totalPages) => currentPage === totalPages

const FirstButton = ({ loading }) =>
  <PagerButton className='first-page' loading={loading} page={1}>
    {'First'}
  </PagerButton>

const PreviousButton = ({ page, loading }) =>
  <PagerButton className='previous-page' loading={loading} page={page}>
    {'<'}
  </PagerButton>

const NextButton = ({ page, loading }) =>
  <PagerButton className='next-page' loading={loading} page={page}>
    {'>'}
  </PagerButton>

const LastButton = ({ page, loading }) =>
  <PagerButton loading={loading} className='last-page' page={page}>
    {'Last'}
  </PagerButton>

const NumberedPageButton = ({ page, currentPage }) =>
  <PagerButton key={page} page={page} isCurrentPage={page === currentPage}>
    {page}
  </PagerButton>

const Pager = ({ className }) => {
  const { page, pageSize, count, totalPages } = usePager()
  const numberedPageButtons = pagerLogic.determinePages(page, pageSize, count)

  if (count < 1) return null
  return (
    <div className={`manifest-pager ${className || ''}`} aria-label='pager'>
      {!isFirstPage(page) ? <FirstButton /> : null}
      {!isFirstPage(page) ? <PreviousButton page={page - 1} /> : null}
      {numberedPageButtons.map(i => <NumberedPageButton key={i} page={i} currentPage={page} />)}
      {!isLastPage(page, totalPages) ? <NextButton page={page + 1} /> : null}
      {!isLastPage(page, totalPages) ? <LastButton page={totalPages} /> : null}
    </div>
  )
}

Pager.propTypes = {
  className: PropTypes.string
}

export default Pager
