import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import useHeaderCell from '../hooks/useHeaderCell'
import { ASCENDING, DESCENDING } from '../constants/sortDirections'

const SimpleHeader = ({ columnIndex }) => {
  const { setSortDirection, label, sortDirection, sortable } = useHeaderCell(columnIndex)

  const handleSort = useCallback(() => {
    if (!sortable) {
      return
    }

    setSortDirection(sortDirection !== ASCENDING ? ASCENDING : DESCENDING)
  }, [sortable, sortDirection, setSortDirection])

  return (
    <div className={sortClass({ sortable, sortDirection })} onClick={handleSort}>
      {label}
    </div>
  )
}

SimpleHeader.propTypes = {
  columnIndex: PropTypes.number.isRequired
}

const sortClass = ({ sortable, sortDirection }) => {
  const classes = []

  if (sortable) {
    classes.push('sortable')
  }

  if (sortDirection === ASCENDING) {
    classes.push('sorted')
    classes.push('sorted-asc')
  } else if (sortDirection === DESCENDING) {
    classes.push('sorted')
    classes.push('sorted-desc')
  }

  return classes.join(' ')
}

export default SimpleHeader
