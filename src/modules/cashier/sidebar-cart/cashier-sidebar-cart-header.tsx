'use client'

import { popModal, pushModal } from '@/components/modals'
import { Button } from '@/components/ui/button'
import { CardHeader, CardTitle } from '@/components/ui/card'

import { clearCartAtom, sidebarCartProductItemsAtom } from '@/states/storage'

import { A, B, N, pipe } from '@mobily/ts-belt'
import { useAtomValue, useSetAtom } from 'jotai'
import { Trash2Icon } from 'lucide-react'
import { toast } from 'sonner'

export function CashierSidebarCartHeader() {
  let cartItems = useAtomValue(sidebarCartProductItemsAtom)
  let clearCart = useSetAtom(clearCartAtom)

  let hasProductInCart = pipe(cartItems, A.length, N.gt(0))

  let onClickClearCart = () => {
    pushModal('ModalConfirmation', {
      title: 'Hapus semua produk dikeranjang',
      description:
        'Apakah anda yakin ingin menghapus semua produk yang ada pada keranjang belanjaan?',
      labelAction: 'Ya, Hapus',
      onAction: () => {
        toast.dismiss()
        clearCart()
        popModal('ModalConfirmation')
        toast.success('Penghapusan berhasil!', {
          description: 'Berhasil menghapus semua produk pada keranjang belanja',
        })
      },
    })
  }
  return (
    <CardHeader className='h-16 flex-row items-center justify-between'>
      <CardTitle>Keranjang Belanja</CardTitle>

      {B.ifElse(
        hasProductInCart,
        () => (
          <Button onClick={onClickClearCart} variant='ghost' className='h-9 w-9 p-0'>
            <Trash2Icon size='1rem' className='stroke-red-500' />
            <span className='sr-only'>Hapus Semua Produk</span>
          </Button>
        ),
        () => null,
      )}
    </CardHeader>
  )
}
