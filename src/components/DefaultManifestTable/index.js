import React from 'react'
import PropTypes from 'prop-types'
import Table from './Table'
import Controls from './Controls'
import useManifest from '../../hooks/useManifest'

const computeClasses = ({ className = '', loadingRows, loadingCount }) => {
  let s = className
  if (loadingCount || loadingRows) s += ' loading'
  return s
}

const DefaultManifestTable = ({ className }) => {
  const { definition, rows, loadingRows, loadingCount } = useManifest()
  const finalClassName = computeClasses({ className, loadingRows, loadingCount })
  return (
    <>
      <Table className={finalClassName} columnCount={definition.length} rowCount={rows.length} />
      <Controls />
    </>
  )
}

DefaultManifestTable.propTypes = {
  className: PropTypes.string
}

export default DefaultManifestTable
