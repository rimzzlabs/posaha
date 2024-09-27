import { popModal, pushModal } from '@/components/modals'

import { deleteFromCartAction, updateCartQuantityAction } from '../__actions'

import { F, N, O, pipe } from '@mobily/ts-belt'
import { useSession } from 'next-auth/react'
import { useAction, useOptimisticAction } from 'next-safe-action/hooks'
import { toInt } from 'radash'
import * as R from 'react'
import { toast } from 'sonner'

type TUseUpdateCartQty = { cartItemId: string; quantity: number; stock: number }
type TPayloadToUpdateQty = { userId: string; cartItemId: string; prevQty: number; qty: number }

export function useUpdateCartQty(props: TUseUpdateCartQty) {
  let session = useSession({ required: true })
  let debRef = R.useRef<null | F.Controlled<[]>>(null)
  let deleteFromCart = useAction(deleteFromCartAction)
  let updateQty = useOptimisticAction(updateCartQuantityAction, {
    currentState: props.quantity,
    updateFn(_, input) {
      return input.quantity
    },
  })
  let [qtyValue, setQtyValue] = R.useState(() => String(updateQty.optimisticState))

  let showDeleteButton = pipe(qtyValue, toInt, N.lte(1))
  let userId = pipe(session.data?.user?.id, O.fromNullable, O.mapWithDefault('', F.identity))

  let onSearchChange = R.useCallback(async (payload: TPayloadToUpdateQty) => {
    let revertUpdate = !payload.qty
    if (revertUpdate) {
      setQtyValue(String(payload.prevQty))
      return
    }
    let skipUpdate = payload.prevQty === payload.qty
    if (skipUpdate) return

    console.info(`${Date.now()}: onSearchChange is run`)
    let quantity = payload.qty
    let res = await updateQty.executeAsync({
      quantity,
      cartItemId: payload.cartItemId,
      userId: payload.userId,
    })
    if (res?.serverError || res?.validationErrors || !res?.data) {
      setQtyValue(String(payload.prevQty))
      return toast.error('Gagal memperbarui kuantitas keranjang', {
        description: 'Harap coba beberapa saat lagi',
      })
    }

    if (!res.data.ok) {
      setQtyValue(String(payload.prevQty))
      return toast.error(res.data.error, { description: 'Harap coba beberapa saat lagi' })
    }
  }, [])
  let debouncedUpdate = R.useCallback(
    (quantity: number) => {
      if (debRef?.current?.isScheduled?.()) {
        debRef.current.cancel()
      }
      let options = { delay: 600, leading: false }
      let deb = F.makeControlledDebounce(async () => {
        await onSearchChange({
          cartItemId: props.cartItemId,
          prevQty: props.quantity,
          qty: quantity,
          userId,
        })
      }, options)
      debRef.current = deb
      deb.schedule()
    },
    [props.cartItemId, props.quantity, userId],
  )
  let onChangeQtyValue = R.useCallback((e: R.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    let quantity = pipe(value, toInt)
    debouncedUpdate(quantity)
    setQtyValue(value)
  }, [])
  let onDecrement = R.useCallback(() => {
    setQtyValue((qty) => {
      let nextQty = pipe(qty, toInt, F.ifElse(N.lt(2), F.identity, N.subtract(1)), String)
      debRef?.current?.cancel?.()
      debouncedUpdate(toInt(nextQty))
      return nextQty
    })
  }, [])
  let onIncrement = R.useCallback((stock: number) => {
    return () => {
      setQtyValue((qty) => {
        let nextQty = pipe(qty, toInt, F.ifElse(N.gte(stock), F.identity, N.add(1)), String)
        debRef?.current?.cancel?.()
        debouncedUpdate(toInt(nextQty))
        return nextQty
      })
    }
  }, [])
  let onClickDelete = R.useCallback((payload: { cartItemId: string; userId: string }) => {
    return () => {
      pushModal('ModalConfirmation', {
        title: 'Hapus produk ini dari keranjang?',
        description:
          'Apakah anda yakin ingin menghapus produk ini dari keranjang belanjaan pelanggan?',
        labelAction: 'Ya, Hapus',
        onAction: async () => {
          toast.dismiss()

          toast.loading('Menghapus produk dari keranjang, harap tunggu...')
          let res = await deleteFromCart.executeAsync(payload)
          toast.dismiss()

          if (res?.serverError || res?.validationErrors || !res?.data) {
            popModal('ModalConfirmation')
            return toast.error('Terjadi kesalahan pada server', {
              description: 'Harap coba beberapa saat lagi',
            })
          }

          if (!res.data.ok) {
            popModal('ModalConfirmation')
            return toast.error(res.data.error, { description: 'Harap coba beberapa saat lagi' })
          }

          popModal('ModalConfirmation')
          toast.success('Berhasil menghapus produk dari keranjang')
        },
      })
    }
  }, [])

  return {
    qtyValue,
    onChangeQtyValue,
    onIncrement,
    onDecrement,
    userId,
    showDeleteButton,
    onClickDelete,
  }
}
