import React, { FC } from 'react'
import SimpleCell from '../DefaultCell'
import useCell from '../../hooks/useCell'

export interface DataCellProps {
  columnIndex: number
  rowIndex: number
}

const Cell: FC<DataCellProps> = ({ columnIndex, rowIndex }) => {
  const { def } = useCell({ columnIndex, rowIndex })
  const Component = def.cellComponent ?? SimpleCell

  return <Component columnIndex={columnIndex} rowIndex={rowIndex} />
}

export default Cell
