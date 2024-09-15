'use client'

import { popModal, pushModal } from '@/components/modals'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { signOutAction } from '@/app/auth/__actions'

import { LogOutIcon, UserIcon } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function HeaderNavbarProfile() {
  let router = useRouter()
  let { executeAsync } = useAction(signOutAction)

  let onClickSignOut = () => {
    pushModal('ModalConfirmation', {
      title: 'Yakin Akhiri Sesi?',
      description:
        'Apakah anda yakin ingin mengakhiri sesi?. Anda perlu memasukkan alamat surel dan kata sandi anda lagi nanti',
      onAction: async () => {
        toast.dismiss()
        toast.loading('Memproses permintaan, harap tunggu...')
        await executeAsync()
        popModal('ModalConfirmation')
        toast.dismiss()
        toast.success('Berhasil mengakhiri sesi!')
        router.push('/auth/signin')
      },
    })
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='size-9' variant='secondary'>
          <span>R</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='z-[100]' align='end'>
        <DropdownMenuLabel>Halo, Rimzzlabs</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='w-40 gap-x-2'>
          <UserIcon size='1em' />
          Akun Saya
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='w-40 gap-x-2' onClick={onClickSignOut}>
          <LogOutIcon size='1em' />
          Keluar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
