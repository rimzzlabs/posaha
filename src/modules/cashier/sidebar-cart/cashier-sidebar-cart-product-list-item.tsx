import { popModal, pushModal } from '@/components/modals'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { formatPrice } from '@/lib/number'
import { deleteCartQtyAtom, type TCartProductItem } from '@/states/storage'

import { CashierSidebarCartProductQty } from './cashier-sidebar-cart-product-qty'

import { useSetAtom } from 'jotai'
import { Trash2Icon } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'
import { match, P } from 'ts-pattern'

export function CashierSidebarCartProductListItem(props: TCartProductItem) {
  let deleteItem = useSetAtom(deleteCartQtyAtom)

  let onClickDelete = (id: string) => () => {
    pushModal('ModalConfirmation', {
      title: 'Hapus produk ini dari keranjang?',
      description:
        'Apakah anda yakin ingin menghapus produk ini dari keranjang belanjaan pelanggan?',
      labelAction: 'Ya, Hapus',
      onAction: () => {
        toast.dismiss()
        deleteItem(id)
        popModal('ModalConfirmation')
        toast.success('Berhasil menghapus produk dari keranjang')
      },
    })
  }

  return (
    <Card className='grid grid-cols-[minmax(64px,96px)_repeat(2,minmax(0,1fr))]'>
      <div className='self-center pl-4'>
        <div className='relative aspect-square w-24'>
          {match(props.image)
            .with(P.not(P.nullish), (image) => (
              <Image
                fill
                src={image}
                loading='lazy'
                alt={props.name}
                className='shrink-0 grow-0 rounded-md object-cover'
              />
            ))
            .otherwise(() => null)}
        </div>
      </div>

      <CardHeader className='p-4 pl-8 max-2xl:pb-0 2xl:max-w-36 2xl:pr-0'>
        <CardTitle className='sr-only'>{props.name}</CardTitle>
        <CardDescription>{props.name}</CardDescription>
        <p className='font-bold'>{formatPrice(props.price)}</p>
        <CardDescription>Kuantitas: {props.qty}</CardDescription>
      </CardHeader>

      <CardFooter className='mt-auto p-4 max-2xl:justify-between 2xl:ml-auto 2xl:flex-col 2xl:items-end 2xl:gap-y-4 2xl:pl-0'>
        <Button onClick={onClickDelete(props.id)} variant='ghost' className='h-8 w-8 gap-x-2 p-0'>
          <Trash2Icon size='1em' className='stroke-red-500' />
          <span className='sr-only'>Hapus</span>
        </Button>

        <CashierSidebarCartProductQty stock={props.stock} qty={props.qty} id={props.id} />
      </CardFooter>
    </Card>
  )
}
