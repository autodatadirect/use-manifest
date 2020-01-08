import React from 'react'
import PropTypes from 'prop-types'
import useManifestData from '../../hooks/useManifestData'

const Cell = ({ value }) => <td>{value}</td>

const mapCell = row => def => {
  const cellProps = {
    key: def.id,
    value: row[def.id],
    ...row
  }

  if (def.cellComponent) return <def.cellComponent {...cellProps} />
  return <Cell {...cellProps} />
}

const Row = props => {
  const { definition } = useManifestData()

  return (
    <tr>
      {definition.map(mapCell(props))}
    </tr>
  )
}

Row.propTypes = {
}

Cell.propTypes = {
}

export default Row
