import React from 'react'
import Table, {TableRowProps} from './Table'
import useManifest from '../../hooks/useManifest'

const EMPTY_PROPS = {}
const EMPTY_PROPS_HANDLER = () => EMPTY_PROPS

const computeClasses = ({ className = '', loadingRows }: { className?: string, loadingRows?: boolean }) => {
  let s = className
  if (loadingRows) s += ' loading'
  return s
}

export interface DefaultTableProps<Row> {
  className?: string
  trPropsHandler?: TableRowProps<Row>['trPropsHandler']
  tdPropsHandler?: TableRowProps<Row>['tdPropsHandler']
}

function DefaultTable<Row>({ className, trPropsHandler = EMPTY_PROPS_HANDLER, tdPropsHandler = EMPTY_PROPS_HANDLER }: DefaultTableProps<Row>) {
  const {definition, rows, loadingRows} = useManifest()
  const finalClassName = computeClasses({className, loadingRows})
  return (
    <Table className={finalClassName} columnCount={definition.length} rowCount={rows.length}
           trPropsHandler={trPropsHandler} tdPropsHandler={tdPropsHandler}/>
  )
}

export default DefaultTable
