'use client'

import { For } from '@/components/ui/for'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

import { cn } from '@/lib/utils'

import { DataTablePaginationItem } from './data-table-pagination-item'
import type { TUseDataTablePagination } from './hooks/use-data-table-pagination'
import { useDataTablePagination } from './hooks/use-data-table-pagination'

import { Fragment } from 'react'

type TDataTablePagination = TPrettify<
  TUseDataTablePagination & { isPending?: boolean; className?: string }
>

export function DataTablePagination(props: TDataTablePagination) {
  let pages = useDataTablePagination(props)

  return (
    <Pagination className={cn('justify-start pt-6', props.className)}>
      <PaginationContent>
        {props.isPending && (
          <Fragment>
            <PaginationItem>
              <PaginationPrevious href='#' className='pointer-events-none' />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='#' className='pointer-events-none'>
                1
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href='#' className='pointer-events-none'>
                2
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext href='#' className='pointer-events-none' />
            </PaginationItem>
          </Fragment>
        )}
        {!props.isPending && (
          <For each={pages}>{(args) => <DataTablePaginationItem {...args} {...props} />}</For>
        )}
      </PaginationContent>
    </Pagination>
  )
}
