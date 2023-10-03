import React from 'react'
import SimpleHeader from '../DefaultHeader'
import useHeaderCell from '../../hooks/useHeaderCell'

const HeaderCell = ({ columnIndex }: { columnIndex: number }) => {
  const { headerComponent } = useHeaderCell(columnIndex)
  const Component = (headerComponent != null) || SimpleHeader

  return <Component columnIndex={columnIndex} />
}

export default HeaderCell
