'use client'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import { updateUserPasswordDialogAtom } from '@/states/popups'

import { UpdateUserPasswordDialogForm } from './update-user-password-dialog-form'

import { useAtom } from 'jotai'

export function UpdateUserPasswordDialog() {
  let [dialogState, setDialogState] = useAtom(updateUserPasswordDialogAtom)

  let onCloseEvent = (e: Event) => {
    if (dialogState.isPending) e.preventDefault()
  }
  let onOpenChange = (open: boolean) => {
    setDialogState((prev) => {
      if (open) return { ...prev, open: true, isPending: false }
      if (prev.isPending) return prev
      return { ...prev, open: false }
    })
  }

  return (
    <AlertDialog open={dialogState.open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        onFocusOutside={onCloseEvent}
        onEscapeKeyDown={onCloseEvent}
        onCloseAutoFocus={onCloseEvent}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Perbarui Informasi Pengguna</AlertDialogTitle>
          <AlertDialogDescription>
            Anda dapat memperbarui informasi pengguna disini
          </AlertDialogDescription>
        </AlertDialogHeader>

        <UpdateUserPasswordDialogForm
          key={dialogState.userId}
          userId={dialogState.userId}
          email={dialogState.email}
        />
      </AlertDialogContent>
    </AlertDialog>
  )
}
