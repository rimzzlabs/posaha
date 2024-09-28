'use client'

import { useCalculateTotals } from '@/app/app/product/__hooks'
import { formatPrice } from '@/lib/number'

export function CashierSidebarCartTotals(props: { cartItems: Array<TCartProductItem> }) {
  let { totalQuantity, subTotal, taxPercentage, total } = useCalculateTotals(props.cartItems)

  return (
    <div className='rounded-lg bg-muted p-3'>
      <p className='mb-4 text-sm font-semibold'>Informasi Barang Belanja</p>

      <div className='flex flex-col gap-2.5'>
        <div className='flex items-center justify-between text-xs font-medium'>
          <span>Jumlah Produk</span>
          <span>{totalQuantity}</span>
        </div>
        <div className='flex items-center justify-between text-xs font-medium'>
          <span>Jumlah Pajak</span>
          <span>{taxPercentage}% PPh</span>
        </div>
        <div className='flex items-center justify-between text-xs font-medium'>
          <span>Sub Total</span>
          <span>{formatPrice(subTotal)}</span>
        </div>

        <hr className='h-px border-muted-foreground/10' />

        <div className='flex items-center justify-between text-xs font-medium'>
          <span>Total Pembelian</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  )
}
