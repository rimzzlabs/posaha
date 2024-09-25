'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'

import { sidebarCartAtom } from '@/states/storage'

import { useSetAtom } from 'jotai'

export function SidebarCartFooter() {
  let closeSidebar = useSetAtom(sidebarCartAtom)

  let onClickCloseSidebar = () => closeSidebar()

  return (
    <CardFooter className='justify-end gap-2'>
      <Button variant='link' onClick={onClickCloseSidebar}>
        Lanjutkan Belanja
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Checkout</Button>
        </AlertDialogTrigger>

        <AlertDialogContent className='max-w-5xl'>
          <AlertDialogHeader>
            <AlertDialogTitle>Proses Pembelian</AlertDialogTitle>
            <AlertDialogDescription>Detail Proses Pembelian</AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Batalkan</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button>Proses</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CardFooter>
  )
}
