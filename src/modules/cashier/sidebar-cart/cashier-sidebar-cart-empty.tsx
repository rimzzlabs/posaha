'use client'

import { sidebarCartProductItemsAtom } from '@/states/storage'

import { A, N, pipe } from '@mobily/ts-belt'
import { useAtomValue } from 'jotai'
import { InboxIcon } from 'lucide-react'

export function CashierSidebarCartEmpty() {
  let cartItems = useAtomValue(sidebarCartProductItemsAtom)

  let isCartHasProduct = pipe(cartItems, A.length, N.gt(0))
  if (isCartHasProduct) return null

  return (
    <div className='py-2'>
      <div className='flex h-[28rem] flex-col items-center justify-center gap-2 tracking-tight'>
        <InboxIcon size='2rem' className='text-muted-foreground' />
        <p className='mx-auto max-w-xs text-balance text-center text-sm font-semibold text-muted-foreground'>
          Belum ada produk yang ditambahkan ke keranjang belanja
        </p>
      </div>
    </div>
  )
}
