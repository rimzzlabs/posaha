'use client'

import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { SheetClose, SheetFooter } from '@/components/ui/sheet'

import { openDialogCheckoutAtom } from '@/states/checkout'

import { A, B, N, pipe } from '@mobily/ts-belt'
import { useSetAtom } from 'jotai'

type TSidebarCartFooter = { cartItems: Array<TCartProductItem>; asSheet?: boolean }

export function SidebarCartFooter(props: TSidebarCartFooter) {
  let openDialogCheckout = useSetAtom(openDialogCheckoutAtom)

  let isCartEmpty = pipe(props.cartItems, A.length, N.lte(0))

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
        <Button disabled={isCartEmpty} onClick={onClickProcess(props.cartItems)}>
          Proses
        </Button>
      </CardFooter>
    ),
  )
}
