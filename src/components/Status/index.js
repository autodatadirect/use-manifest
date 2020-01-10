import React from 'react'
import useManifest from '../../hooks/useManifest'

const determineFirstOnPage = (page, pageSize) => Math.max(page * pageSize, 0)

const determineLastOnPage = (page, pageSize, count) => Math.min(determineFirstOnPage(page + 1, pageSize), count)

const renderTotalRecordsMessage = (count, page, pageSize) => {
  const last = determineLastOnPage(page, pageSize, count)
  const first = determineFirstOnPage(page, pageSize) + 1
  return count < 1 ? 'No Results' : `Showing ${first} to ${last} of ${count}`
}

const Status = () => {
  const { page, pageSize, count } = useManifest()

  return (
    <div className='manifest-status'>
      {renderTotalRecordsMessage(count, page, pageSize)}
    </div>
  )
}

Status.propTypes = {
}

export default Status
