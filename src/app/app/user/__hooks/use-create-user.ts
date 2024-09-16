import { createUserAction } from '../__actions'
import { createUserSchema } from '../__schema/user-schema'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { match } from 'ts-pattern'
import { z } from 'zod'

export function useCreateUser() {
  let router = useRouter()

  let form = useForm<z.infer<typeof createUserSchema>>({
    defaultValues: {
      ktp: '',
      name: '',
      address: '',
      email: '',
      password: '',
      role: '' as TRole,
    },
    resolver: zodResolver(createUserSchema),
  })

  let onSubmit = form.handleSubmit(async (value) => {
    toast.dismiss()
    toast.loading('Memproses permintaan, harap tunggu...')

    let res = await createUserAction(value)
    toast.dismiss()

    if (!res?.data) {
      toast.error('Terjadi kesalahan server')
      return
    }

    if (!res.data.ok) {
      let error = res.data.error
      let message = match(error)
        .with('Email Unique', () => 'Pengguna dengan Alamat Surel ini suda ada')
        .with('Ktp Unique', () => 'Pengguna dengan Nomor KTP ini suda ada')
        .otherwise(() => 'Tidak dapat memenuhi permintaan, harap coba lagi nanti')

      let isConflictEmail = error === 'Email Unique'
      let isConflictKtp = error === 'Ktp Unique'
      if (isConflictEmail) form.setError('email', { message })
      if (isConflictKtp) form.setError('ktp', { message })

      toast.error(message, { closeButton: true })

      return
    }

    toast.success('Berhasil menambahkan pengguna baru!')
    router.push('/app/user/list')
    router.refresh()
  })

  return { form, onSubmit }
}
