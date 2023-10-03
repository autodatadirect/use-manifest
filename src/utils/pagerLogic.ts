export const determineTotalPages = (pageSize: number, count: number | null): number | null => {
  if (count === null) return null
  return Math.floor(count / pageSize) + (count % ((pageSize === 0) ? 1 : 0))
}

const determinePagesWithoutCount = (numberOfPages: number, currentPage: number, showNext: boolean): number[] => {
  const pages: number[] = []
  const offset = showNext ? 1 : 0
  const firstPage = currentPage - numberOfPages + offset + 1
  const nextPage = currentPage + offset
  for (let i = firstPage; i <= nextPage; i++) {
    if (i >= 0) {
      pages.push(i)
    }
  }
  return pages
}

const determinePagesWithCount = (numberOfPages: number, currentPage: number, pageSize: number, count: number): number[] => {
  const pages: number[] = []
  const totalPages = determineTotalPages(pageSize, count) as number

  let firstPage = currentPage - Math.floor((numberOfPages - 1) / 2)
  let lastPage = currentPage + Math.ceil((numberOfPages - 1) / 2)

  if (lastPage > totalPages - 1) {
    const diff = totalPages - 1 - lastPage
    lastPage += diff
    firstPage += diff
  }

  if (firstPage < 0) {
    const diff = 0 - firstPage
    lastPage += diff
    firstPage += diff
  }

  for (let i = firstPage; i <= lastPage; i++) {
    if (i < totalPages) {
      pages.push(i)
    }
  }

  return pages
}

export interface DeterminePagesProps {
  numberOfPages: number
  currentPage: number
  pageSize: number
  count: number | null
  showNext: boolean
}

export const determinePages = ({ numberOfPages, currentPage, pageSize, count, showNext }: DeterminePagesProps): number[] => {
  if (count === null) {
    return determinePagesWithoutCount(numberOfPages, currentPage, showNext)
  }
  return determinePagesWithCount(numberOfPages, currentPage, pageSize, count)
}

type ShowRelativePages = (props: {
  count: number | null
  pageSize: number
  page: number
  rows: any[]
}) => {
  showLast: boolean
  showFirst: boolean
  showNext: any
  showPrevious: boolean
}

export const showRelativePages: ShowRelativePages = ({ count, pageSize, page, rows }) => {
  let showNext
  let showLast

  if (count === null) {
    showNext = rows.length === pageSize
    showLast = false
  } else {
    const totalPages = Math.ceil(count / pageSize)
    showNext = (count > (page + 1) * pageSize)
    showLast = (page) < totalPages - 2
  }

  return {
    showFirst: page > 1,
    showPrevious: page > 0,
    showNext,
    showLast: showNext && showLast
  }
}
