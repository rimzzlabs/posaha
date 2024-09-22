import { signInAction } from '../__actions'
import { signInSchema } from '../__schema'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

export function useSignIn() {
  let router = useRouter()
  let session = useSession()

  let form = useForm<z.infer<typeof signInSchema>>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(signInSchema),
  })

  let onSubmit = form.handleSubmit(async (values) => {
    toast.dismiss()
    toast.loading('Memproses, harap tunggu...')
    let res = await signInAction(values)
    await session.update()
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

    toast.success('Berhasil masuk!')
    router.push('/app')
  })

  return { form, onSubmit }
}
