import React from 'react'
import useManifest from '../hooks/useManifest'

export default function<Filter, Row>() {
  const state = useManifest<Filter, Row>()
  const displayState: any = { ...state }
  delete displayState.rows
  delete displayState.definition
  return (
    <div style={{ textAlign: 'left' }}>
      <h3>useManifest</h3>
      <pre>{JSON.stringify(displayState, null, ' ')}</pre>
    </div>
  )
}
