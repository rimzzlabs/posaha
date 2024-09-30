import { HeaderNavbar } from './header-navbar'
import { HeaderSheetButton } from './header-sheet-button'

import { LandPlotIcon } from 'lucide-react'
import Link from 'next/link'

export function HeaderContainer() {
  return (
    <header className='fixed inset-x-0 top-0 z-40 border-b bg-background'>
      <div className='flex h-16 items-center px-2 lg:px-6 xl:px-10'>
        <HeaderSheetButton />
        <Link href='/app' className='inline-flex items-center gap-x-2'>
          <LandPlotIcon className='stroke-primary' size='1.25em' />
          <p className='text-lg font-bold'>Posaha</p>
        </Link>
        <HeaderNavbar />
      </div>
    </header>
  )
}
