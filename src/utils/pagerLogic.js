
export const determineTotalPages = (pageSize, count) => Math.floor(count / pageSize) + (count % pageSize ? 1 : 0)

export const determinePages = (currentPage, pageSize, count) => {
  const pages = []
  const totalPages = determineTotalPages(pageSize, count)

  for (let i = currentPage - 1; i <= currentPage + 3; i++) {
    if (i > 0 && i <= totalPages) {
      pages.push(i)
    }
  }
  return pages
}

export const determineNextPage = (pageRequested, pageSize, count) => {
  const totalPages = determineTotalPages(pageSize, count)

  return pageRequested <= totalPages ? pageRequested : totalPages
}
