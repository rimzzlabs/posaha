'use client'

import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { SheetClose, SheetFooter } from '@/components/ui/sheet'

import { openDialogCheckoutAtom } from '@/states/checkout'

import { B } from '@mobily/ts-belt'
import { useSetAtom } from 'jotai'

type TSidebarCartFooter = { cartItems: Array<TCartProductItem>; asSheet?: boolean }

export function SidebarCartFooter(props: TSidebarCartFooter) {
  let openDialogCheckout = useSetAtom(openDialogCheckoutAtom)

  let onClickProcess = (cartItems: Array<TCartProductItem>) => {
    return () => openDialogCheckout(cartItems)
  }

  return B.ifElse(
    Boolean(props.asSheet),
    () => (
      <SheetFooter>
        <SheetClose asChild>
          <Button variant='secondary'>Kembali</Button>
        </SheetClose>

        <Button onClick={onClickProcess(props.cartItems)}>Proses</Button>
      </SheetFooter>
    ),
    () => (
      <CardFooter className='justify-end gap-2'>
        <Button variant='link' className='2xl:hidden'>
          Lanjutkan Belanja
        </Button>

        <Button onClick={onClickProcess(props.cartItems)}>Proses</Button>
      </CardFooter>
    ),
  )
}
