import { useContext } from 'react'
import {Definition, Filter, manifestContext, Row} from '../components/Manifest'
import {ASCENDING, DESCENDING, NOT_SORTED} from "../constants/sortDirections";

export interface Sort {
    id: unknown
    direction: typeof ASCENDING | typeof DESCENDING | typeof NOT_SORTED
}

export interface ManifestContext {
    count: number
    setCount: (count: number) => void
    setLoadingCount: (loading: boolean) => void
    loadingCount: boolean

    rows: Row[]
    setRows: (rows: any[]) => void
    setLoadingRows: (loading: boolean) => void
    loadingRows: boolean

    definition: [Definition]

    setError: (error: any) => void

    pageSize: number
    setPageSize: (pageSize: number) => void

    setSorts: (id: Definition['id'], direction: Sort['direction']) => void
    sorts: [Sort]

    loading: boolean

    setPage: (page: number) => void
    page: number
    filter: Filter
}

export default (): ManifestContext => useContext(manifestContext)
