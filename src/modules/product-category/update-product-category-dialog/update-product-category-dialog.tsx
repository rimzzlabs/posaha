'use client'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import { updateCategoryDialogAtom } from '@/states/popups'

import { UpdateProductCategoryDialogForm } from './update-product-category-dialog-form'

import { useAtom } from 'jotai'

export function UpdateProductCategoryDialog() {
  let [dialogState, setDialogState] = useAtom(updateCategoryDialogAtom)

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
          <AlertDialogTitle>Edit Kategori Produk</AlertDialogTitle>
        </AlertDialogHeader>

        <UpdateProductCategoryDialogForm
          name={dialogState.name}
          color={dialogState.color}
          key={dialogState.categoryId}
          categoryId={dialogState.categoryId}
        />
      </AlertDialogContent>
    </AlertDialog>
  )
}
