import React from 'react'
import PropTypes from 'prop-types'
import Table from './Table'
import useManifest from '../../hooks/useManifest'

const EMPTY_PROPS = {}
const EMPTY_PROPS_HANDLER = () => EMPTY_PROPS

const computeClasses = ({ className = '', loadingRows, loadingCount }) => {
  let s = className
  if (loadingCount || loadingRows) s += ' loading'
  return s
}

const DefaultTable = ({ className, trPropsHandler = EMPTY_PROPS_HANDLER, tdPropsHandler = EMPTY_PROPS_HANDLER }) => {
  const { definition, rows, loadingRows, loadingCount } = useManifest()
  const finalClassName = computeClasses({ className, loadingRows, loadingCount })
  return (
    <Table className={finalClassName} columnCount={definition.length} rowCount={rows.length} trPropsHandler={trPropsHandler} tdPropsHandler={tdPropsHandler} />
  )
}

DefaultTable.propTypes = {
  className: PropTypes.string,
  trPropsHandler: PropTypes.func,
  tdPropsHandler: PropTypes.func
}

export default DefaultTable
