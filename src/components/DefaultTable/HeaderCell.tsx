import React from 'react'
import SimpleHeader from '../DefaultHeader'
import useHeaderCell from '../../hooks/useHeaderCell'

const HeaderCell = ({ columnIndex }: { columnIndex: number }): React.JSX.Element => {
  const { headerComponent } = useHeaderCell(columnIndex)
  const Component = headerComponent ?? SimpleHeader

  return <Component columnIndex={columnIndex} />
}

export default HeaderCell
