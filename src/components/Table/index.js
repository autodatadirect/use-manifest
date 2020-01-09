import React from 'react'
import PropTypes from 'prop-types'
import Headers from '../Headers'
import Rows from '../Rows'

const Table = ({ className, columnCount, rowCount }) =>
  <table className={`manifest-table ${className || ''}`}>
    <Headers columnCount={columnCount} />
    <Rows columnCount={columnCount} rowCount={rowCount} />
    <tfoot />
  </table>

Table.propTypes = {
  columnCount: PropTypes.number.isRequired,
  className: PropTypes.string
}

export default Table
