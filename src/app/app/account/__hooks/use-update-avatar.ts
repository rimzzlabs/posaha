import { popModal, pushModal } from '@/components/modals'

import { updateAvatarAction } from '../__actions'

import { F, O, type Option, pipe } from '@mobily/ts-belt'
import { uid } from 'radash'
import * as R from 'react'
import { toast } from 'sonner'

type TUseUpdateAvatar = {
  id: string
  name: string
  image: Option<string>
}

type TState = { avatar: string; generated: Option<string> }

export function useUpdateAvatar(args: TUseUpdateAvatar) {
  let avatar = pipe(args.image, O.fromNullable, O.mapWithDefault(args.name, F.identity))
  let [state, setState] = R.useState<TState>({ avatar, generated: null })

  let seed = state.generated || state.avatar

  let onReset = () => setState((prev) => ({ ...prev, generated: null }))
  let onGenerateRandom = () => setState((prev) => ({ ...prev, generated: uid(6) }))

  let onClickSave = () => {
    pushModal('ModalConfirmation', {
      title: 'Perbarui avatar?',
      description: 'Anda yakin untuk memperbarui avatar?',
      labelAction: 'Perbarui',
      onAction: async () => {
        toast.dismiss()
        if (!state.generated) {
          toast.error('Terjadi kesalahan', { description: 'Harap ulangi beberapa saat lagi' })
          return
        }
        toast.loading('Memproses permintaan, harap tunggu...')
        let res = await updateAvatarAction({ id: args.id, image: state.generated })
        toast.dismiss()
        if (res?.data && !res.data.ok) {
          toast.error(res.data.error)
          return
        }

        setState((prev) => ({ avatar: prev.generated || prev.avatar, generated: null }))
        toast.success('Avatar berhasil diperbarui!')
        popModal('ModalConfirmation')
      },
    })
  }

  return { seed, onGenerateRandom, onClickSave, onReset, generated: state.generated }
}
