import { A, F, N, O, pipe } from '@mobily/ts-belt'
import { InboxIcon } from 'lucide-react'

export function CashierSidebarCartEmpty(props: { cartItems: Array<TCartProductItem> }) {
  let isCartHasProduct = pipe(
    props?.cartItems,
    O.fromNullable,
    O.mapWithDefault([], F.identity),
    A.length,
    N.gt(0),
  )

  if (isCartHasProduct) return null

  return (
    <div className='py-2'>
      <div className='flex h-[34.5rem] flex-col items-center justify-center gap-2 tracking-tight'>
        <InboxIcon size='2rem' className='text-muted-foreground' />
        <p className='mx-auto max-w-xs text-balance text-center text-sm font-semibold text-muted-foreground'>
          Belum ada produk yang ditambahkan ke keranjang belanja
        </p>
      </div>
    </div>
  )
}
