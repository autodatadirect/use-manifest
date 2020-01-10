import React from 'react'
import PropTypes from 'prop-types'
import Table from '../Table'
import Controls from '../Controls'
import useManifest from '../../hooks/useManifest'

const DefaultManifestTable = ({ className }) => {
  const { definition, rows, loadingData } = useManifest()

  return (
    <div className={`manifest-table ${className || ''} ${loadingData && 'loading'}`}>
      <Table columnCount={definition.length} rowCount={rows.length} />
      <Controls />
    </div>
  )
}

DefaultManifestTable.propTypes = {
  className: PropTypes.string
}

export default DefaultManifestTable
