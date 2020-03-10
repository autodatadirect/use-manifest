import React from 'react'
import PropTypes from 'prop-types'
import Pager from '../ButtonPager'
import PageSizer from './PageSizer'
import Status from './Status'

const Controls = ({ className }) => (
  <div className='manifest-controls'>
    <PageSizer />
    <Status />
    <Pager />
  </div>
)

Controls.propTypes = {
  className: PropTypes.string
}

export default Controls
