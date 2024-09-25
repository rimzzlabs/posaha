'use client'

import { For } from '@/components/ui/for'
import { ScrollArea } from '@/components/ui/scroll-area'

import { sidebarCartProductItemsAtom } from '@/states/storage'

import { CashierSidebarCartProductListItem } from './cashier-sidebar-cart-product-list-item'

import { A, N, pipe } from '@mobily/ts-belt'
import { useAtomValue } from 'jotai'

export function CashierSidebarCartProductList() {
  let productItems = useAtomValue(sidebarCartProductItemsAtom)

  let isProductEmpty = pipe(productItems, A.length, N.lt(1))

  if (isProductEmpty) return null

  return (
    <div className='pb-4'>
      <ScrollArea className='h-[32rem]'>
        <div className='grid gap-2'>
          <For each={productItems}>
            {(args) => <CashierSidebarCartProductListItem key={args.id} {...args} />}
          </For>
        </div>
      </ScrollArea>
    </div>
  )
}
