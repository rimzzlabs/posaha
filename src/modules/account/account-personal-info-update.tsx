'use client'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
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
import { Textarea } from '@/components/ui/textarea'

import { updateSelfUserAction } from '@/app/app/user/__actions'
import { updateUserSelfSchema } from '@/app/app/user/__schema'

import { zodResolver } from '@hookform/resolvers/zod'
import { B } from '@mobily/ts-belt'
import { Loader2Icon, PenIcon, SendHorizontalIcon } from 'lucide-react'
import * as R from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'

export function AccountPersonalInfoUpdate(payload: z.infer<typeof updateUserSelfSchema>) {
  let [open, setOpen] = R.useState(false)

  let form = useForm<z.infer<typeof updateUserSelfSchema>>({
    mode: 'all',
    defaultValues: payload,
    resolver: zodResolver(updateUserSelfSchema),
  })

  let buttonIcon = B.ifElse(
    form.formState.isSubmitting,
    () => <Loader2Icon size='1em' className='animate-spin-ease' />,
    () => <SendHorizontalIcon size='1em' />,
  )

  let onCloseEvent = (e: Event) => {
    if (form.formState.isSubmitting) e.preventDefault()
  }
  let onOpenChange = (open: boolean) => {
    if (!open && form.formState.isSubmitting) return
    setOpen(open)
  }
  let onSubmit = form.handleSubmit(async (values) => {
    toast.dismiss()
    toast.loading('Memproses permintaan harap tunggu...')
    let res = await updateSelfUserAction(values)

    toast.dismiss()
    if (res?.serverError || res?.validationErrors || !res?.data) {
      return toast.error('Terjadi kesalahan pada server')
    }
    if (!res.data.ok) {
      return toast.error(res.data.error)
    }
    setOpen(false)
    toast.success('Berhasil memperbarui data diri!')
  })

  return (
    <div className='flex justify-end'>
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogTrigger asChild>
          <Button className='gap-x-2'>
            <PenIcon size='1em' />
            Perbarui
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent
          onFocusOutside={onCloseEvent}
          onEscapeKeyDown={onCloseEvent}
          onCloseAutoFocus={onCloseEvent}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Perbarui data pribadi</AlertDialogTitle>
            <AlertDialogDescription>
              Anda dapat memperbarui data pribadi anda langsung disini
            </AlertDialogDescription>
          </AlertDialogHeader>

          <Form {...form}>
            <form onSubmit={onSubmit} className='grid gap-6'>
              <div className='space-y-3'>
                <FormField
                  name='name'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel asterisk>Nama lengkap anda</FormLabel>

                      <FormControl>
                        <Input
                          {...field}
                          disabled={form.formState.isLoading}
                          placeholder='John Doe'
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name='email'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel asterisk>Alamat surel</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type='email'
                          disabled={true}
                          autoComplete='email'
                          className='select-none'
                          placeholder='arif@gmail.com'
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name='address'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel asterisk>Alamat Lengkap</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          disabled={form.formState.isLoading}
                          placeholder='Alamat lengkap anda'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <AlertDialogFooter>
                <AlertDialogCancel asChild>
                  <Button variant='outline' disabled={form.formState.isLoading}>
                    Batal
                  </Button>
                </AlertDialogCancel>

                <Button type='submit' className='gap-x-2' disabled={form.formState.isSubmitting}>
                  Kirim
                  {buttonIcon}
                </Button>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
