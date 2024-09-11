import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { EyeIcon, UserPenIcon } from 'lucide-react'

export function UserDataTableAction(props: UserProfile) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>Aksi</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
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
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
