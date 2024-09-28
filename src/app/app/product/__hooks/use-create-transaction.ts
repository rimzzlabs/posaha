import { formatPrice } from '@/lib/number'
import { checkoutAtom, closeDialogCheckoutAtom, togglePendingCheckoutAtom } from '@/states/checkout'

import { createTransactionAction } from '../__actions'
import { createTransactionSchema, type TCreateTransactionSchema } from '../__schema'
import { useCalculateTotals } from './use-calculate-totals'

import { zodResolver } from '@hookform/resolvers/zod'
import { A, F, O, pipe } from '@mobily/ts-belt'
import { useAtomValue, useSetAtom } from 'jotai'
import { useSession } from 'next-auth/react'
import { toInt } from 'radash'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export function useCreateTransaction() {
  let session = useSession({ required: true })
  let dialogCheckoutState = useAtomValue(checkoutAtom)
  let closeDialogCheckout = useSetAtom(closeDialogCheckoutAtom)
  let togglePendingCheckout = useSetAtom(togglePendingCheckoutAtom)

  let { totalQuantity, total } = useCalculateTotals(dialogCheckoutState.cartItems)

  let userId = pipe(session?.data?.user?.id, O.fromNullable, O.mapWithDefault('', F.identity))
  let cartItems = pipe(
    dialogCheckoutState.cartItems,
    A.map((value) => ({ id: value.id, productId: value.product.id, quantity: value.quantity })),
    F.toMutable,
  )

  let form = useForm<TCreateTransactionSchema>({
    mode: 'all',
    defaultValues: {
      total,
      userId,
      cartItems,
      totalQuantity,
      totalAmount: '' as unknown as number,
    },
    resolver: zodResolver(createTransactionSchema),
  })

  let onSubmit = form.handleSubmit(async (values) => {
    togglePendingCheckout()
    toast.dismiss()
    toast.loading('Memproses permintaan, harap tunggu beberapa saat')
    let res = await createTransactionAction(values)
    if (res?.serverError || res?.validationErrors || !res?.data) {
      return toast.error('Terjadi kesalahan pada server, harap coba beberapa saat lagi')
    }

    if (!res.data.ok) {
      return toast.error(res.data.error)
    }

    let totalAmount = pipe(res.data.data.totalAmount, toInt, formatPrice)
    toast.dismiss()
    togglePendingCheckout()
    closeDialogCheckout()
    toast.success('Transaksi berhasil!', {
      description: `Transaksi dengan jumlah pembayaran sebesar ${totalAmount} berhasil`,
    })
  })

  return { ...form, onSubmit }
}
