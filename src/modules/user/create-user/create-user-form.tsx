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
import { InputPassword } from '@/components/ui/input-password'
import { Textarea } from '@/components/ui/textarea'

import { useCreateUser } from '@/app/admin/user/__hooks'
import { isFormPending } from '@/lib/utils'

import { CreateUserRole } from './create-user-role'

import { B } from '@mobily/ts-belt'
import { Loader2Icon, SendHorizonalIcon } from 'lucide-react'

export function CreateUserForm() {
  let createUser = useCreateUser()

  let disableInteractive = isFormPending(createUser.form.formState)
  let submitIcon = B.ifElse(
    disableInteractive,
    () => <Loader2Icon size='1em' className='animate-spin' />,
    () => <SendHorizonalIcon size='1em' />,
  )

  return (
    <Form {...createUser.form}>
      <form
        onSubmit={createUser.onSubmit}
        className='grid grid-cols-2 gap-x-4 gap-y-3 px-1 pt-10 max-w-7xl'
      >
        <FormField
          name='nik'
          control={createUser.form.control}
          disabled={disableInteractive}
          render={({ field }) => (
            <FormItem>
              <FormLabel asterisk>No NIK/KTP</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  inputMode='numeric'
                  placeholder='360123123'
                  onChange={(event) => {
                    let value = event.target.value
                    let re = /^\d*$/
                    if (!re.test(value)) return
                    field.onChange(value)
                  }}
                />
              </FormControl>
              <FormDescription>Berisikan 16 karakter Nomor Induk Kependudukan</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='fullName'
          control={createUser.form.control}
          disabled={disableInteractive}
          render={({ field }) => (
            <FormItem>
              <FormLabel asterisk>Nama Lengkap</FormLabel>
              <FormControl>
                <Input {...field} autoComplete='name' placeholder='Arif Abdullah' />
              </FormControl>
              <FormDescription>Nama Lengkap Sesuai KTP</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='email'
          control={createUser.form.control}
          disabled={disableInteractive}
          render={({ field }) => (
            <FormItem>
              <FormLabel asterisk>Alamat surel</FormLabel>
              <FormControl>
                <Input {...field} autoComplete='email' type='email' placeholder='arif@gmail.com' />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='password'
          control={createUser.form.control}
          disabled={disableInteractive}
          render={({ field }) => (
            <FormItem>
              <FormLabel asterisk>Kata Sandi</FormLabel>
              <FormControl>
                <InputPassword
                  {...field}
                  autoComplete='new-password'
                  placeholder='Kata sandi pengguna'
                />
              </FormControl>
              <FormDescription>
                Berisikan 8 Karakter atau lebih, mengandung setidaknya 1 karakter khusus dan 1 angka
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <CreateUserRole />

        <FormField
          name='address'
          control={createUser.form.control}
          disabled={disableInteractive}
          render={({ field }) => (
            <FormItem>
              <FormLabel asterisk>Alamat Lengkap</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder='Alamat lengkap pengguna' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='xl:col-span-2 flex justify-end'>
          <Button type='submit' disabled={disableInteractive} className='gap-x-2'>
            Kirim
            {submitIcon}
          </Button>
        </div>
      </form>
    </Form>
  )
}
