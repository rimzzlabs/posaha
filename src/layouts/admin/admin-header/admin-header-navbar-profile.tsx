import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { LogOutIcon, UserIcon } from 'lucide-react'

export function AdminHeaderNavbarProfile() {
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
        <DropdownMenuItem className='w-40 gap-x-2'>
          <LogOutIcon size='1em' />
          Keluar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
