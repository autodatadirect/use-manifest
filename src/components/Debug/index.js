import React from 'react'
import useManifest from '../../hooks/useManifest'

export default () => {
  const state = useManifest()
  console.log('DEBUG RENDER', state)
  return (
    <div style={{ textAlign: 'left' }}>
      <h3>useManifest</h3>
      <pre>{JSON.stringify(state, null, ' ')}</pre>
    </div>
  )
}
