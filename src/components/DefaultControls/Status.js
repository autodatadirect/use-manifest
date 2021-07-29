import React from 'react'
import propTypes from 'prop-types'
import useStatus from '../../hooks/useStatus'

const DEFAULT_STATUS_MESSAGE_GENERATOR = ({ count, lastOnPage, firstOnPage, loading }) => {
  if (loading) return 'Loading ...'
  if (count == null) return `Showing ${firstOnPage} to ${lastOnPage}`
  return count < 1 ? 'No Results' : `Showing ${firstOnPage} to ${lastOnPage} of ${count}`
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
