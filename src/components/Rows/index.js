import React from 'react'
import PropTypes from 'prop-types'
import useManifestData from '../../hooks/useManifestData'
import Row from '../Row'

const mapRow = row =>
  <Row key={row.id} {...row} />

export default () => {
  const { rows } = useManifestData()

  return (
    <tbody>
      {rows.map(mapRow)}
    </tbody>
  )
}
