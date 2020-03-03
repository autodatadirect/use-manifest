import { useMemo, useCallback } from 'react'
import useManifest from './useManifest'
import { NOT_SORTED } from '../constants/sortDirections'

export default (index) => {
  const { definition, setSorts, sorts, loading } = useManifest()
  const def = definition[index]
  const sort = useMemo(() => sorts.find(s => s.id === def.id), [sorts, def])
  const sortDirection = !sort ? NOT_SORTED : sort.direction

  const setSortDirection = useCallback(direction => {
    setSorts(def.id, direction)
  }, [def, setSorts])

  return {
    ...def,
    loading,
    sortDirection,
    setSortDirection
  }
}
