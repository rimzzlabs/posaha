import { signInSchema } from '../__schema'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next-nprogress-bar'
import { random, sleep } from 'radash'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

export function useSignIn() {
  let router = useRouter()

  let form = useForm<z.infer<typeof signInSchema>>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(signInSchema),
  })

  let onSubmit = form.handleSubmit(async () => {
    let toastId = toast.loading('Memproses, harap tunggu...')
    await sleep(random(800, 1400))
    toast.dismiss(toastId)

    toast.success('Berhasil masuk!')
    router.push('/admin')
  })

  return { form, onSubmit }
}
