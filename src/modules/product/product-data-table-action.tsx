import { popModal, pushModal } from '@/components/modals'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { updateStockProductSchema } from '@/app/app/product/__schema'
import { isFormPending } from '@/lib/utils'
import { productListAtom } from '@/states/product'

import { zodResolver } from '@hookform/resolvers/zod'
import { A, B, F, N, pipe, S } from '@mobily/ts-belt'
import { useSetAtom } from 'jotai'
import {
  ChevronDownIcon,
  EyeIcon,
  Loader2,
  MinusIcon,
  PackagePlusIcon,
  PlusIcon,
  SendHorizonalIcon,
  Trash2Icon,
} from 'lucide-react'
import { random, sleep, toInt } from 'radash'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

export function ProductDataTableAction(props: Product) {
  let [dialogOpen, setDialogOpen] = useState(false)
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
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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

          <DropdownMenuItem asChild>
            <DialogTrigger>
              <PackagePlusIcon size='1em' />
              Perbarui Stok
            </DialogTrigger>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={onClickDelete}>
            <Trash2Icon size='1em' />
            Hapus Produk
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UpdateStockDropdownItem
        id={props.id}
        setDialogOpen={setDialogOpen}
        initialValue={props.stock.available}
      />
    </Dialog>
  )
}

function UpdateStockDropdownItem(props: {
  initialValue: number
  id: string
  setDialogOpen: (open: boolean) => void
}) {
  let updateProductList = useSetAtom(productListAtom)

  let form = useForm<z.infer<typeof updateStockProductSchema>>({
    defaultValues: { stock: props.initialValue, remarks: '' },
    resolver: zodResolver(updateStockProductSchema),
  })

  let disableInteraction = isFormPending(form.formState)
  let submitIcon = B.ifElse(
    disableInteraction,
    () => <Loader2 size='1em' className='animate-spin' />,
    () => <SendHorizonalIcon size='1em' />,
  )

  let onSubmit = form.handleSubmit(async (value) => {
    toast.dismiss()
    let toastId = toast.loading('Memproses, harap tunggu...')
    await sleep(random(800, 1200))
    let timestamp = new Date().toISOString()
    console.log(
      pipe(
        'Admin memperbarui stok menjadi ',
        S.append(String(value.stock)),
        S.append(' pada timestamp: '),
        S.append(timestamp),
        S.append(' alasan: '),
        S.append(String(value.remarks)),
      ),
    ) // transaction column
    updateProductList((prev) => {
      let productIndex = A.getIndexBy(prev, (product) => product.id === props.id)
      if (!productIndex) return prev
      let product = A.at(prev, productIndex)
      if (!product) return prev
      let newProduct: Product = { ...product, stock: { ...product.stock, available: value.stock } }
      return pipe(prev, A.replaceAt(productIndex, newProduct), F.toMutable)
    })
    toast.dismiss(toastId)
    toast.success('Berhasil memberbarui stok produk!')
    props.setDialogOpen(false)
  })
  let onCloseEvent = (e: Event) => {
    if (disableInteraction) e.preventDefault()
  }

  return (
    <DialogContent
      onCloseAutoFocus={onCloseEvent}
      onEscapeKeyDown={onCloseEvent}
      onPointerDownOutside={onCloseEvent}
      onFocusOutside={onCloseEvent}
      onInteractOutside={onCloseEvent}
    >
      <DialogHeader>
        <DialogTitle>Perbarui Stok Produk</DialogTitle>
        <DialogDescription className='text-balance'>
          Anda bisa memperbarui stok untuk masing-masing produk kapan saja disini
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={onSubmit}>
          <FormField
            name='stock'
            control={form.control}
            disabled={disableInteraction}
            render={({ field }) => {
              let incomingPrevValue = B.ifElse(
                field.value === 1,
                () => 1,
                () => N.subtract(1)(field.value),
              )
              let incomingNextValue = pipe(field.value, toInt, N.add(1))

              return (
                <FormItem>
                  <FormLabel asterisk>Stok Produk</FormLabel>
                  <div className='grid grid-cols-[repeat(3,minmax(0,max-content))] gap-2'>
                    <Button
                      variant='outline'
                      className='px-0 w-9'
                      disabled={field.value < 2}
                      onClick={() => field.onChange(incomingPrevValue)}
                    >
                      <MinusIcon size='1rem' />
                    </Button>
                    <FormControl>
                      <Input
                        className='max-w-16'
                        {...field}
                        type='number'
                        inputMode='numeric'
                        autoComplete='off'
                        placeholder='1'
                        min={1}
                      />
                    </FormControl>
                    <Button
                      variant='outline'
                      className='px-0 w-9'
                      onClick={() => field.onChange(incomingNextValue)}
                    >
                      <PlusIcon size='1rem' />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )
            }}
          />

          <FormField
            name='remarks'
            control={form.control}
            disabled={disableInteraction}
            render={({ field }) => (
              <FormItem className='pt-3'>
                <FormLabel>Catatan (opsional)</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder='Catatan perubahan, maks: 1000 karakter' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter className='pt-10'>
            <DialogClose>
              <Button variant='outline'>Batalkan</Button>
            </DialogClose>

            <Button disabled={disableInteraction} type='submit' className='gap-x-2'>
              Kirim {submitIcon}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}
