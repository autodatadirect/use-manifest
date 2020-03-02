import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import useColumn from '../hooks/useHeaderCell'

const SimpleHeader = ({ columnIndex }) => {
  const { setSorts, sorts, id, label } = useColumn(columnIndex)

  const handleSort = useCallback(() => {
    const isAsc = sorts.length && sorts[0].id === id ? !sorts[0].isAsc : true

    setSorts(id, isAsc)
  }, [setSorts, id, sorts])

  return (
    <div onClick={handleSort}>
      {label}
    </div>
  )
}

SimpleHeader.propTypes = {
  columnIndex: PropTypes.number.isRequired
}

export default SimpleHeader
