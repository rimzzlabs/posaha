'use client'

import { popModal, pushModal } from '@/components/modals'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { deleteCategoryAction } from '@/app/app/product/__actions'
import type { updateCategorySchema } from '@/app/app/product/__schema'
import { openUpdateCategoryDialogAtom } from '@/states/popups'

import { useSetAtom } from 'jotai'
import { ChevronDownIcon, PenIcon, Trash2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import type { z } from 'zod'

export function ProductCategoryDataTableAction(props: ProductCategory) {
  let router = useRouter()
  let openUpdateCategoryDialog = useSetAtom(openUpdateCategoryDialogAtom)

  let onClickDelete = (id: string) => () => {
    let title = 'Hapus kategori produk ini?'
    let description = 'Apakah anda yakin ingin menghapus kategori produk yang dipilih?'
    let labelAction = 'Hapus Kategori Produk'

    pushModal('ModalConfirmation', {
      title,
      description,
      labelAction,
      onAction: async () => {
        toast.dismiss()
        toast.loading('Memproses permintaan, harap tunggu')
        let res = await deleteCategoryAction({ id })
        toast.dismiss()
        popModal('ModalConfirmation')
        if (!res?.data) {
          toast.error('Terjadi kesalahan pada server')
          return
        }
        if (!res.data.ok) {
          toast.error(res.data.error)
          return
        }
        router.refresh()
        toast.success('Berhasil menghapus kategori produk')
      },
    })
  }
  let onClickUpdate = (payload: z.infer<typeof updateCategorySchema>) => {
    return () => openUpdateCategoryDialog(payload)
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='gap-x-2'>
          Menu
          <ChevronDownIcon size='1em' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>Menu Aksi</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onClickUpdate({ categoryId: props.id, color: props.color, name: props.name })}
        >
          <PenIcon size='1em' />
          Perbarui Kategori
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={onClickDelete(props.id)}>
          <Trash2Icon size='1em' />
          Hapus Kategori
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
