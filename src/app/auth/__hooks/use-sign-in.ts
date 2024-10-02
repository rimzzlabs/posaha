import { signInAction } from '../__actions'
import { signInSchema } from '../__schema'

import { zodResolver } from '@hookform/resolvers/zod'
import { O, pipe } from '@mobily/ts-belt'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'

export function useSignIn() {
  let router = useRouter()
  let session = useSession()
  let [isTranstioning, startTransition] = useTransition()

  let form = useForm<z.infer<typeof signInSchema>>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(signInSchema),
  })

  let onSubmit = form.handleSubmit(async (values) => {
    toast.dismiss()
    toast.loading('Memproses, harap tunggu...')
    let res = await signInAction(values)
    toast.dismiss()

    if (res?.data && 'ok' in res.data && !res.data.ok) {
      toast.error(res.data.error)
      if (res.data.error === 'Alamat Surel atau Kata Sandi tidak valid') {
        form.setError('email', { message: res.data.error })
        form.setError('password', { message: res.data.error })
        form.setFocus('password')
      }
      return
    }

    await session.update()

    let url = pipe(
      O.fromNullable(session.data?.user.role),
      O.mapWithDefault('/app', (role) =>
        role === 'cashier' ? '/app/transaction/cashier' : '/app',
      ),
    )

    toast.success('Berhasil masuk!')
    startTransition(() => {
      router.push(url)
    })
  })

  return { form, onSubmit, isTranstioning }
}
