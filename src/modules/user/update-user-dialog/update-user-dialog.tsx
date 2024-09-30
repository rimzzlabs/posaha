'use client'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import { updateUserDialogAtom } from '@/states/popups'

import { UpdateUserDialogForm } from './update-user-dialog-form'

import { useAtom } from 'jotai'

export function UpdateUserDialog() {
  let [dialogState, setDialogState] = useAtom(updateUserDialogAtom)

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

        <UpdateUserDialogForm
          key={dialogState.userId}
          userId={dialogState.userId}
          name={dialogState.name}
          address={dialogState.address}
          role={dialogState.role}
        />
      </AlertDialogContent>
    </AlertDialog>
  )
}
