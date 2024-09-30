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

import { deleteProductAction } from '@/app/app/product/__actions/delete-product'
import { openUpdateStockDialogAtom } from '@/states/popups'

import { pipe, S } from '@mobily/ts-belt'
import { useSetAtom } from 'jotai'
import { ArrowUpDownIcon, ChevronDownIcon, PackagePlusIcon, Trash2Icon } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

const TOAST_SERVER_ERROR = 'Terjadi kesalahan pada server'
const TOAST_VALIDATION_ERROR = 'Terjadi kesalahan, harap refresh halaman'
const TOAST_SUCCESS = 'Produk berhasil dihapus'

export function ProductDataTableAction(props: Product) {
  let openUpdateStockDialog = useSetAtom(openUpdateStockDialogAtom)

  let urlUpdate = pipe(props.id, S.prepend('/app/product/update/'))

  let onClickDelete = (id: string) => () => {
    let title = 'Hapus produk ini?'
    let description = 'Apakah anda yakin ingin menghapus produk yang dipilih?'
    let labelAction = 'Hapus Produk'

    pushModal('ModalConfirmation', {
      title,
      description,
      labelAction,
      onAction: async () => {
        toast.dismiss()
        toast.loading('Memproses permintaan, harap tunggu')
        let res = await deleteProductAction({ id })
        toast.dismiss()
        if (res?.serverError || !res?.data) {
          toast.error(TOAST_SERVER_ERROR)
          return
        }
        if (res?.validationErrors) {
          toast.error(TOAST_VALIDATION_ERROR)
          return
        }
        if (!res.data.ok) {
          toast.error(res.data.error)
          return
        }
        popModal('ModalConfirmation')
        toast.success(TOAST_SUCCESS)
      },
    })
  }
  let onClickUpdateStock = () => openUpdateStockDialog({ productId: props.id })

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

        <DropdownMenuItem asChild>
          <Link href={urlUpdate}>
            <PackagePlusIcon size='1em' />
            Perbarui
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onClickUpdateStock}>
          <ArrowUpDownIcon size='1em' />
          Tambah Stok
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={onClickDelete(props.id)}>
          <Trash2Icon size='1em' />
          Hapus Produk
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
