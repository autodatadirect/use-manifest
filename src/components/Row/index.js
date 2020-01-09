import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import SimpleCell from '../SimpleCell'
import useColumn from '../../hooks/useColumn'
import createSequentialIntegerArray from '../../utils/createSequentialIntegerArray'

const Row = ({ rowIndex, columnCount }) => {
  const columnIndexArray = useMemo(() => createSequentialIntegerArray(columnCount), [columnCount])

  return (
    <tr>
      {columnIndexArray.map(columnIndex => <td key={columnIndex + '.' + rowIndex}><Cell columnIndex={columnIndex} rowIndex={rowIndex} /></td>)}
    </tr>
  )
}

Row.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  columnCount: PropTypes.number.isRequired
}

const Cell = ({ columnIndex, rowIndex }) => {
  const { cellComponent: CellComponent } = useColumn(columnIndex)

  if (CellComponent) return <CellComponent columnIndex={columnIndex} rowIndex={rowIndex} />
  return <SimpleCell columnIndex={columnIndex} rowIndex={rowIndex} />
}

export default Row
