'use client'

import { cn } from '@/lib/utils'
import { sidebarCartAtom } from '@/states/storage'

import { useAtomValue } from 'jotai'
import type { PropsWithChildren } from 'react'

export function CashierWrapper(props: PropsWithChildren) {
  let isSidebarOpen = useAtomValue(sidebarCartAtom)

  return (
    <div
      className={cn(
        isSidebarOpen &&
          'grid gap-2.5 xl:grid-cols-[minmax(480px,768px)_minmax(440px,480px)] 3xl:grid-cols-[minmax(768px,1196px)_minmax(480px,1fr)]',
      )}
    >
      {props.children}
    </div>
  )
}
