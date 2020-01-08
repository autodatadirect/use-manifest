import React from 'react'
import PropTypes from 'prop-types'
import Headers from '../Headers'
import Controls from '../Controls'
import Rows from '../Rows'
import Debug from '../Debug'

const Manifest = ({ className }) =>
  <div className={`manifest-table ${className || ''}`}>
    <table>
      <Headers />
      <Rows />
      <tfoot />
    </table>
    <Controls />
    <Debug />
  </div>

Manifest.propTypes = {
  className: PropTypes.string
}

export default Manifest
