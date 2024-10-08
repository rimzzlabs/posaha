import { popModal, pushModal } from '@/components/modals'

import { signOutAction } from '../__actions'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import * as R from 'react'
import { toast } from 'sonner'

export function useSignOut() {
  let router = useRouter()
  let session = useSession()

  return R.useCallback(() => {
    pushModal('ModalConfirmation', {
      title: 'Yakin Akhiri Sesi?',
      description:
        'Apakah anda yakin ingin mengakhiri sesi?. Anda perlu memasukkan alamat surel dan kata sandi anda lagi nanti',
      onAction: async () => {
        toast.dismiss()
        toast.loading('Memproses permintaan, harap tunggu...')
        await signOutAction()
        await session.update(null)
        popModal('ModalConfirmation')
        toast.dismiss()
        toast.success('Berhasil mengakhiri sesi!')
        router.push('/auth/signin')
      },
    })
  }, [router])
}
