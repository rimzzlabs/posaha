'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { useUpdateProduct } from '@/app/app/product/__hooks'
import { isFormPending } from '@/lib/utils'

import { UpdateProductCategory } from './update-product-category'
import { UpdateProductImage } from './update-product-image'
import { UpdateProductSKU } from './update-product-sku'

import { B, N, pipe } from '@mobily/ts-belt'
import { Loader2Icon, MinusIcon, PlusIcon, SendHorizonalIcon } from 'lucide-react'
import { omit, toFloat } from 'radash'
import CurrencyInput from 'react-currency-input-field'

type TUpdateProductForm = {
  product: Product
  categoryList: Array<{
    id: string
    name: string
    createdAt: string
    updatedAt: string
    color: string
  }>
}
export function UpdateProductForm(props: TUpdateProductForm) {
  let createProduct = useUpdateProduct(props.product)

  let disabledInteractive = isFormPending(createProduct.form.formState)
  let submitIcon = B.ifElse(
    disabledInteractive,
    () => <Loader2Icon size='1em' className='animate-spin' />,
    () => <SendHorizonalIcon size='1em' />,
  )

  return (
    <Form {...createProduct.form}>
      <form
        onSubmit={createProduct.onSubmit}
        className='grid gap-4 lg:grid-cols-[minmax(0,max-content)_minmax(0,1fr)]'
      >
        <UpdateProductImage />

        <div className='flex flex-col gap-4'>
          <div className='grid gap-4 xl:grid-cols-2'>
            <FormField
              name='name'
              control={createProduct.form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel asterisk>Nama Produk</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete='off'
                      placeholder='Kiripik Jengkol'
                      disabled={disabledInteractive}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <UpdateProductSKU />
          </div>

          <div className='grid gap-4 xl:grid-cols-2'>
            <FormField
              name='price'
              control={createProduct.form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Harga Produk</FormLabel>
                  <FormControl>
                    <CurrencyInput
                      step={100}
                      customInput={Input}
                      {...omit(field, ['onChange'])}
                      prefix='Rp '
                      autoComplete='off'
                      groupSeparator='.'
                      decimalSeparator=','
                      inputMode='numeric'
                      allowDecimals={false}
                      placeholder='Rp 25.000'
                      allowNegativeValue={false}
                      disabled={disabledInteractive}
                      onValueChange={(value) => field.onChange(value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <UpdateProductCategory categoryList={props.categoryList} />
          </div>

          <div className='grid gap-4 xl:grid-cols-2'>
            <FormField
              name='stock'
              control={createProduct.form.control}
              render={({ field }) => {
                let value = toFloat(field.value, 0)
                let incomingNextValue = pipe(value, N.add(1))
                let incomingPrevValue = B.ifElse(
                  value === 1,
                  () => 1,
                  () => N.subtract(1)(field.value),
                )

                return (
                  <FormItem>
                    <FormLabel>Tambah Stok Produk</FormLabel>
                    <div className='grid grid-cols-[repeat(3,minmax(0,max-content))] gap-2'>
                      <Button
                        variant='outline'
                        className='px-0 w-9'
                        disabled={value <= 1 || disabledInteractive}
                        onClick={() => field.onChange(incomingPrevValue)}
                      >
                        <MinusIcon size='1rem' />
                      </Button>
                      <FormControl>
                        <Input
                          {...field}
                          type='number'
                          placeholder='1'
                          autoComplete='off'
                          inputMode='numeric'
                          className='max-w-16'
                          disabled={disabledInteractive}
                        />
                      </FormControl>
                      <Button
                        variant='outline'
                        className='px-0 w-9'
                        disabled={disabledInteractive}
                        onClick={() => field.onChange(incomingNextValue)}
                      >
                        <PlusIcon size='1rem' />
                      </Button>
                    </div>
                    <FormDescription>
                      Stok akan diperbarui menjadi{' '}
                      {N.add(toFloat(field.value, 0))(props.product.stock)}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <FormField
              name='description'
              control={createProduct.form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deksripsi Produk (opsional)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      autoComplete='off'
                      disabled={disabledInteractive}
                      placeholder='Kiripik Jengkol dengan bumbu khas dari Mandalawangi, rasakan kenikmatan dan sensasinya'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex lg:col-span-2 justify-end pt-3'>
            <Button size='lg' type='submit' className='gap-x-2' disabled={disabledInteractive}>
              Kirim
              {submitIcon}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
