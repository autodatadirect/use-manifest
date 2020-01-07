import React from 'react'
import useManifestData from '../../hooks/useManifestData'

export default () => {
  const data = useManifestData()
  return (
    <div style={{ textAlign: 'left' }}>
      <h3>useManifestData</h3>
      <pre>{JSON.stringify(data, null, ' ')}</pre>
    </div>
  )
}
