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

import { useCreateCategory } from '@/app/app/product/__hooks'
import { isFormPending } from '@/lib/utils'

import { CreateProductCategoryColorPicker } from './create-product-category-color-picker'

import { B } from '@mobily/ts-belt'
import { Loader2Icon, SendHorizonalIcon } from 'lucide-react'

export function CreateProductCategoryForm() {
  let createProductCategory = useCreateCategory()
  let disabledInteractive = isFormPending(createProductCategory.form.formState)
  let submitIcon = B.ifElse(
    disabledInteractive,
    () => <Loader2Icon size='1em' className='animate-spin' />,
    () => <SendHorizonalIcon size='1em' />,
  )

  return (
    <Form {...createProductCategory.form}>
      <form onSubmit={createProductCategory.onSubmit} className='max-w-xl px-px pt-10'>
        <HeadingThree>Informasi Kategori Produk</HeadingThree>

        <FormField
          name='name'
          control={createProductCategory.form.control}
          render={({ field }) => (
            <FormItem className='pt-3'>
              <FormLabel asterisk>Label Kategori Produk</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={disabledInteractive}
                  placeholder='Contoh: Makanan, Minuman, Bahan Masakan.'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <CreateProductCategoryColorPicker />

        <div className='flex justify-end pt-3'>
          <Button type='submit' className='gap-x-2' disabled={disabledInteractive}>
            Kirim {submitIcon}
          </Button>
        </div>
      </form>
    </Form>
  )
}
