import React from 'react'
import PropTypes from 'prop-types'
import useCell from '../../hooks/useCell'

const SimpleCell = ({ columnIndex, rowIndex }) => {
  const { value } = useCell({ columnIndex, rowIndex })

  return (
    <>
      {value}
    </>
  )
}

SimpleCell.propTypes = {
  columnIndex: PropTypes.number.isRequired
}

export default SimpleCell
