'use client'

import { Button } from '@/components/ui/button'

import { toggleSidebarSheetAtom } from '@/states/sidebar-sheet'

import { useSetAtom } from 'jotai'
import { MenuIcon } from 'lucide-react'

export function HeaderSheetButton() {
  let toggleSidebar = useSetAtom(toggleSidebarSheetAtom)

  let onClickToggle = () => toggleSidebar()

  return (
    <Button variant='outline' className='mr-auto xl:hidden' onClick={onClickToggle}>
      <MenuIcon size='1rem' />
      <span className='sr-only'>Buka atau tutup sidebar</span>
    </Button>
  )
}
