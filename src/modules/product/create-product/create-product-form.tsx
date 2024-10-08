'use client'

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
import { Textarea } from '@/components/ui/textarea'

import { useCreateProduct } from '@/app/app/product/__hooks'
import { isFormPending } from '@/lib/utils'

import { CreateProductCategory } from './create-product-category'
import { CreateProductImage } from './create-product-image'
import { CreateProductSKU } from './create-product-sku'

import { B, N, pipe } from '@mobily/ts-belt'
import { Loader2Icon, MinusIcon, PlusIcon, SendHorizonalIcon } from 'lucide-react'
import { omit, toFloat } from 'radash'
import CurrencyInput from 'react-currency-input-field'

type TCreateProductForm = {
  categoryList: Array<{
    id: string
    name: string
    createdAt: string
    updatedAt: string
    color: string
  }>
}
export function CreateProductForm(props: TCreateProductForm) {
  let createProduct = useCreateProduct()

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
        <CreateProductImage />

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

            <CreateProductSKU />
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

            <CreateProductCategory categoryList={props.categoryList} />
          </div>

          <div className='grid gap-4 xl:grid-cols-2'>
            <FormField
              name='stock'
              control={createProduct.form.control}
              render={({ field }) => {
                let incomingPrevValue = B.ifElse(
                  field.value === 1,
                  () => 1,
                  () => N.subtract(1)(field.value),
                )
                let incomingNextValue = pipe(field.value, toFloat, N.add(1))

                return (
                  <FormItem>
                    <FormLabel>Stok Produk</FormLabel>
                    <div className='grid grid-cols-[repeat(3,minmax(0,max-content))] gap-2'>
                      <Button
                        variant='outline'
                        className='w-9 px-0'
                        disabled={field.value < 2 || disabledInteractive}
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
                          disabled={disabledInteractive}
                        />
                      </FormControl>
                      <Button
                        variant='outline'
                        className='w-9 px-0'
                        disabled={disabledInteractive}
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

          <div className='flex justify-end pt-3 lg:col-span-2'>
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
