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
import { InputPassword } from '@/components/ui/input-password'

import { updateUserPasswordSelfAction } from '@/app/app/user/__actions'
import { updateUserPasswordSchema } from '@/app/app/user/__schema'

import { zodResolver } from '@hookform/resolvers/zod'
import { B } from '@mobily/ts-belt'
import { Loader2Icon, SendHorizontalIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'

export function AccountSecurityForm(props: { userId: string; email: string }) {
  let form = useForm<z.infer<typeof updateUserPasswordSchema>>({
    defaultValues: { email: props.email, userId: props.userId, oldPassword: '', newPassword: '' },
    resolver: zodResolver(updateUserPasswordSchema),
  })

  let buttonIcon = B.ifElse(
    form.formState.isSubmitting,
    () => <Loader2Icon size='1em' className='animate-spin-ease' />,
    () => <SendHorizontalIcon size='em' />,
  )

  let onSubmit = form.handleSubmit(async (values) => {
    toast.dismiss()
    toast.loading('Memperbarui kata sandi anda', { description: 'Harap tunggu beberapa saat' })

    let res = await updateUserPasswordSelfAction(values)
    toast.dismiss()

    if (res?.serverError || res?.validationErrors || !res?.data) {
      return toast.error('Terjadi kesalahan pada server', {
        description: 'Harap coba beberapa saat lagi',
      })
    }

    if (!res.data.ok) return toast.error(res.data.error)

    toast.success('Berhasil memperbarui kata sandi anda!')
    form.reset()
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='space-y-3 py-4'>
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
                  placeholder='Kata sandi lama anda'
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
                Berisikan 8 Karakter atau lebih, mengandung setidaknya 1 karakter khusus dan 1 angka
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex justify-end'>
          <Button type='submit' className='gap-x-2' disabled={form.formState.isSubmitting}>
            Kirim
            {buttonIcon}
          </Button>
        </div>
      </form>
    </Form>
  )
}
