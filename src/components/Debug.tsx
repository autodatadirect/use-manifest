import React from 'react'
import { useManifestRaw } from '../hooks/useManifest'

export default function<Filter, Row>(): React.JSX.Element {
  const state = useManifestRaw<Filter, Row>()
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
