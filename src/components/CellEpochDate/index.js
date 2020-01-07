import React from 'react'
import PropTypes from 'prop-types'

const CellEpochDate = ({value}) =>
  <td>
    {value ? new Date(value).toISOString().replace(/(.*?)T.*/, '$1') : ''}
  </td>

CellEpochDate.propTypes = {
  value: PropTypes.number
}

export default CellEpochDate
