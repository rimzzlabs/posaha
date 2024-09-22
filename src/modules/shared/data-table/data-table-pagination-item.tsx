import {
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

import { cn } from '@/lib/utils'

import type {
  TUseDataTablePagination,
  TUseDataTablePaginationReturn,
} from './hooks/use-data-table-pagination'

import { useSearchParams } from 'next/navigation'

type TDataTablePaginationItem = TPrettify<TUseDataTablePagination & TUseDataTablePaginationReturn>

export function DataTablePaginationItem(props: TDataTablePaginationItem) {
  let searchParams = useSearchParams()
  let query = Object.fromEntries(searchParams.entries())

  if (props.type === 'hidden') return null

  if (props.type === 'elipsis') {
    return (
      <PaginationItem>
        <PaginationEllipsis />
      </PaginationItem>
    )
  }

  let isFirstPage = props.page === 1
  if (props.type === 'prev') {
    return (
      <PaginationItem>
        <PaginationPrevious
          className={cn(isFirstPage && 'pointer-events-none')}
          href={{ query: { ...query, page: isFirstPage ? 1 : props.page - 1 } }}
        />
      </PaginationItem>
    )
  }

  let isLastPage = props.page === props.total

  if (props.type === 'next') {
    return (
      <PaginationItem>
        <PaginationNext
          className={cn(isLastPage && 'pointer-events-none')}
          href={{ query: { ...query, page: isLastPage ? props.page : props.page + 1 } }}
        />
      </PaginationItem>
    )
  }

  return (
    <PaginationItem>
      <PaginationLink
        isActive={props.page === props.value}
        href={{ query: { ...query, page: props.value } }}
      >
        {props.value}
      </PaginationLink>
    </PaginationItem>
  )
}
