import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import SimpleHeader from '../SimpleHeader'
import useColumn from '../../hooks/useColumn'
import createSequentialIntegerArray from '../../utils/createSequentialIntegerArray'

const HeaderCell = ({ columnIndex }) => {
  const { headerComponent: HeaderComponent } = useColumn(columnIndex)

  if (HeaderComponent) return <HeaderComponent columnIndex={columnIndex} />
  return <SimpleHeader columnIndex={columnIndex} />
}

HeaderCell.propTypes = {
  columnIndex: PropTypes.number.isRequired
}

const Headers = ({ className, columnCount }) => {
  const columnIndexArray = useMemo(() => createSequentialIntegerArray(columnCount), [columnCount])

  return (
    <thead className={className || ''}>
      <tr>
        {columnIndexArray.map(i => <th key={i}><HeaderCell columnIndex={i} /></th>)}
      </tr>
    </thead>
  )
}

Headers.propTypes = {
  columnCount: PropTypes.number.isRequired,
  className: PropTypes.string
}

export default Headers
