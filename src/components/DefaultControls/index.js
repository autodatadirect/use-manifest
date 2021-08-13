import React from 'react'
import PropTypes from 'prop-types'
import Pager from '../ButtonPager'
import PageSizer from './PageSizer'
import Status from './Status'

const DefaultControls = ({ className, pageSizes, pageSizeLabelGenerator, statusMessageGenerator }) =>
  <div className={'manifest-controls' + (className ? ' ' + className : '')}>
    <PageSizer pageSizes={pageSizes} pageSizeLabelGenerator={pageSizeLabelGenerator} />
    <Status statusMessageGenerator={statusMessageGenerator} />
    <Pager />
  </div>

DefaultControls.propTypes = {
  className: PropTypes.string,
  pageSizeLabelGenerator: PropTypes.func,
  statusMessageGenerator: PropTypes.func
}

export default DefaultControls
