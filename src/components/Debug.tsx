import React from 'react'
import useManifest, {ManifestContext} from '../hooks/useManifest'

export default () => {
  const state = useManifest()
  const displayState: Partial<ManifestContext> = { ...state }
  delete displayState.rows
  delete displayState.definition
  return (
    <div style={{ textAlign: 'left' }}>
      <h3>useManifest</h3>
      <pre>{JSON.stringify(displayState, null, ' ')}</pre>
    </div>
  )
}
