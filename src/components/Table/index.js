import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import HeaderCell from '../HeaderCell'
import Cell from '../Cell'
import integerSequence from '../../utils/integerSequence'

const Table = ({ className, columnCount, rowCount }) => {
  const columnIndexs = useMemo(() => integerSequence(columnCount), [columnCount])

  return (
    <table className={`manifest-table ${className || ''}`}>
      <Headers columnIndexs={columnIndexs} />
      <Rows rowCount={rowCount} columnIndexs={columnIndexs} />
    </table>
  )
}

Table.propTypes = {
  columnCount: PropTypes.number.isRequired,
  className: PropTypes.string
}

const Headers = ({ columnIndexs }) =>
  <thead>
    <tr>
      {columnIndexs.map(i => <th key={i}><HeaderCell columnIndex={i} /></th>)}
    </tr>
  </thead>

Headers.propTypes = {
  columnIndexs: PropTypes.array.isRequired
}

const Rows = ({ rowCount, columnIndexs }) => {
  const rowIndexs = useMemo(() => integerSequence(rowCount), [rowCount])

  return (
    <tbody>
      {rowIndexs.map(i => <Row key={i} rowIndex={i} columnIndexs={columnIndexs} />)}
    </tbody>
  )
}

Rows.propTypes = {
  rowCount: PropTypes.number.isRequired,
  columnIndexs: PropTypes.array.isRequired
}

const Row = ({ rowIndex, columnIndexs }) =>
  <tr>
    {columnIndexs.map(columnIndex => <td key={columnIndex + '.' + rowIndex}><Cell columnIndex={columnIndex} rowIndex={rowIndex} /></td>)}
  </tr>

Row.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  columnIndexs: PropTypes.array.isRequired
}

export default Table
