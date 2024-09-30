'use client'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { useUpdateStockProduct } from '@/app/app/product/__hooks'
import { updateStockDialogAtom } from '@/states/popups'

import { UpdateProductStockDialogFooter } from './update-product-stock-dialog-footer'

import { N, pipe } from '@mobily/ts-belt'
import { useAtomValue } from 'jotai'
import { PlusIcon } from 'lucide-react'
import { toInt } from 'radash'

export function UpdateProductStockDialog() {
  let { open } = useAtomValue(updateStockDialogAtom)
  let { form, onSubmit } = useUpdateStockProduct()

  let disableInteraction = form.formState.isSubmitting

  let onCloseEvent = (e: Event) => {
    if (disableInteraction) e.preventDefault()
  }

  return (
    <AlertDialog open={open}>
      <AlertDialogContent
        onCloseAutoFocus={onCloseEvent}
        onEscapeKeyDown={onCloseEvent}
        onFocusOutside={onCloseEvent}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Perbarui Stok Produk</AlertDialogTitle>
          <AlertDialogDescription className='text-balance'>
            Anda bisa memperbarui stok untuk masing-masing produk kapan saja disini
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={onSubmit}>
            <FormField
              name='stock'
              control={form.control}
              render={({ field }) => {
                let incomingNextValue = pipe(field.value, toInt, N.add(1))

                return (
                  <FormItem>
                    <FormLabel asterisk>Stok Produk</FormLabel>
                    <div className='grid grid-cols-[repeat(3,minmax(0,max-content))] gap-2'>
                      <FormControl>
                        <Input
                          {...field}
                          min={0}
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
                        className='w-9 px-0'
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

            <UpdateProductStockDialogFooter />
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
