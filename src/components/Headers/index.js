import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import SimpleHeader from '../SimpleHeader'
import useManifestData from '../../hooks/useManifestData'

const HeaderCell = ({ id, label, sortable, headerComponent }) => {
  const { setSort, meta } = useManifestData()
  const { sort } = meta

  const handleSort = useCallback(() => {
    const isAsc = sort.length && sort[0].id === id ? !sort[0].isAsc : true

    setSort(id, isAsc)
  }, [setSort, id, sort])

  const headerProps = {
    id,
    label: label || id,
    sortable: sortable || false,
    handleSort: sortable ? handleSort : null
  }

  const HeaderComponent = headerComponent
  if (HeaderComponent) return <HeaderComponent {...headerProps} />
  return <SimpleHeader key={headerProps.id} {...headerProps} />
}

HeaderCell.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  sortable: PropTypes.bool,
  headerComponent: PropTypes.func
}

const Headers = ({ className }) => {
  const { definition } = useManifestData()

  return (
    <thead className={className || ''}>
      <tr>
        {definition.map(def => <HeaderCell key={def.id} {...def} />)}
      </tr>
    </thead>
  )
}

Headers.propTypes = {
  className: PropTypes.string
}

export default Headers
