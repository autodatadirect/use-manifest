import { Filter, RowType } from './App'

const data = [
  { name: 'Sage Vaillancourt', favoriteColor: '#ff7cab', noShow: 'This should not show in the manifest! It\'s not in the definition!' },
  { name: 'Quade Mashaw', favoriteColor: '#FF9770' },
  { name: 'Nik Culvey', favoriteColor: '#5D3FD3' },
  { name: 'Michael Mezzina', favoriteColor: '#6DC0DE' },
  { name: 'Tam Nguyen', favoriteColor: '#123ADD' },
  { name: 'Chris Gamache', favoriteColor: '#ADD123' },
  { name: 'Fernando Batista', favoriteColor: '#E4C4FF' },

  { name: 'Redd Fox', favoriteColor: 'Red' },
  { name: 'Blue Ivy Carter', favoriteColor: 'Blue' },
  { name: 'Darrell Green', favoriteColor: 'Green' },
  { name: 'Rebecca Black', favoriteColor: 'Black' }
]

async function query (filter: Filter): Promise<RowType[]> {
  return data.filter(filter)
}

const mockDb = {
  query
}

export default mockDb
