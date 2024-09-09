export type TUseDataTablePagination = {
  page: number
  total: number
}

export type TUseDataTablePaginationReturn = {
  index: number
  value: number
  type: 'elipsis' | 'next' | 'prev' | 'hidden' | 'page'
}

export function useDataTablePagination(params: TUseDataTablePagination) {
  let { page, total } = params
  if (typeof total !== 'number') {
    throw new Error('total page of DataTablePagination is required')
  }
  if (total < 0) {
    throw new Error('total page of DataTablePagination should be greater than 0')
  }
  let hasElipsis = total >= 9

  return Array.from(Array(total + 2))
    .map((_, index) => index)
    .map<TUseDataTablePaginationReturn>((value, index, self) => {
      let prevButton = value === 0
      let nextButton = value === self[self.length - 1]
      if (prevButton) return { index, value, type: 'prev' }
      if (nextButton) return { index, value, type: 'next' }

      let leftElipsis = self[2]
      let lastSixPage = self.slice(-7, -1)
      let firstLastSixPage = lastSixPage[0] ?? 0
      let rightElipsis = lastSixPage[lastSixPage.length - 2]

      let asElipsis =
        (hasElipsis && page >= 5 && value === leftElipsis) ||
        (hasElipsis && page <= firstLastSixPage && value === rightElipsis)
      if (asElipsis) return { index, value, type: 'elipsis' }

      let firstPage = self[1]
      let lastPage = self[self.length - 2]

      let middlePage = page >= 5 && page <= firstLastSixPage

      let middleLeftSibling = self[page - 1] === value
      let middleRightSibling = self[page + 1] === value
      let isHiddenBeforeCurrentPage =
        page < 5 && value > 5 && value !== lastPage && value !== rightElipsis && !nextButton
      let isHiddenAfterCurrentPage =
        page > firstLastSixPage &&
        value <= firstLastSixPage &&
        value !== firstPage &&
        value !== leftElipsis &&
        !prevButton

      let isHiddenMiddlePage =
        middlePage &&
        value !== page &&
        !prevButton &&
        !nextButton &&
        !middleLeftSibling &&
        !middleRightSibling &&
        value !== leftElipsis &&
        value !== rightElipsis &&
        value !== lastPage &&
        value !== firstPage

      let hiddenPages =
        hasElipsis && (isHiddenBeforeCurrentPage || isHiddenMiddlePage || isHiddenAfterCurrentPage)

      if (hiddenPages) return { index, value, type: 'hidden' }

      return { index, value, type: 'page' }
    })
}
