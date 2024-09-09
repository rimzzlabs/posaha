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
import { HeadingTwo } from '@/components/ui/headings'
import { Input } from '@/components/ui/input'
import { InputPassword } from '@/components/ui/input-password'

import { useSignIn } from '@/app/auth/__hooks'
import { isFormPending } from '@/lib/utils'

import { B } from '@mobily/ts-belt'
import { Loader2Icon, SendHorizonalIcon } from 'lucide-react'
import { match } from 'ts-pattern'

type TSignInForm = {
  type: 'admin' | 'cashier'
}

export function SignInForm(props: TSignInForm) {
  let signIn = useSignIn()

  let headingLabel = match(props.type)
    .with('admin', () => 'Masuk sebagai Administrator')
    .otherwise(() => 'Masuk sebagai kasir')

  let disabledInteractive = isFormPending(signIn.form.formState)
  let submitIcon = B.ifElse(
    disabledInteractive,
    () => <Loader2Icon size='1em' className='animate-spin' />,
    () => <SendHorizonalIcon size='1em' />,
  )

  return (
    <Form {...signIn.form}>
      <form className='space-y-4 md:space-y-6' onSubmit={signIn.onSubmit}>
        <HeadingTwo>{headingLabel}</HeadingTwo>

        <FormField
          name='email'
          control={signIn.form.control}
          disabled={disabledInteractive}
          render={({ field }) => (
            <FormItem className='w-full flex-1'>
              <FormLabel>Alamat surel</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='email'
                  autoComplete='email'
                  placeholder='Alamat surel anda'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='password'
          control={signIn.form.control}
          disabled={disabledInteractive}
          render={({ field }) => (
            <FormItem className='w-full flex-1'>
              <FormLabel>Kata sandi</FormLabel>
              <FormControl>
                <InputPassword
                  {...field}
                  autoComplete='current-password'
                  placeholder='Kata sandi anda '
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex justify-end'>
          <Button disabled={disabledInteractive} className='gap-x-2' type='submit'>
            Masuk {submitIcon}
          </Button>
        </div>
      </form>
    </Form>
  )
}
