import React from 'react'
import propTypes from 'prop-types'
import useStatus from '../../hooks/useStatus'

const DEFAULT_STATUS_MESSAGE_GENERATOR = ({ count, lastOnPage, firstOnPage }) => {
  return count < 1 ? 'No Results' : `Showing ${firstOnPage} to ${lastOnPage} of ${count}`
}

const Status = ({ className, statusMessageGenerator = DEFAULT_STATUS_MESSAGE_GENERATOR }) => {
  const { count, lastOnPage, firstOnPage } = useStatus()
  return (
    <div className={'manifest-status' + (className ? ' ' + className : '')}>
      {statusMessageGenerator({ count, lastOnPage, firstOnPage })}
    </div>
  )
}

Status.propTypes = {
  statusMessageGenerator: propTypes.func,
  className: propTypes.string
}

export default Status
