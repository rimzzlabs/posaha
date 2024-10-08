import { popModal, pushModal } from '@/components/modals'

import { deleteUserAction } from '../__actions'

import { useRouter } from 'next/navigation'
import * as R from 'react'
import { toast } from 'sonner'

export function useDeleteUser() {
  let router = useRouter()

  return R.useCallback(
    (userId: string) => {
      return () => {
        pushModal('ModalConfirmation', {
          title: 'Hapus pengguna?',
          labelAction: 'Hapus pengguna',
          description: 'Apakah anda yakin ingin menghapus pengguna ini?',
          onAction: async () => {
            toast.dismiss()
            toast.loading('Memproses permintaan, harap tunggu')
            await deleteUserAction({ id: userId })
            toast.dismiss()
            router.refresh()
            toast.success('Pengguna berhasil dihapus!')
            popModal('ModalConfirmation')
          },
        })
      }
    },
    [router],
  )
}
