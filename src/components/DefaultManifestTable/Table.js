import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import HeaderCell from './HeaderCell'
import Cell from './DataCell'
import integerSequence from '../../utils/integerSequence'
import useManifest from '../../hooks/useManifest'
import useCell from '../../hooks/useCell'

const EMPTY_PROPS = {}

const Table = ({ className, columnCount, rowCount, trPropsHandler, tdPropsHandler }) => {
  const columnIndexes = useMemo(() => integerSequence(columnCount), [columnCount])

  return (
    <table className={`manifest-table ${className || ''}`}>
      <Headers columnIndexes={columnIndexes} />
      <Rows rowCount={rowCount} columnIndexes={columnIndexes} trPropsHandler={trPropsHandler} tdPropsHandler={tdPropsHandler} />
    </table>
  )
}

Table.propTypes = {
  columnCount: PropTypes.number.isRequired,
  className: PropTypes.string,
  trPropsHandler: PropTypes.func.isRequired,
  tdPropsHandler: PropTypes.func.isRequired
}

const Headers = ({ columnIndexes }) =>
  <thead>
    <tr>
      {columnIndexes.map(i => <th key={i}><HeaderCell columnIndex={i} /></th>)}
    </tr>
  </thead>

Headers.propTypes = {
  columnIndexes: PropTypes.array.isRequired
}

const Rows = ({ rowCount, columnIndexes, trPropsHandler, tdPropsHandler }) => {
  const rowIndexs = useMemo(() => integerSequence(rowCount), [rowCount])

  return (
    <tbody>
      {rowIndexs.map(i => <TableRow key={i} rowIndex={i} columnIndexes={columnIndexes} trPropsHandler={trPropsHandler} tdPropsHandler={tdPropsHandler} />)}
    </tbody>
  )
}

Rows.propTypes = {
  rowCount: PropTypes.number.isRequired,
  columnIndexes: PropTypes.array.isRequired,
  trPropsHandler: PropTypes.func.isRequired,
  tdPropsHandler: PropTypes.func.isRequired
}

const TableRow = ({ rowIndex, columnIndexes, trPropsHandler, tdPropsHandler }) => {
  const state = useManifest()
  const row = state.rows[rowIndex]
  const props = trPropsHandler({ rowIndex, row }) || EMPTY_PROPS
  return (
    <tr {...props}>
      {columnIndexes.map(columnIndex => <TableData key={columnIndex} rowIndex={rowIndex} columnIndex={columnIndex} tdPropsHandler={tdPropsHandler} />)}
    </tr>
  )
}

TableRow.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  columnIndexes: PropTypes.array.isRequired,
  trPropsHandler: PropTypes.func.isRequired,
  tdPropsHandler: PropTypes.func.isRequired
}

const TableData = ({ rowIndex, columnIndex, tdPropsHandler }) => {
  const { row, id, label, value, def, sorts } = useCell({ rowIndex, columnIndex })
  const props = tdPropsHandler({ rowIndex, columnIndex, row, id, label, value, def, sorts }) || EMPTY_PROPS
  return (
    <td {...props} key={columnIndex + '.' + rowIndex}>
      <Cell columnIndex={columnIndex} rowIndex={rowIndex} />
    </td>
  )
}

TableData.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  columnIndexes: PropTypes.array.isRequired,
  tdPropsHandler: PropTypes.func.isRequired
}

export default Table
