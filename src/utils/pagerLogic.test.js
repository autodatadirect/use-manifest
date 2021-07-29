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
    const d = (numberOfPages, currentPage, pageSize, count, showNext = true) => ({ numberOfPages, currentPage, pageSize, count, showNext })

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

  const r = (count, pageSize, page, rows) => ({ count, pageSize, page, rows })

  const a = (showFirst, showPrevious, showNext, showLast) => ({ showFirst: showFirst, showLast: showLast, showNext: showNext, showPrevious: showPrevious })

  const arr = size => {
    const array = []
    for (var i = 0; i < size; i++) {
      array.push(i)
    }
    return array
  }

  describe('showRelativePages', () => {
    it('determines which pages and actions to show when count is available', () => {
      // if we have count rows don't matter FOR NOW, it will need to refer to notes
      expect(pagerLogic.showRelativePages(r(100, 10, 10, arr(10)))).toEqual(a(true, true, false, false))
      expect(pagerLogic.showRelativePages(r(100, 10, 0, arr(10)))).toEqual(a(false, false, true, true))
      expect(pagerLogic.showRelativePages(r(25, 10, 1, arr(10)))).toEqual(a(false, true, true, false))
      expect(pagerLogic.showRelativePages(r(25, 10, 2, arr(10)))).toEqual(a(true, true, false, false))
    })

    it('works when count is null, showNext is determined by rows.length and pageSize, showLast will always be false', () => {
      expect(pagerLogic.showRelativePages(r(null, 10, 1, arr(10)))).toEqual(a(false, true, true, false))
      expect(pagerLogic.showRelativePages(r(null, 10, 2, arr(9)))).toEqual(a(true, true, false, false))
      expect(pagerLogic.showRelativePages(r(null, 20, 8, arr(20)))).toEqual(a(true, true, true, false))
      expect(pagerLogic.showRelativePages(r(null, 20, 8, arr(10)))).toEqual(a(true, true, false, false))
      expect(pagerLogic.showRelativePages(r(null, 100, 0, arr(80)))).toEqual(a(false, false, false, false))
      expect(pagerLogic.showRelativePages(r(null, 50, 0, arr(50)))).toEqual(a(false, false, true, false))
      expect(pagerLogic.showRelativePages(r(null, 35, 0, arr(35)))).toEqual(a(false, false, true, false))
    })
  })
})
