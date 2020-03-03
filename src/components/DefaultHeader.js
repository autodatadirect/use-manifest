import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import useHeaderCell from '../hooks/useHeaderCell'

const SimpleHeader = ({ columnIndex }) => {
  const { setSorts, id, label, columnSort, sortable } = useHeaderCell(columnIndex)

  const handleSort = useCallback(() => {
    if (!sortable) {
      return
    }

    const isAsc = columnSort ? !columnSort.isAsc : true

    setSorts(id, isAsc)
  }, [setSorts, id, columnSort])

  return (
    <div className={sortClass({ sortable, columnSort })} onClick={handleSort}>
      {label}
    </div>
  )
}

SimpleHeader.propTypes = {
  columnIndex: PropTypes.number.isRequired
}

const sortClass = ({ sortable, columnSort }) => {
  const classes = []

  if (sortable) {
    classes.push('sortable')
  }

  if (columnSort && columnSort.isAsc) {
    classes.push('sorted')
    classes.push('sorted-asc')
  } else if (columnSort && !columnSort.isAsc) {
    classes.push('sorted')
    classes.push('sorted-desc')
  }

  return classes.join(' ')
}

export default SimpleHeader
