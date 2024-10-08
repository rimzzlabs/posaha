'use client'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import { checkoutAtom, closeDialogCheckoutAtom, openDialogCheckoutAtom } from '@/states/checkout'

import { CashierCheckoutDialogForm } from './cashier-checkout-dialog-form'

import { useAtomValue, useSetAtom } from 'jotai'

export function CashierCheckoutDialog() {
  let dialogState = useAtomValue(checkoutAtom)
  let closeDialog = useSetAtom(closeDialogCheckoutAtom)
  let openDialog = useSetAtom(openDialogCheckoutAtom)

  let onPreventClose = (e: Event) => e.preventDefault()
  let onOpenChange = (nextValue: boolean) => {
    if (nextValue === false) return closeDialog()
    openDialog(dialogState.cartItems)
  }

  return (
    <AlertDialog open={dialogState.open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        className='max-w-6xl'
        onEscapeKeyDown={onPreventClose}
        onCloseAutoFocus={onPreventClose}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Proses Pembelian</AlertDialogTitle>
          <AlertDialogDescription>
            Pastikan daftar produk yang hendak di proses sudah sesuai dengan permintaan pelanggan.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <CashierCheckoutDialogForm />
      </AlertDialogContent>
    </AlertDialog>
  )
}
