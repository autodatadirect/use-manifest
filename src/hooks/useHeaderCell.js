import { useMemo } from 'react'
import useManifest from './useManifest'

export default (index) => {
  const { definition, setSorts, sorts, loading } = useManifest()
  const def = definition[index]
  const columnSort = useMemo(() => sorts.find(s => s.id === def.id), [sorts, def])

  return {
    ...def,
    loading,
    sorts,
    setSorts,
    columnSort
  }
}
