import React from 'react'
import PropTypes from 'prop-types'

const CellEpochDate = ({ value }) =>
  <>
    {value ? new Date(value).toISOString().replace(/(.*?)T.*/, '$1') : ''}
  </>

CellEpochDate.propTypes = {
  value: PropTypes.number
}

export default CellEpochDate
