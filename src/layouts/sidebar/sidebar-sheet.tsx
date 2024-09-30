'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

import { sidebarSheetAtom, toggleSidebarSheetAtom } from '@/states/sidebar-sheet'

import { SidebarMenu } from './sidebar-menu'

import { useMediaQuery } from '@uidotdev/usehooks'
import { useAtomValue, useSetAtom } from 'jotai'

export function SidebarSheet() {
  let open = useAtomValue(sidebarSheetAtom)
  let onOpenChange = useSetAtom(toggleSidebarSheetAtom)
  let isDesktop = useMediaQuery('only screen and (min-width: 1280px)')

  if (isDesktop) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side='left' className='p-0'>
        <SheetHeader className='px-6 pt-6'>
          <SheetTitle>Menu Dasbor</SheetTitle>
          <SheetDescription>Berikut adalah menu dasbor yang bisa anda kunjungi</SheetDescription>
        </SheetHeader>

        <div className='py-4'>
          <SidebarMenu />
        </div>

        <SheetFooter className='px-6 pb-6'>
          <SheetClose asChild>
            <Button variant='secondary'>Tutup</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
