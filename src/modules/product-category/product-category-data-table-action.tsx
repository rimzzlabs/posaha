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

import { productCategoryAtom } from '@/states/product-category'

import { A, F, pipe } from '@mobily/ts-belt'
import { useSetAtom } from 'jotai'
import { ChevronDownIcon, PenIcon, Trash2Icon } from 'lucide-react'
import { random, sleep } from 'radash'
import { toast } from 'sonner'

export function ProductCategoryDataTableAction(props: ProductCategory) {
  let updateProductCategory = useSetAtom(productCategoryAtom)

  let onClickDelete = () => {
    let title = 'Hapus kategori produk ini?'
    let description = 'Apakah anda yakin ingin menghapus kategori produk yang dipilih?'
    let labelAction = 'Hapus Kategori Produk'

    pushModal('ModalConfirmation', {
      title,
      description,
      labelAction,
      onAction: async () => {
        toast.dismiss()
        let toastId = toast.loading('Memproses permintaan, harap tunggu')
        await sleep(random(50, 800))
        updateProductCategory((product) => {
          return pipe(
            product,
            A.filter((product) => product.id !== props.id),
            F.toMutable,
          )
        })
        popModal('ModalConfirmation')
        toast.dismiss(toastId)
        toast.success('Berhasil menghapus kategori produk')
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
          <PenIcon size='1em' />
          Perbarui Kategori
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={onClickDelete}>
          <Trash2Icon size='1em' />
          Hapus Kategori
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
