'use client'

import { Button } from '@/components/ui/button'

import { addOrAppendToCartAction } from '@/app/app/product/__actions'

import { B, F, N, O, pipe } from '@mobily/ts-belt'
import { Loader2Icon, PlusIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useAction } from 'next-safe-action/hooks'
import { toast } from 'sonner'
import { match } from 'ts-pattern'

export function CashierProductDisplayItemButton(props: { productId: string; stock: number }) {
  let session = useSession()
  let addOrAppendToCart = useAction(addOrAppendToCartAction)

  let userId = pipe(session.data?.user?.id, O.fromNullable)
  let isOutOfStock = pipe(props.stock, N.lte(0))
  let isButtonDisabled = pipe(
    session.status,
    F.equals('loading'),
    B.or(!userId),
    B.or(addOrAppendToCart.isExecuting),
    B.or(addOrAppendToCart.isPending),
  )
  let buttonIcon = match(isButtonDisabled)
    .with(true, () => <Loader2Icon size='1em' className='animate-spin-ease' />)
    .otherwise(() => <PlusIcon size='1em' />)

  let onClickAddToCart = (payload: { userId: string; productId: string }) => {
    return async () => {
      toast.dismiss()
      let res = await addOrAppendToCart.executeAsync(payload)
      if (res?.serverError || res?.validationErrors || !res?.data) {
        return toast.error('Terjadi kesalahan pada server', {
          description: 'Harap ulangi beberapa saat lagi',
        })
      }

      if (!res.data.ok) {
        return toast.error(res.data.error)
      }

      toast.success(res.data.message)
    }
  }

  if (!userId) {
    return (
      <Button size='sm' className='gap-x-2' disabled={isButtonDisabled}>
        <Loader2Icon size='1em' className='animate-spin-ease' />
        <span className='sr-only'>Loading..</span>
      </Button>
    )
  }

  if (isOutOfStock) {
    return (
      <Button size='sm' className='gap-x-2' disabled={isOutOfStock}>
        {buttonIcon}
        Stok Habis
      </Button>
    )
  }

  return (
    <Button
      size='sm'
      className='gap-x-2'
      disabled={isButtonDisabled}
      onClick={onClickAddToCart({ productId: props.productId, userId })}
    >
      {buttonIcon}
      Keranjang
    </Button>
  )
}
