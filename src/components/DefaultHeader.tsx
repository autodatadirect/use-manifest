import React, { FC, useCallback } from 'react'
import useHeaderCell from '../hooks/useHeaderCell'
import { Sort } from '../hooks/useManifest'
import { ASCENDING, DESCENDING } from '../constants/sortDirections'
import { HeaderCellProps } from './DefaultTable/HeaderCell'

const SimpleHeader: FC<HeaderCellProps> = ({ columnIndex }) => {
  const { setSortDirection, label, sortDirection, sortable } = useHeaderCell(columnIndex)

  const handleSort = useCallback(() => {
    if (sortable == null || !sortable) {
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

const sortClass = ({ sortable, sortDirection }: { sortable?: boolean | null, sortDirection?: Sort['direction'] }): string => {
  const classes: string[] = []

  if (sortable != null) {
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
