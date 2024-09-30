import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { InputPassword } from '@/components/ui/input-password'

import { updateUserPasswordAction } from '@/app/app/user/__actions'
import { updateUserPasswordSchema } from '@/app/app/user/__schema'
import {
  closeUpdateUserPasswordDialogAtom,
  togglePendingUpdateUserPasswordDialogAtom,
} from '@/states/popups'

import { UpdateUserPasswordDialogFooter } from './update-user-password-dialog-footer'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSetAtom } from 'jotai'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'

export function UpdateUserPasswordDialogForm(
  props: Omit<z.infer<typeof updateUserPasswordSchema>, 'oldPassword' | 'newPassword'>,
) {
  let closeUpdateUserPasswordDialog = useSetAtom(closeUpdateUserPasswordDialogAtom)
  let togglePendingUpdateUserPasswordDialog = useSetAtom(togglePendingUpdateUserPasswordDialogAtom)

  let form = useForm<z.infer<typeof updateUserPasswordSchema>>({
    defaultValues: { ...props, oldPassword: '', newPassword: '' },
    resolver: zodResolver(updateUserPasswordSchema),
  })

  let onSubmit = form.handleSubmit(async (values) => {
    togglePendingUpdateUserPasswordDialog(true)
    toast.dismiss()
    toast.loading('Memproses permintaan...', { description: 'Harap tunggu beberapa saat' })

    let res = await updateUserPasswordAction(values)
    toast.dismiss()

    togglePendingUpdateUserPasswordDialog(false)
    if (res?.serverError || res?.validationErrors || !res?.data) {
      return toast.error('Terjadi kesalahan pada server, harap coba beberapa saat lagi')
    }

    if (!res.data.ok) {
      return toast.error(res.data.error)
    }

    form.reset()
    closeUpdateUserPasswordDialog()
    toast.success('Berhasil memperbarui kata sandi pengguna')
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='grid gap-6'>
        <div className='space-y-3'>
          <FormField
            name='oldPassword'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel asterisk>Kata Sandi Lama</FormLabel>
                <FormControl>
                  <InputPassword
                    {...field}
                    disabled={form.formState.isSubmitting}
                    placeholder='Kata sandi lama pengguna'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='newPassword'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel asterisk>Kata Sandi Baru</FormLabel>
                <FormControl>
                  <InputPassword
                    {...field}
                    disabled={form.formState.isSubmitting}
                    placeholder='Kata sandi baru pengguna'
                  />
                </FormControl>
                <FormDescription>
                  Berisikan 8 Karakter atau lebih, mengandung setidaknya 1 karakter khusus dan 1
                  angka
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <UpdateUserPasswordDialogFooter />
      </form>
    </Form>
  )
}
