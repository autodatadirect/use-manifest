import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import createSequentialIntegerArray from '../../utils/createSequentialIntegerArray'
import Row from '../Row'

const Rows = ({ rowCount, columnCount }) => {
  const rowIndexArray = useMemo(() => createSequentialIntegerArray(rowCount), [rowCount])

  return (
    <tbody>
      {rowIndexArray.map(i => <Row key={i} rowIndex={i} columnCount={columnCount} />)}
    </tbody>
  )
}

Rows.propTypes = {
  rowCount: PropTypes.number.isRequired,
  columnCount: PropTypes.number.isRequired
}

export default Rows
