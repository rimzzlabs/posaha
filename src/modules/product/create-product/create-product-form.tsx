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
import { HeadingThree } from '@/components/ui/headings'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { useCreateProduct } from '@/app/admin/product/__hooks'
import { isFormPending } from '@/lib/utils'

import { B, N, pipe } from '@mobily/ts-belt'
import { Loader2Icon, MinusIcon, PlusIcon, SendHorizonalIcon } from 'lucide-react'
import { omit, toFloat } from 'radash'
import CurrencyInput from 'react-currency-input-field'

export function CreateProductForm() {
  let createProduct = useCreateProduct()

  let disabledInteractive = isFormPending(createProduct.form.formState)
  let submitIcon = B.ifElse(
    disabledInteractive,
    () => <Loader2Icon size='1em' className='animate-spin' />,
    () => <SendHorizonalIcon size='1em' />,
  )

  return (
    <Form {...createProduct.form}>
      <form onSubmit={createProduct.onSubmit} className='max-w-xl pt-10 px-px'>
        <HeadingThree className='mb-4'>Informasi &amp; Harga Produk</HeadingThree>
        <FormField
          name='name'
          control={createProduct.form.control}
          disabled={disabledInteractive}
          render={({ field }) => (
            <FormItem>
              <FormLabel asterisk>Nama Produk</FormLabel>
              <FormControl>
                <Input {...field} autoComplete='off' placeholder='Kiripik Jengkol' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='price'
          control={createProduct.form.control}
          disabled={disabledInteractive}
          render={({ field }) => (
            <FormItem className='pt-3'>
              <FormLabel>Harga Produk</FormLabel>
              <FormControl>
                <CurrencyInput
                  step={100}
                  customInput={Input}
                  {...omit(field, ['onChange'])}
                  autoComplete='off'
                  prefix='Rp '
                  groupSeparator='.'
                  decimalSeparator=','
                  inputMode='numeric'
                  allowDecimals={false}
                  allowNegativeValue={false}
                  placeholder='Rp 25.000'
                  onValueChange={(value) => field.onChange(value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
              <FormItem className='pt-3'>
                <FormLabel>Stok Produk</FormLabel>
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
          name='description'
          control={createProduct.form.control}
          disabled={disabledInteractive}
          render={({ field }) => (
            <FormItem className='pt-3'>
              <FormLabel>Deksripsi Produk (opsional)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  autoComplete='off'
                  placeholder='Kiripik Jengkol dengan bumbu khasd dari Mandalawangi, rasakan kenikmatan dan sensasinya'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex justify-end pt-3'>
          <Button size='lg' type='submit' className='gap-x-2' disabled={disabledInteractive}>
            Kirim
            {submitIcon}
          </Button>
        </div>
      </form>
    </Form>
  )
}
