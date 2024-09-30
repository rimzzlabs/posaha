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
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import { useDeleteUser } from '@/app/app/user/__hooks'
import type { updateUserPasswordSchema, updateUserSchema } from '@/app/app/user/__schema'
import { openUpdateUserDialogAtom, openUpdateUserPasswordDialogAtom } from '@/states/popups'

import { useIsClient } from '@uidotdev/usehooks'
import { useSetAtom } from 'jotai'
import { Trash2Icon, ChevronDownIcon, UserPenIcon, LockIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import type { z } from 'zod'

export function UserDataTableAction(props: TUser) {
  let session = useSession({ required: true })
  let isClient = useIsClient()
  let onDeleteUser = useDeleteUser()
  let openUpdateUserDialog = useSetAtom(openUpdateUserDialogAtom)
  let openUpdateUserPasswordDialog = useSetAtom(openUpdateUserPasswordDialogAtom)

  let onClickUpdate = (payload: z.infer<typeof updateUserSchema>) => {
    return () => openUpdateUserDialog(payload)
  }
  let onClickUpdatePassword = (
    payload: Omit<z.infer<typeof updateUserPasswordSchema>, 'oldPassword' | 'newPassword'>,
  ) => {
    return () => openUpdateUserPasswordDialog(payload)
  }

  if (session.data?.user?.role !== 'super-admin')
    return (
      <Tooltip delayDuration={150}>
        <TooltipTrigger asChild>
          <Button variant='ghost' className='cursor-help'>
            <LockIcon size='1rem' />
            <span className='sr-only'>Tidak mempunyai wewenang</span>
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <p className='text-sm font-medium text-muted-foreground'>
            Anda tidak mempunyai wewenang untuk mengakses fitur ini
          </p>
        </TooltipContent>
      </Tooltip>
    )
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
          <DropdownMenuItem
            onClick={onClickUpdate({
              userId: props.id,
              name: props.name,
              role: props.role,
              address: props.address,
            })}
          >
            <UserPenIcon size='1em' />
            Perbarui Pengguna
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={onClickUpdatePassword({
              userId: props.id,
              email: props.email,
            })}
          >
            <LockIcon size='1em' />
            Perbarui Kata Sandi
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
