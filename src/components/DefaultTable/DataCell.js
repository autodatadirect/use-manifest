import React from 'react'
import PropTypes from 'prop-types'
import SimpleCell from '../DefaultCell'
import useCell from '../../hooks/useCell'

const Cell = ({ columnIndex, rowIndex }) => {
  const { def } = useCell({ columnIndex, rowIndex })
  const Component = def.cellComponent || SimpleCell

  return <Component columnIndex={columnIndex} rowIndex={rowIndex} />
}

Cell.propTypes = {
  columnIndex: PropTypes.number.isRequired,
  rowIndex: PropTypes.number.isRequired
}

export default Cell
