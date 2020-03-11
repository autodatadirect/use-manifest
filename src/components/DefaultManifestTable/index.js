import React from 'react'
import PropTypes from 'prop-types'
import Table from './Table'
import Controls from './Controls'
import useManifest from '../../hooks/useManifest'

const EMPTY_PROPS = {}
const EMPTY_PROPS_HANDLER = () => EMPTY_PROPS

const computeClasses = ({ className = '', loadingRows, loadingCount }) => {
  let s = className
  if (loadingCount || loadingRows) s += ' loading'
  return s
}

const DefaultManifestTable = ({ className, trPropsHandler = EMPTY_PROPS_HANDLER, tdPropsHandler = EMPTY_PROPS_HANDLER }) => {
  const { definition, rows, loadingRows, loadingCount } = useManifest()
  const finalClassName = computeClasses({ className, loadingRows, loadingCount })
  return (
    <>
      <Table className={finalClassName} columnCount={definition.length} rowCount={rows.length} trPropsHandler={trPropsHandler} tdPropsHandler={tdPropsHandler} />
      <Controls />
    </>
  )
}

DefaultManifestTable.propTypes = {
  className: PropTypes.string,
  trPropsHandler: PropTypes.func,
  tdPropsHandler: PropTypes.func
}

export default DefaultManifestTable
