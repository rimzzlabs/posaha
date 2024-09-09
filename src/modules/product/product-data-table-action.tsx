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

import { productListAtom } from '@/states/product'

import { useSetAtom } from 'jotai'
import { ChevronDownIcon, EyeIcon, PenIcon, Trash2Icon } from 'lucide-react'
import { random, sleep } from 'radash'
import { toast } from 'sonner'

export function ProductDataTableAction(props: Product) {
  let setProductList = useSetAtom(productListAtom)

  let onClickDelete = () => {
    let title = 'Hapus produk ini?'
    let description = 'Apakah anda yakin ingin menghapus produk yang dipilih?'
    let labelAction = 'Hapus Produk'

    pushModal('ModalConfirmation', {
      title,
      description,
      labelAction,
      onAction: async () => {
        toast.dismiss()
        let toastId = toast.loading('Memproses permintaan, harap tunggu')
        await sleep(random(50, 1000))
        setProductList((product) => product.filter((p) => p.id !== props.id))
        popModal('ModalConfirmation')
        toast.dismiss(toastId)
        toast.success('Berhasil menghapus produk')
      },
    })
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
        <DropdownMenuItem>
          <EyeIcon size='1em' />
          Lihat Produk
        </DropdownMenuItem>
        <DropdownMenuItem>
          <PenIcon size='1em' />
          Perbarui Produk
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={onClickDelete}>
          <Trash2Icon size='1em' />
          Hapus Produk
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
