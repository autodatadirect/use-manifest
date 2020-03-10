import React from 'react'
import PropTypes from 'prop-types'
import SimpleHeader from '../DefaultHeader'
import useHeaderCell from '../../hooks/useHeaderCell'

const HeaderCell = ({ columnIndex }) => {
  const { headerComponent } = useHeaderCell(columnIndex)
  const Component = headerComponent || SimpleHeader

  return <Component columnIndex={columnIndex} />
}

HeaderCell.propTypes = {
  columnIndex: PropTypes.number.isRequired
}

export default HeaderCell
