import React from 'react'
import useCell from '../hooks/useCell'

const SimpleCell = ({ columnIndex, rowIndex }: { columnIndex: number, rowIndex: number }): React.JSX.Element => {
  const { value } = useCell({ columnIndex, rowIndex })

  return <>{value}</>
}

export default SimpleCell
