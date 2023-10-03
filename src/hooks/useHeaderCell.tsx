import { useMemo, useCallback } from 'react'
import useManifest, { ManifestContext, Sort } from './useManifest'
import { NOT_SORTED } from '../constants/sortDirections'
import { Definition } from '../components/Manifest'

export interface HeaderCell {
  loading: ManifestContext<any, any>['loading']
  sortDirection: Sort['direction']
  setSortDirection: (direction: Sort['direction']) => void
}

export default (index: number): HeaderCell & Definition => {
  const { definition, setSorts, sorts, loading } = useManifest()
  const def = definition[index]
  const sort = useMemo(() => sorts.find(s => s.id === def.id), [sorts, def])
  const sortDirection = !sort ? NOT_SORTED : sort.direction

  const setSortDirection = useCallback((direction: Sort['direction']) => {
    setSorts(def.id, direction)
  }, [def, setSorts])

  return {
    ...def,
    loading,
    sortDirection,
    setSortDirection
  }
}
