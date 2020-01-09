import React from 'react'
import useManifest from '../../hooks/useManifest'

export default () => {
  const data = useManifest()
  return (
    <div style={{ textAlign: 'left' }}>
      <h3>useManifest</h3>
      <pre>{JSON.stringify(data, null, ' ')}</pre>
    </div>
  )
}
