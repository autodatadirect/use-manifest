import React, { FC } from 'react'
import useCell from '../hooks/useCell'
import { DataCellProps } from './DefaultTable/DataCell'

const SimpleCell: FC<DataCellProps> = ({ columnIndex, rowIndex }) => {
  const { value } = useCell({ columnIndex, rowIndex })

  return <>{value}</>
}

export default SimpleCell
