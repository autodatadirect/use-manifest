import React, { FC, ReactNode } from 'react'
import { getColorType, ColorType, useOnce, sleep } from './util'
import db from './db'
import {
  CountFetcher,
  DefaultChildren,
  Manifest,
  RowFetcher as BareRowFetcher,
  RowType as BareRowType,
  useManifest as useBareManifest
} from 'use-manifest'

export type RowType = BareRowType<typeof definition>

export type Filter = (row: RowType) => boolean

export type RowFetcher = BareRowFetcher<Filter, typeof definition>

export const useManifest = useBareManifest<typeof definition, Filter>

const ColorSquare: FC<{ color: string }> = ({ color }) =>
  <div style={{ textAlign: 'center' }}>
  <span
    title={color} style={{
      backgroundColor: color,
      minHeight: '20px',
      margin: '0.4em',
      minWidth: '20px',
      border: '1px solid black',
      display: 'inline-block',
      marginRight: '3px'
    }}
  />
  </div>

const ColorCell = ({ rowIndex }: { rowIndex: number }): ReactNode => {
  const row = useManifest().rows[rowIndex]
  return <ColorSquare color={row.favoriteColor?.toString() ?? 'white'} />
}

// Note that the definition array needs this `as const`, and should not be explicitly typed!
// Otherwise the type system loses all the juicy bits about the actual values like `id`
const definition = [
  {
    id: 'name',
    label: 'Full Name',
    sortable: true
  },
  {
    id: 'favoriteColor',
    label: 'Favorite Color',
    cellComponent: ColorCell,
    headerComponent: () =>
      <>
        <span style={{ color: 'blue' }}>Favorite </span>
        <span style={{ color: 'red' }}>Color(s)</span>
      </>
  }
  // Uncommenting this will add a new field to the type expected from a RowFetcher.
  // Since fetchRows() isn't supplying this new field, there will be a compilation error!
  // { id: 'greeting' }
] as const

const fetchRows: RowFetcher = async (filter, props) => {
  if (props === undefined) {
    return []
  }
  await sleep(400)
  const start = props.page * props.pageSize
  const end = start + props.pageSize
  return (await db.query(filter)).slice(start, end)
}

const fetchCount: CountFetcher<any> = async (filter: any): Promise<number> => {
  await sleep(200)
  return (await db.query(filter)).length
}

const FilterSelect: FC = () => {
  const manifest = useManifest()
  console.log('manifest', manifest)

  const colorFilter = (colorType: ColorType): void => {
    manifest.setFilter(row => {
      if (colorType === ColorType.Any) {
        return true
      }
      return getColorType(row.favoriteColor?.toString() ?? 'white') === colorType
    })
  }

  useOnce(() => colorFilter(ColorType.Any))

  return (
    <div style={{ backgroundColor: '#ddd', textAlign: 'center', marginBottom: '1em' }}>
      Filter by type:
      <select onChange={e => colorFilter(parseInt(e.target.value) as ColorType)}
              style={{ margin: '0.5em'}}>
        <option value={ColorType.Any}>All Colors</option>
        <option value={ColorType.Reddish}>Reddish</option>
        <option value={ColorType.Greenish}>Greenish</option>
        <option value={ColorType.Bluish}>Bluish</option>
        <option value={ColorType.Grayish}>Grayish</option>
      </select>
    </div>
  )
}

// TODO: Don't use DefaultChildren here - actual dependent projects should not.
const App: FC = () =>
  <div className='App' style={{ width: '300px', padding: '20px', backgroundColor: '#f5f5f5', margin: '40px' }}>
    <Manifest fetchRows={fetchRows} fetchCount={fetchCount} definition={definition} autoLoad>
      <FilterSelect />
      <DefaultChildren />
    </Manifest>
  </div>

export default App
