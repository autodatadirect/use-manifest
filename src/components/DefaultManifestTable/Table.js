import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import HeaderCell from './HeaderCell'
import Cell from './DataCell'
import integerSequence from '../../utils/integerSequence'
import useManifest from 'use-manifest/src/hooks/useManifest'
import useCell from 'use-manifest/src/hooks/useCell'

const Table = ({ className, columnCount, rowCount, trPropsHandler, tdPropsHandler }) => {
  const columnIndexs = useMemo(() => integerSequence(columnCount), [columnCount])

  return (
    <table className={`manifest-table ${className || ''}`}>
      <Headers columnIndexs={columnIndexs} />
      <Rows rowCount={rowCount} columnIndexs={columnIndexs} trPropsHandler={trPropsHandler} tdPropsHandler={tdPropsHandler} />
    </table>
  )
}

Table.propTypes = {
  columnCount: PropTypes.number.isRequired,
  className: PropTypes.string,
  trPropsHandler: PropTypes.func.isRequired,
  tdPropsHandler: PropTypes.func.isRequired
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

const Rows = ({ rowCount, columnIndexs, trPropsHandler, tdPropsHandler }) => {
  const rowIndexs = useMemo(() => integerSequence(rowCount), [rowCount])

  return (
    <tbody>
      {rowIndexs.map(i => <TableRow key={i} rowIndex={i} columnIndexs={columnIndexs} trPropsHandler={trPropsHandler} tdPropsHandler={tdPropsHandler} />)}
    </tbody>
  )
}

Rows.propTypes = {
  rowCount: PropTypes.number.isRequired,
  columnIndexs: PropTypes.array.isRequired,
  trPropsHandler: PropTypes.func.isRequired,
  tdPropsHandler: PropTypes.func.isRequired
}

const TableRow = ({ rowIndex, columnIndexs, trPropsHandler, tdPropsHandler }) => {
  const state = useManifest()
  const row = state.rows[rowIndex]
  return (
    <tr {...trPropsHandler({ rowIndex, columnIndexs, ...state, row })}>
      {columnIndexs.map(columnIndex => <TableData key={columnIndex} rowIndex={rowIndex} columnIndex={columnIndex} tdPropsHandler={tdPropsHandler} />)}
    </tr>
  )
}

TableRow.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  columnIndexs: PropTypes.array.isRequired,
  trPropsHandler: PropTypes.func.isRequired,
  tdPropsHandler: PropTypes.func.isRequired
}

const TableData = ({ rowIndex, columnIndex, tdPropsHandler }) => {
  const cellData = useCell({ rowIndex, columnIndex })
  return (
    <td {...tdPropsHandler({ rowIndex, columnIndex, ...cellData })} key={columnIndex + '.' + rowIndex}>
      <Cell columnIndex={columnIndex} rowIndex={rowIndex} />
    </td>
  )
}

TableData.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  columnIndexs: PropTypes.array.isRequired,
  tdPropsHandler: PropTypes.func.isRequired
}

export default Table
