import React from 'react'
import PropTypes from 'prop-types'
import useManifestData from '../../hooks/useManifestData'

const PagerSizer = ({ filter, changePageSize, loading }) => {
  const { meta, setPageSize } = useManifestData()
  const { pageSize } = meta
  const handlePageSizeChange = ev => setPageSize(+ev.target.value)

  return (
    <select
      className='row-limit form-control form'
      value={pageSize}
      onChange={handlePageSizeChange}
    >
      <option value={10}>Show 10 entries</option>
      <option value={20}>Show 20 entries</option>
      <option value={50}>Show 50 entries</option>
      <option value={100}>Show 100 entries</option>
      <option value={200}>Show 200 entries</option>
    </select>
  )
}

PagerSizer.propTypes = {
}

export default PagerSizer
