'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { UserAvatar } from '@/components/ui/user-avatar'

import { useSignOut } from '@/app/auth/__hooks'

import { D, F, O, pipe } from '@mobily/ts-belt'
import { LogOutIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'

export function HeaderNavbarProfile(props: TWithSession) {
  let onClickSignOut = useSignOut()

  let name = pipe(
    props?.session?.user?.name,
    O.fromNullable,
    O.mapWithDefault('Pengguna', F.identity),
  )

  let image = pipe(
    props,
    D.get('session'),
    O.map((session) => session.user),
    O.mapWithDefault(name, (user) => user.image),
    O.fromNullable,
    O.mapWithDefault(name, F.identity),
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='size-9 p-0' variant='ghost'>
          <UserAvatar seed={image} alt={name} height={28} width={26} size={26} radius={20} />
          <span className='sr-only'>Pengguna {name}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='z-[100]' align='end'>
        <DropdownMenuLabel>Halo, {name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className='gap-x-2'>
          <Link href='/app/account'>
            <UserIcon size='1em' />
            Akun Saya
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='gap-x-2' onClick={onClickSignOut}>
          <LogOutIcon size='1em' />
          Keluar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
