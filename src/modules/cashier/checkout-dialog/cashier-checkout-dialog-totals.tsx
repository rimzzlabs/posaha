import { Badge } from '@/components/ui/badge'

import { useCalculateTotals } from '@/app/app/product/__hooks'
import type { TCreateTransactionSchema } from '@/app/app/product/__schema'
import { formatPrice } from '@/lib/number'

import { useFormContext, useWatch } from 'react-hook-form'
import { match } from 'ts-pattern'

export function CashierCheckoutDialogTotals({ cartItems }: { cartItems: Array<TCartProductItem> }) {
  let { totalQuantity, total, calcCustomerMoney } = useCalculateTotals(cartItems)
  let form = useFormContext<TCreateTransactionSchema>()

  let method = useWatch({ control: form.control, name: 'method' })
  let money = useWatch({ control: form.control, name: 'totalAmount' })

  let { change, missing } = calcCustomerMoney({ total, money })

  let paymentMethod = match(method)
    .with('cash', () => 'Uang Kertas')
    .otherwise(() => '-')

  return (
    <div className='rounded-lg bg-muted p-3'>
      <p className='mb-4 text-sm font-semibold'>Informasi Jumlah dan Pembayaran</p>

      <div className='flex flex-col gap-2.5'>
        <div className='flex items-center justify-between text-xs font-medium'>
          <span>Total Produk</span>
          <span>{totalQuantity}</span>
        </div>
        <div className='flex items-center justify-between text-xs font-medium'>
          <span>Metode Pembayaran</span>
          <Badge className='text-xs'>{paymentMethod}</Badge>
        </div>
        <div className='flex items-center justify-between text-xs font-medium'>
          <span>Jumlah Yang Harus Dibayar</span>
          <span>{formatPrice(total)}</span>
        </div>

        <hr className='h-px border-muted-foreground/10' />

        <div className='flex items-center justify-between text-xs font-medium'>
          <span>Uang Pembeli</span>
          <span>{formatPrice(money)}</span>
        </div>

        <div className='flex items-center justify-between text-xs font-medium'>
          <span>Kembalian: </span>
          <span>{formatPrice(change)}</span>
        </div>

        <div className='flex items-center justify-between text-xs font-medium'>
          <span>Kekurangan: </span>
          <span>{formatPrice(missing)}</span>
        </div>
      </div>
    </div>
  )
}
