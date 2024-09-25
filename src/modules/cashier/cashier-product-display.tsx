'use client'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { For } from '@/components/ui/for'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'

import { cn } from '@/lib/utils'
import { sidebarCartAtom } from '@/states/storage'

import { DataTablePagination } from '../shared/data-table/data-table-pagination'
import { CashierProductDisplayHeader } from './cashier-product-display-header'
import { CashierProductDisplayItem } from './cashier-product-display-item'

import { A, B, N, pipe, S } from '@mobily/ts-belt'
import { useAtomValue } from 'jotai'
import { InboxIcon, TextSearchIcon } from 'lucide-react'
import { Suspense } from 'react'

type TCashierProductDisplay = {
  products: Array<Product>
  page: number
  total: number
  search?: string
}

export function CashierProductDisplay({
  products,
  page,
  total,
  search = '',
}: TCashierProductDisplay) {
  let isSidebarOpen = useAtomValue(sidebarCartAtom)

  let isSearching = pipe(search, S.replaceByRe(/s+/g, ''), S.length, N.gt(0))
  let isProductEmpty = pipe(products, A.length, N.lt(1))
  let isProductAvailable = pipe(isProductEmpty, B.inverse)
  let isProductNotAvailable = pipe(isSearching, B.and(isProductEmpty))

  return (
    <Card className='transition-all'>
      <Suspense fallback={<Skeleton className='h-10 w-full' />}>
        <CashierProductDisplayHeader />
      </Suspense>

      <CardContent>
        {B.ifElse(
          isProductAvailable,
          () => (
            <ScrollArea className='h-[calc(100vh-20rem)]'>
              <div
                className={cn(
                  'grid grid-cols-2 sm:grid-cols-3 xl:gap-2.5 2xl:gap-4 3xl:grid-cols-4',
                  !isSidebarOpen && 'lg:grid-cols-5',
                )}
              >
                <For each={products}>
                  {(product) => <CashierProductDisplayItem {...product} key={product.id} />}
                </For>
              </div>
            </ScrollArea>
          ),
          () => null,
        )}

        {B.ifElse(
          pipe(isProductEmpty, B.and(B.inverse(isSearching))),
          () => (
            <div className='flex h-[calc(100vh-20rem)] flex-col items-center justify-center gap-2 tracking-tight'>
              <InboxIcon size='2rem' className='text-muted-foreground' />
              <p className='text-sm font-semibold text-muted-foreground'>
                Belum ada produk yang tersedia untuk saat ini, harap coba lagi nanti
              </p>
            </div>
          ),
          () => null,
        )}

        {B.ifElse(
          isProductNotAvailable,
          () => (
            <div className='flex h-[calc(100vh-20rem)] flex-col items-center justify-center gap-2 tracking-tight'>
              <TextSearchIcon size='2rem' className='text-muted-foreground' />
              <p className='text-sm font-semibold text-muted-foreground'>
                Produk tersebut tidak tersedia, coba kata kunci yang lain
              </p>
            </div>
          ),
          () => null,
        )}
      </CardContent>

      <CardFooter>
        <DataTablePagination className='p-0' page={page} total={total} />
      </CardFooter>
    </Card>
  )
}
