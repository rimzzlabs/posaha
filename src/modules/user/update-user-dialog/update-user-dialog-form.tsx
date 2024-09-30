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

import { updateUserAction } from '@/app/app/user/__actions'
import { updateUserSchema } from '@/app/app/user/__schema'
import { closeUpdateUserDialogAtom, togglePendingUpdateUserDialogAtom } from '@/states/popups'

import { UpdateUserDialogFooter } from './update-user-dialog-footer'
import { UpdateUserDialogRole } from './update-user-dialog-role'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSetAtom } from 'jotai'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'

export function UpdateUserDialogForm(props: z.infer<typeof updateUserSchema>) {
  let closeUpdateUserDialog = useSetAtom(closeUpdateUserDialogAtom)
  let togglePendingUpdateUserDialog = useSetAtom(togglePendingUpdateUserDialogAtom)

  let form = useForm<z.infer<typeof updateUserSchema>>({
    defaultValues: props,
    resolver: zodResolver(updateUserSchema),
  })

  let onSubmit = form.handleSubmit(async (values) => {
    togglePendingUpdateUserDialog(true)
    toast.dismiss()
    toast.loading('Memproses permintaan...', { description: 'Harap tunggu beberapa saat' })

    let res = await updateUserAction(values)
    toast.dismiss()

    togglePendingUpdateUserDialog(false)
    if (res?.serverError || res?.validationErrors || !res?.data) {
      return toast.error('Terjadi kesalahan pada server, harap coba beberapa saat lagi')
    }

    if (!res.data.ok) {
      return toast.error(res.data.error)
    }

    form.reset()
    closeUpdateUserDialog()
    toast.success('Berhasil memperbarui informasi pengguna')
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='grid gap-6'>
        <div className='space-y-3'>
          <FormField
            name='name'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Lengkap</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete='name'
                    placeholder='Jonatan Doe'
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormDescription>Nama Lengkap Sesuai KTP</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <UpdateUserDialogRole />

          <FormField
            name='address'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat Lengkap</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={form.formState.isSubmitting}
                    placeholder='Alamat lengkap pengguna'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <UpdateUserDialogFooter />
      </form>
    </Form>
  )
}
