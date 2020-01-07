import React from 'react'
import PropTypes from 'prop-types'
import useManifestData from '../../hooks/useManifestData'

const determineFirstOnPage = (page, pageSize) => Math.max((page - 1) * pageSize, 0)

const determineLastOnPage = (page, pageSize, count) => Math.min(determineFirstOnPage(page + 1, pageSize), count)

const renderTotalRecordsMessage = (count, page, pageSize, error) => {
  if (error) return error
  const last = determineLastOnPage(page, pageSize, count)
  const first = determineFirstOnPage(page, pageSize) + 1
  return count < 1 ? 'No Results' : `Showing ${first} to ${last} of ${count}`
}

const Status = ({ loadingCount, error }) => {
  const { meta, count } = useManifestData()
  const { page, pageSize } = meta

  return (
    <div className={'manifest-status' + (error ? ' manifest-error' : '')}>
      {renderTotalRecordsMessage(count, page, pageSize, error)}
    </div>
  )
}

Status.propTypes = {
}

export default Status
