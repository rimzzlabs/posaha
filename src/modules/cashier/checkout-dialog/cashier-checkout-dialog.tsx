'use client'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { For } from '@/components/ui/for'
import { ScrollArea } from '@/components/ui/scroll-area'

import { checkoutAtom, closeDialogCheckoutAtom, openDialogCheckoutAtom } from '@/states/checkout'

import { CashierCheckoutDialogForm } from './cashier-checkout-dialog-form'
import { CashierCheckoutDialogProductItem } from './cashier-checkout-dialog-product-item'

import { F, O, pipe } from '@mobily/ts-belt'
import { useAtomValue, useSetAtom } from 'jotai'

export function CashierCheckoutDialog() {
  let dialogState = useAtomValue(checkoutAtom)
  let closeDialog = useSetAtom(closeDialogCheckoutAtom)
  let openDialog = useSetAtom(openDialogCheckoutAtom)

  let cartItems = pipe(O.fromNullable(dialogState?.cartItems), O.mapWithDefault([], F.identity))

  let onPreventClose = (e: Event) => e.preventDefault()
  let onOpenChange = (nextValue: boolean) => {
    if (nextValue === false) return closeDialog()
    openDialog(dialogState.cartItems)
  }

  return (
    <AlertDialog open={dialogState.open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        className='xl:max-w-3xl'
        onEscapeKeyDown={onPreventClose}
        onCloseAutoFocus={onPreventClose}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Proses Pembelian</AlertDialogTitle>
          <AlertDialogDescription>
            Pastikan daftar produk yang hendak di proses sudah sesuai dengan permintaan pelanggan,
            tanyakan sekali lagi untuk mengkonfirmasi pembelian mereka agar tidak ada kesalahan pada
            pembelian produk.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <ScrollArea className='max-h-48 md:max-h-72'>
          <div className='grid gap-2 xl:grid-cols-2'>
            <For each={cartItems}>{(item) => <CashierCheckoutDialogProductItem {...item} />}</For>
          </div>
        </ScrollArea>

        <CashierCheckoutDialogForm />
      </AlertDialogContent>
    </AlertDialog>
  )
}
