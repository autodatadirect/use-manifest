import React, { useMemo } from 'react'
import HeaderCell from './HeaderCell'
import Cell from './DataCell'
import integerSequence from '../../utils/integerSequence'
import useManifest, {Sort} from '../../hooks/useManifest'
import useCell from '../../hooks/useCell'
import {Definition, Row} from "../Manifest";

const EMPTY_PROPS = {}

export interface TableProps {
  className?: string
  columnCount: number
  rowCount: number
  trPropsHandler: TableRowProps['trPropsHandler']
  tdPropsHandler: TableRowProps['tdPropsHandler']
}

const Table = ({ className, columnCount, rowCount, trPropsHandler, tdPropsHandler }: TableProps) => {
  const columnIndexes = useMemo(() => integerSequence(columnCount), [columnCount])

  return (
    <table className={`manifest-table ${className || ''}`}>
      <Headers columnIndexes={columnIndexes} />
      <Rows rowCount={rowCount} columnIndexes={columnIndexes} trPropsHandler={trPropsHandler} tdPropsHandler={tdPropsHandler} />
    </table>
  )
}

export interface HeadersProps {
  columnIndexes: number[]
}

const Headers = ({ columnIndexes }: HeadersProps) =>
  <thead>
    <tr>
      {columnIndexes.map(i => <th key={i}><HeaderCell columnIndex={i} /></th>)}
    </tr>
  </thead>

export interface RowsProps {
  rowCount: number
  columnIndexes: number[]
  trPropsHandler: TableRowProps['trPropsHandler']
  tdPropsHandler: TableRowProps['tdPropsHandler']
}

const Rows = ({ rowCount, columnIndexes, trPropsHandler, tdPropsHandler }: RowsProps) => {
  const rowIndices = useMemo(() => integerSequence(rowCount), [rowCount])

  return (
    <tbody>
      {rowIndices.map(i => <TableRow key={i} rowIndex={i} columnIndexes={columnIndexes} trPropsHandler={trPropsHandler} tdPropsHandler={tdPropsHandler} />)}
    </tbody>
  )
}

export interface TableRowPropsHandlerProps {
  rowIndex: number
  row: Row
}

export interface TableRowProps {
  rowIndex: number
  columnIndexes: number[]
  trPropsHandler: (props: TableRowPropsHandlerProps) => object
  tdPropsHandler: TableDataProps['tdPropsHandler']
}

const TableRow = ({ rowIndex, columnIndexes, trPropsHandler, tdPropsHandler }: TableRowProps) => {
  const state = useManifest()
  const row = state.rows[rowIndex]
  const props = trPropsHandler({ rowIndex, row }) || EMPTY_PROPS
  return (
    <tr {...props}>
      {columnIndexes.map(columnIndex => <TableData key={columnIndex} rowIndex={rowIndex} columnIndex={columnIndex} tdPropsHandler={tdPropsHandler} />)}
    </tr>
  )
}

export interface TableDataPropsHandlerProps {
  rowIndex: number
  columnIndex: number
  row: Row
  id: string
  label: React.ReactNode
  value: object
  def: Definition
  sorts: [Sort]
}

export interface TableDataProps {
  rowIndex: number
  columnIndex: number
  tdPropsHandler: (props: TableDataPropsHandlerProps) => object
}

const TableData = ({ rowIndex, columnIndex, tdPropsHandler }: TableDataProps) => {
  const { row, id, label, value, def, sorts } = useCell({ rowIndex, columnIndex })
  const props = tdPropsHandler({ rowIndex, columnIndex, row, id, label, value, def, sorts }) || EMPTY_PROPS
  return (
    <td {...props} key={columnIndex + '.' + rowIndex}>
      <Cell columnIndex={columnIndex} rowIndex={rowIndex} />
    </td>
  )
}

export default Table
