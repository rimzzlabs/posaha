'use client'

import { For } from '@/components/ui/for'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { cn } from '@/lib/utils'

import { DataTablePagination } from './data-table-pagination'
import { TUseDataTablePagination } from './hooks/use-data-table-pagination'

import { B, F, N, O, Option, pipe } from '@mobily/ts-belt'
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { InboxIcon, Loader2 } from 'lucide-react'
import { Fragment } from 'react'

type TDataTableUI<D> = TPrettify<
  TUseDataTablePagination & {
    data: Option<Array<D>>
    columns: Array<ColumnDef<D, any>>

    className?: string

    isPending?: boolean
    emptyState?: {
      label?: string
      description?: string
    }
  }
>

export function DataTableUI<D>(props: TDataTableUI<D>) {
  let data = pipe(O.fromNullable(props.data), O.mapWithDefault([], F.identity))
  let table = useReactTable({
    data,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    state: {
      pagination: { pageIndex: props.page, pageSize: props.total },
    },
  })

  let headerGroups = table.getHeaderGroups()
  let rows = table.getSortedRowModel().rows
  let displayLoading = Boolean(props.isPending)

  return (
    <Fragment>
      <ScrollArea className={cn('h-[calc(100vh-20.4rem)]', props.className)}>
        <Table>
          <TableHeader>
            <For each={headerGroups}>
              {(headerGroup) => (
                <TableRow>
                  <For each={headerGroup.headers}>
                    {(header) => (
                      <TableHead>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )}
                  </For>
                </TableRow>
              )}
            </For>
          </TableHeader>

          <TableBody>
            {B.ifElse(
              displayLoading,
              () => (
                <TableRow>
                  <TableCell colSpan={table.getLeafHeaders().length}>
                    <div className='h-[calc(100vh-26.875rem)] flex flex-col items-center justify-center gap-2 tracking-tight'>
                      <Loader2 size='2rem' className='text-muted-foreground animate-spin' />
                      <p className='text-sm font-semibold text-muted-foreground'>
                        Memproses permintaan
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ),
              () => null,
            )}

            {B.ifElse(
              pipe(rows.length, N.lt(1), B.and(B.inverse(displayLoading))),
              () => (
                <TableRow>
                  <TableCell colSpan={table.getLeafHeaders().length}>
                    <div className='h-[calc(100vh-26.875rem)] flex flex-col items-center justify-center gap-2 tracking-tight'>
                      <InboxIcon size='2rem' className='text-muted-foreground' />
                      <p className='text-sm font-semibold text-muted-foreground'>
                        {props.emptyState?.description ?? 'Tidak ada daftar produk'}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ),
              () => null,
            )}

            {B.ifElse(
              pipe(rows.length, N.gt(0), B.and(!displayLoading)),
              () => (
                <For each={rows}>
                  {(row) => (
                    <TableRow>
                      <For each={row.getVisibleCells()}>
                        {(cell) => (
                          <TableCell>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        )}
                      </For>
                    </TableRow>
                  )}
                </For>
              ),
              () => null,
            )}
          </TableBody>
        </Table>
      </ScrollArea>

      <DataTablePagination page={props.page} total={props.total} isPending={props.isPending} />
    </Fragment>
  )
}
