import React from 'react'
import usePager from '../../hooks/usePager'

export default () => {
  const { pageSize, setPageSize } = usePager()
  const handlePageSizeChange = ev => setPageSize(+ev.target.value)

  return (
    <select
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
