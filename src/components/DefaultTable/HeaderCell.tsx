import React, { FC } from 'react'
import SimpleHeader from '../DefaultHeader'
import useHeaderCell from '../../hooks/useHeaderCell'

export interface HeaderCellProps {
  columnIndex: number
}

const HeaderCell: FC<HeaderCellProps> = ({ columnIndex }) => {
  const { headerComponent } = useHeaderCell(columnIndex)
  const Component = headerComponent ?? SimpleHeader

  return <Component columnIndex={columnIndex} />
}

export default HeaderCell
