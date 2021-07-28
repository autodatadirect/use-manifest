
export const determineTotalPages = (pageSize, count) => {
  if (count === null) return null
  return Math.floor(count / pageSize) + (count % pageSize ? 1 : 0)
}

const determinePagesWithoutCount = ({ numberOfPages, currentPage, hasNextPage }) => {
  const pages = []
  const offset = hasNextPage ? 1 : 0
  const firstPage = currentPage - numberOfPages + offset + 1
  const nextPage = currentPage + offset
  for (let i = firstPage; i <= nextPage; i++) {
    if (i >= 0) {
      pages.push(i)
    }
  }
  return pages
}

const determinePagesWithCount = ({ numberOfPages, currentPage, pageSize, count }) => {
  const pages = []
  const totalPages = determineTotalPages(pageSize, count)

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

export const determinePages = ({ numberOfPages, currentPage, pageSize, count, hasNextPage }) => {
  if (count === null) {
    return determinePagesWithoutCount({ numberOfPages, currentPage, hasNextPage })
  }
  return determinePagesWithCount({ numberOfPages, currentPage, pageSize, count })
}
