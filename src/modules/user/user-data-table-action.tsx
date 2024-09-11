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

import { Trash2Icon, ChevronDownIcon, EyeIcon, UserPenIcon } from 'lucide-react'

export function UserDataTableAction(props: UserProfile) {
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

        <DropdownMenuItem>
          <Trash2Icon size='1em' />
          Hapus Pengguna
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
