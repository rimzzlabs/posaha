import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { updateCategoryAction } from '@/app/app/product/__actions'
import { updateCategorySchema } from '@/app/app/product/__schema'
import {
  closeUpdateCategoryDialogAtom,
  togglePendingUpdateCategoryDialogAtom,
} from '@/states/popups'

import { UpdateProductCategoryDialogColorPicker } from './update-product-category-dialog-color-picker'
import { UpdateProductCategoryDialogFooter } from './update-product-category-dialog-footer'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSetAtom } from 'jotai'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'

export function UpdateProductCategoryDialogForm(props: z.infer<typeof updateCategorySchema>) {
  let closeUpdateCategoryDialog = useSetAtom(closeUpdateCategoryDialogAtom)
  let togglePendingUpdateCategoryDialog = useSetAtom(togglePendingUpdateCategoryDialogAtom)

  let form = useForm<z.infer<typeof updateCategorySchema>>({
    mode: 'all',
    defaultValues: props,
    resolver: zodResolver(updateCategorySchema),
  })

  let onSubmit = form.handleSubmit(async (values) => {
    togglePendingUpdateCategoryDialog(true)
    toast.dismiss()
    toast.loading('Memproses permintaan...', { description: 'Harap tunggu beberapa saat' })
    let res = await updateCategoryAction(values)
    toast.dismiss()
    togglePendingUpdateCategoryDialog(false)
    if (res?.serverError || res?.validationErrors || !res?.data) {
      return toast.error('Terjadi kesalahan pada server, harap coba beberapa saat lagi')
    }

    if (!res.data.ok) {
      return toast.error(res.data.error)
    }

    form.reset()
    closeUpdateCategoryDialog()
    toast.success('Berhasil memperbarui kategori!')
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='grid gap-6'>
        <div>
          <FormField
            name='name'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Kategori</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Contoh: Makanan, Minuman' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <UpdateProductCategoryDialogColorPicker />
        </div>

        <UpdateProductCategoryDialogFooter />
      </form>
    </Form>
  )
}
