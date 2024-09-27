import { NEXT_PUBLIC_TAX_FEE } from '@/lib/configs/environment-client'
import { formatPrice } from '@/lib/number'

import { A, F, N, O, pipe } from '@mobily/ts-belt'
import { toFloat } from 'radash'

const TAX = toFloat(NEXT_PUBLIC_TAX_FEE, 0)

export function CashierSidebarCartTotals(props: { cartItems: Array<TCartProductItem> }) {
  let cartItems = pipe(props?.cartItems, O.fromNullable, O.mapWithDefault([], F.identity))
  let taxPercentage = pipe(TAX, N.multiply(100))
  let productQtys = pipe(
    cartItems,
    A.reduce(0, (qty, { quantity }) => N.add(qty, quantity)),
  )
  let productSubTotals = pipe(
    cartItems,
    A.reduce(0, (subTotal, { quantity, product }) =>
      pipe(subTotal, N.add(pipe(product.price, N.multiply(quantity)))),
    ),
  )
  let productTotals = pipe(
    cartItems,
    A.map(({ quantity, product }) =>
      pipe(product.price, N.multiply(quantity), (subtotal) =>
        N.add(subtotal, N.multiply(subtotal, TAX)),
      ),
    ),
    A.reduce(0, (total, sub) => pipe(total, N.add(sub))),
  )

  return (
    <div className='rounded-lg bg-muted p-3'>
      <p className='mb-4 text-sm font-semibold'>Informasi Barang Belanja</p>

      <div className='flex flex-col gap-2.5'>
        <div className='flex items-center justify-between text-xs font-medium'>
          <span>Jumlah Produk</span>
          <span>{productQtys}</span>
        </div>
        <div className='flex items-center justify-between text-xs font-medium'>
          <span>Jumlah Pajak</span>
          <span>{taxPercentage}% PPh</span>
        </div>
        <div className='flex items-center justify-between text-xs font-medium'>
          <span>Sub Total</span>
          <span>{formatPrice(productSubTotals)}</span>
        </div>

        <hr className='h-px border-muted-foreground/10' />

        <div className='flex items-center justify-between text-xs font-medium'>
          <span>Total Pembelian</span>
          <span>{formatPrice(productTotals)}</span>
        </div>
      </div>
    </div>
  )
}
