import React from 'react'
import useCell from '../hooks/useCell'

const SimpleCell = ({ columnIndex, rowIndex }: { columnIndex: number, rowIndex: number }) => {
  const { value } = useCell({ columnIndex, rowIndex })

  return <>{value}</>
}

export default SimpleCell
