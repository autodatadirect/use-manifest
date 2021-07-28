import * as pagerLogic from './pagerLogic'

describe('pagerLogic', () => {
  describe('determineTotalPages', () => {
    it('calculates the total pages', () => {
      expect(pagerLogic.determineTotalPages(10, 100)).toBe(10)
      expect(pagerLogic.determineTotalPages(1, 100)).toBe(100)
      expect(pagerLogic.determineTotalPages(10, 1)).toBe(1)
      expect(pagerLogic.determineTotalPages(20, 100)).toBe(5)
      expect(pagerLogic.determineTotalPages(20, 101)).toBe(6)
      expect(pagerLogic.determineTotalPages(10, 0)).toBe(0)
      expect(pagerLogic.determineTotalPages(10, null)).toBe(null)
    })
  })

  describe('determinePages', () => {
    const d = (numberOfPages, currentPage, pageSize, count, hasNextPage = true) => ({ numberOfPages, currentPage, pageSize, count, hasNextPage })

    it('returns an array', () => {
      expect(typeof pagerLogic.determinePages(3, 0, 10, 100).map).toBeTruthy()
    })
    it('with length = numberOfPages if numberOfPages < total pages', () => {
      expect(pagerLogic.determinePages(d(3, 0, 10, 100)).length).toBe(3)
      expect(pagerLogic.determinePages(d(5, 0, 10, 100)).length).toBe(5)
      expect(pagerLogic.determinePages(d(4, 0, 10, 100)).length).toBe(4)
      expect(pagerLogic.determinePages(d(6, 0, 10, 100)).length).toBe(6)
    })

    it('with length = total pages if numberOfPages > total pages', () => {
      expect(pagerLogic.determinePages(d(3, 0, 10, 20)).length).toBe(2)
      expect(pagerLogic.determinePages(d(5, 0, 10, 30)).length).toBe(3)
      expect(pagerLogic.determinePages(d(4, 0, 10, 30)).length).toBe(3)
    })

    it('with integers representing the page indexes, with equal number of pages on either side of currentPage', () => {
      expect(pagerLogic.determinePages(d(3, 5, 10, 100))).toEqual([4, 5, 6])
      expect(pagerLogic.determinePages(d(5, 5, 10, 100))).toEqual([3, 4, 5, 6, 7])
      expect(pagerLogic.determinePages(d(4, 5, 10, 100))).toEqual([4, 5, 6, 7])
    })

    it('with integers representing the page indexes, with equal number of pages on either side of currentPage', () => {
      expect(pagerLogic.determinePages(d(3, 0, 10, 100))).toEqual([0, 1, 2])
      expect(pagerLogic.determinePages(d(3, 10, 10, 100))).toEqual([7, 8, 9])
      expect(pagerLogic.determinePages(d(5, 8, 10, 100))).toEqual([5, 6, 7, 8, 9])
      expect(pagerLogic.determinePages(d(5, 1, 10, 100))).toEqual([0, 1, 2, 3, 4])
      expect(pagerLogic.determinePages(d(4, 1, 10, 100))).toEqual([0, 1, 2, 3])
      expect(pagerLogic.determinePages(d(4, 9, 10, 100))).toEqual([6, 7, 8, 9])
    })

    it('shows one page forward when count is null', () => {
      expect(pagerLogic.determinePages(d(5, 0, 10, null))).toEqual([0, 1])
      expect(pagerLogic.determinePages(d(5, 1, 10, null))).toEqual([0, 1, 2])
      expect(pagerLogic.determinePages(d(5, 200, 10, null))).toEqual([197, 198, 199, 200, 201])
      expect(pagerLogic.determinePages(d(3, 0, 3, null))).toEqual([0, 1])
      expect(pagerLogic.determinePages(d(3, 10, 3, null))).toEqual([9, 10, 11])
    })

    it('handles last page without count', () => {
      expect(pagerLogic.determinePages(d(5, 10, 10, null, false))).toEqual([6, 7, 8, 9, 10])
      expect(pagerLogic.determinePages(d(6, 2, 3, null, false))).toEqual([0, 1, 2])
      expect(pagerLogic.determinePages(d(5, 0, 10, null, false))).toEqual([0])
    })
  })
})

// const d = (numberOfPages, currentPage, pageSize, count)
