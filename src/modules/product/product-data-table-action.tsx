'use client'

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

import { deleteProductAction } from '@/app/app/product/__actions/delete-product'
import { updateStockProductSchema } from '@/app/app/product/__schema'
import { isFormPending } from '@/lib/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { B, N, pipe, S } from '@mobily/ts-belt'
import {
  ChevronDownIcon,
  Loader2,
  MinusIcon,
  PackagePlusIcon,
  PlusIcon,
  RefreshCcwIcon,
  SendHorizonalIcon,
  Trash2Icon,
} from 'lucide-react'
import Link from 'next/link'
import { random, sleep, toInt } from 'radash'
import * as R from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const TOAST_SERVER_ERROR = 'Terjadi kesalahan pada server'
const TOAST_VALIDATION_ERROR = 'Terjadi kesalahan, harap refresh halaman'
const TOAST_SUCCESS = 'Produk berhasil dihapus'

export function ProductDataTableAction(props: Product) {
  let [dialogOpen, setDialogOpen] = R.useState(false)

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

          <DropdownMenuItem asChild>
            <Link href={urlUpdate}>
              <RefreshCcwIcon size='1em' />
              Perbarui Produk
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <DialogTrigger className='w-full'>
              <PackagePlusIcon size='1em' />
              Perbarui Stok
            </DialogTrigger>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={onClickDelete(props.id)}>
            <Trash2Icon size='1em' />
            Hapus Produk
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UpdateStockDropdownItem
        id={props.id}
        setDialogOpen={setDialogOpen}
        initialValue={props.stock}
      />
    </Dialog>
  )
}

type TUpdateStockDropdownItem = {
  id: string
  initialValue: number
  setDialogOpen: (open: boolean) => void
}
function UpdateStockDropdownItem(props: TUpdateStockDropdownItem) {
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
    toast.loading('Memproses, harap tunggu...')
    await sleep(random(800, 1200))
    toast.dismiss()
    toast.success('Berhasil memberbarui stok produk!')
    props.setDialogOpen(false)
    form.reset()
  })
  let onCloseEvent = (e: Event) => disableInteraction && e.preventDefault()

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
                      disabled={field.value < 2 || disableInteraction}
                      onClick={() => field.onChange(incomingPrevValue)}
                    >
                      <MinusIcon size='1rem' />
                    </Button>
                    <FormControl>
                      <Input
                        {...field}
                        min={1}
                        type='number'
                        placeholder='1'
                        autoComplete='off'
                        inputMode='numeric'
                        className='max-w-16'
                        disabled={disableInteraction}
                      />
                    </FormControl>
                    <Button
                      variant='outline'
                      className='px-0 w-9'
                      disabled={disableInteraction}
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
            render={({ field }) => (
              <FormItem className='pt-3'>
                <FormLabel>Catatan (opsional)</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={disableInteraction}
                    placeholder='Catatan perubahan, maks: 1000 karakter'
                  />
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
