import React, { useMemo } from 'react'
import HeaderCell from './HeaderCell'
import Cell from './DataCell'
import integerSequence from '../../utils/integerSequence'
import useManifest, { Sort } from '../../hooks/useManifest'
import useCell from '../../hooks/useCell'
import { Definition } from '../Manifest'

const EMPTY_PROPS = {}

export interface TableProps<Row> {
  className?: string
  columnCount: number
  rowCount: number
  trPropsHandler: TableRowProps<Row>['trPropsHandler']
  tdPropsHandler: TableRowProps<Row>['tdPropsHandler']
}

function Table<Row> ({ className, columnCount, rowCount, trPropsHandler, tdPropsHandler }: TableProps<Row>) {
  const columnIndexes = useMemo(() => integerSequence(columnCount), [columnCount])

  return (
    <table className={`manifest-table ${className || ''}`}>
      <Headers columnIndexes={columnIndexes} />
      <Rows
        rowCount={rowCount} columnIndexes={columnIndexes} trPropsHandler={trPropsHandler}
        tdPropsHandler={tdPropsHandler}
      />
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

export interface RowsProps<Row> {
  rowCount: number
  columnIndexes: number[]
  trPropsHandler: TableRowProps<Row>['trPropsHandler']
  tdPropsHandler: TableRowProps<Row>['tdPropsHandler']
}

function Rows<Row> ({ rowCount, columnIndexes, trPropsHandler, tdPropsHandler }: RowsProps<Row>) {
  const rowIndices = useMemo(() => integerSequence(rowCount), [rowCount])

  return (
    <tbody>
      {rowIndices.map(i => <TableRow
        key={i} rowIndex={i} columnIndexes={columnIndexes} trPropsHandler={trPropsHandler}
        tdPropsHandler={tdPropsHandler}
                           />)}
    </tbody>
  )
}

export interface TableRowPropsHandlerProps<Row> {
  rowIndex: number
  row: Row
}

export interface TableRowProps<Row> {
  rowIndex: number
  columnIndexes: number[]
  trPropsHandler: (props: TableRowPropsHandlerProps<Row>) => object
  tdPropsHandler: TableDataProps<Row>['tdPropsHandler']
}

function TableRow<Row> ({ rowIndex, columnIndexes, trPropsHandler, tdPropsHandler }: TableRowProps<Row>) {
  const state = useManifest<unknown, Row>()
  const row = state.rows[rowIndex]
  const props = trPropsHandler({ rowIndex, row }) || EMPTY_PROPS
  return (
    <tr {...props}>
      {columnIndexes.map(columnIndex => <TableData
        key={columnIndex} rowIndex={rowIndex} columnIndex={columnIndex}
        tdPropsHandler={tdPropsHandler} />)}
    </tr>
  )
}

export interface TableDataPropsHandlerProps<Row> {
  rowIndex: number
  columnIndex: number
  row: Row
  id: string
  label: React.ReactNode
  value: object
  def: Definition
  sorts: [Sort]
}

export interface TableDataProps<Row> {
  rowIndex: number
  columnIndex: number
  tdPropsHandler: (props: TableDataPropsHandlerProps<Row>) => object
}

function TableData<Row> ({ rowIndex, columnIndex, tdPropsHandler }: TableDataProps<Row>) {
  const { row, id, label, value, def, sorts } = useCell<Row>({ rowIndex, columnIndex })
  const props = tdPropsHandler({ rowIndex, columnIndex, row, id, label, value, def, sorts }) || EMPTY_PROPS
  return (
    <td {...props} key={columnIndex + '.' + rowIndex}>
      <Cell columnIndex={columnIndex} rowIndex={rowIndex} />
    </td>
  )
}

export default Table
