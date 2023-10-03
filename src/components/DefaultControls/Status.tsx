import React from 'react'
import useStatus from '../../hooks/useStatus'

export interface StatusMessageGeneratorProps {
  count: number
  lastOnPage: number
  firstOnPage: number
  loading: boolean
}

export const DEFAULT_STATUS_MESSAGE_GENERATOR = ({ count, lastOnPage, firstOnPage, loading }: StatusMessageGeneratorProps) => {
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

const Status = ({ className, statusMessageGenerator = DEFAULT_STATUS_MESSAGE_GENERATOR }: StatusProps) => {
  const { count, lastOnPage, firstOnPage, loading } = useStatus()
  return (
    <div className={'manifest-status' + (className ? ' ' + className : '')}>
      {statusMessageGenerator({ count, lastOnPage, firstOnPage, loading })}
    </div>
  )
}

export default Status
