import React, { FC } from 'react'
import useStatus from '../../hooks/useStatus'

export interface StatusMessageGeneratorProps {
  count: number
  lastOnPage: number
  firstOnPage: number
  loading: boolean
}

export const DEFAULT_STATUS_MESSAGE_GENERATOR: FC<StatusMessageGeneratorProps> = ({ count, lastOnPage, firstOnPage, loading }) => {
  const counter = `Showing ${firstOnPage} to ${lastOnPage}`
  if (loading && count === null) return 'Loading ...'
  if (count === null) return counter
  if (loading) return `${counter} of ${count}`
  return count < 1 ? 'No Results' : `${counter} of ${count}`
}

export interface StatusProps {
  className?: string
  statusMessageGenerator?: typeof DEFAULT_STATUS_MESSAGE_GENERATOR
}

const Status: FC<StatusProps> = ({ className, statusMessageGenerator = DEFAULT_STATUS_MESSAGE_GENERATOR }) => {
  const { count, lastOnPage, firstOnPage, loading } = useStatus()
  return (
    <div className={'manifest-status' + (className == null ? '' : ' ' + className)}>
      {statusMessageGenerator({ count: count ?? 0, lastOnPage, firstOnPage, loading })}
    </div>
  )
}

export default Status
