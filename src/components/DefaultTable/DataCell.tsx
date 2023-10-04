import React from 'react'
import SimpleCell from '../DefaultCell'
import useCell from '../../hooks/useCell'

const Cell = ({ columnIndex, rowIndex }: { columnIndex: number, rowIndex: number }): React.JSX.Element => {
  const { def } = useCell({ columnIndex, rowIndex })
  const Component = def.cellComponent ?? SimpleCell

  return <Component columnIndex={columnIndex} rowIndex={rowIndex} />
}

export default Cell
