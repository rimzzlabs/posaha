import { popModal, pushModal } from '@/components/modals'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { userListAtom } from '@/states/user'

import { A, F, pipe } from '@mobily/ts-belt'
import { useSetAtom } from 'jotai'
import { Trash2Icon, ChevronDownIcon, EyeIcon, UserPenIcon } from 'lucide-react'
import { random, sleep } from 'radash'
import { toast } from 'sonner'

export function UserDataTableAction(props: UserProfile) {
  let setUsers = useSetAtom(userListAtom)

  let onDeleteUser = (userId: string) => {
    return () => {
      pushModal('ModalConfirmation', {
        title: 'Hapus pengguna?',
        labelAction: 'Hapus pengguna',
        description: 'Apakah anda yakin ingin menghapus pengguna ini?',
        onAction: async () => {
          toast.dismiss()
          toast.loading('Memproses permintaan, harap tunggu')
          await sleep(random(500, 800))
          setUsers((prev) => {
            return pipe(
              prev,
              A.filter((u) => u.id !== userId),
              F.toMutable,
            )
          })
          toast.success('Pengguna berhasil dihapus!')
          popModal('ModalConfirmation')
        },
      })
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='gap-x-2' variant='outline'>
          Menu
          <ChevronDownIcon size='1em' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>Menu Aksi</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <EyeIcon size='1em' />
            Lihat Pengguna
          </DropdownMenuItem>

          <DropdownMenuItem>
            <UserPenIcon size='1em' />
            Perbarui Pengguna
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={onDeleteUser(props.id)}>
          <Trash2Icon size='1em' />
          Hapus Pengguna
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
