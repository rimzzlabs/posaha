import { USER_ROLES } from '@/lib/constant'
import { userListAtom } from '@/states/user'

import { createUserSchema } from '../__schema/user-schema'

import { zodResolver } from '@hookform/resolvers/zod'
import { A, F, pipe } from '@mobily/ts-belt'
import { useSetAtom } from 'jotai'
import { useRouter } from 'next-nprogress-bar'
import { random, sleep, uid } from 'radash'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { match } from 'ts-pattern'
import { z } from 'zod'

export function useCreateUser() {
  let updateUserList = useSetAtom(userListAtom)
  let router = useRouter()

  let form = useForm<z.infer<typeof createUserSchema>>({
    defaultValues: { nik: '', fullName: '', address: '', email: '', password: '', role: '' },
    resolver: zodResolver(createUserSchema),
  })

  let onSubmit = form.handleSubmit(async (value) => {
    toast.dismiss()
    toast.loading('Memproses permintaan, harap tunggu...')
    await sleep(random(800, 1200))

    let timestamp = new Date().toISOString()

    let role = pipe(
      USER_ROLES,
      A.getBy((role) => role.id === value.role),
    )
    if (!role) {
      toast.dismiss()
      toast.error('Terjadi kesalahan, harap ulangi beberapa saat lagi')
      return
    }

    let roleName = match(role.name)
      .with('admin', F.identity)
      .otherwise(() => 'cashier' as const)
    let newUser: UserProfile = {
      id: uid(16),
      userId: uid(32),
      email: value.email,
      fullName: value.fullName,
      createdAt: timestamp,
      updatedAt: timestamp,
      address: value.address,
      avatar: null,
      role: {
        ...role,
        name: roleName,
      },
    }

    updateUserList((prev) => [newUser].concat(prev))
    toast.dismiss()
    toast.success('Berhasil menambhkan pengguna baru!')
    router.push('/admin/user/list')
  })

  return { form, onSubmit }
}
