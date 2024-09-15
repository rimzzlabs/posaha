import { createUserAction } from '../__actions'
import { createUserSchema } from '../__schema/user-schema'

import { zodResolver } from '@hookform/resolvers/zod'
import { pipe, S } from '@mobily/ts-belt'
import { useRouter } from 'next/navigation'
import { tryit } from 'radash'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
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

    const [error, res] = await tryit(createUserAction)(value)
    toast.dismiss()
    let showErrorToast = () => toast.error('Terjadi kesalahan server')

    if (error) {
      showErrorToast()
      return
    }

    if (!res?.data) {
      showErrorToast()
      return
    }

    if (!res.data.ok) {
      let description = pipe('Kode tehnikal: ', S.append(res.data.error))
      toast.error('Terjadi kesalahan', { description })
      return
    }

    toast.success('Berhasil menambahkan pengguna baru!')
    router.push('/app/user/list')
    router.refresh()
  })

  return { form, onSubmit }
}
