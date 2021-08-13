import React from 'react'
import propTypes from 'prop-types'
import useStatus from '../../hooks/useStatus'

const DEFAULT_STATUS_MESSAGE_GENERATOR = ({ count, lastOnPage, firstOnPage, loading }) => {
  const counter = `Showing ${firstOnPage} to ${lastOnPage}`
  if (loading && count === null) return 'Loading ...'
  if (count === null) return counter
  if (loading) return `${counter} of ${count}`
  return count < 1 ? 'No Results' : `${counter} of ${count}`
}

const Status = ({ className, statusMessageGenerator = DEFAULT_STATUS_MESSAGE_GENERATOR }) => {
  const { count, lastOnPage, firstOnPage, loading } = useStatus()
  return (
    <div className={'manifest-status' + (className ? ' ' + className : '')}>
      {statusMessageGenerator({ count, lastOnPage, firstOnPage, loading })}
    </div>
  )
}

Status.propTypes = {
  statusMessageGenerator: propTypes.func,
  className: propTypes.string
}

export default Status
