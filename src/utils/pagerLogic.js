
export const determineTotalPages = (pageSize, count) => Math.floor(count / pageSize) + (count % pageSize ? 1 : 0)

export const determinePages = (numberOfPages, currentPage, pageSize, count) => {
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
