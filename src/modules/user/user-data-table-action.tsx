'use client'

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

import { useDeleteUser } from '@/app/app/user/__hooks'

import { useIsClient } from '@uidotdev/usehooks'
import { Trash2Icon, ChevronDownIcon, EyeIcon, UserPenIcon } from 'lucide-react'

export function UserDataTableAction(props: TUser) {
  let isClient = useIsClient()
  let onDeleteUser = useDeleteUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button disabled={!isClient} className='gap-x-2' variant='outline'>
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
