import { PublicHeaderNavbar } from './public-header-navbar'

import { LandPlotIcon } from 'lucide-react'
import Link from 'next/link'

export function PublicHeaderContainer() {
  return (
    <header className='fixed inset-x-0 top-0 z-[99] border-b bg-background'>
      <div className='mx-auto flex h-16 w-11/12 max-w-6xl items-center'>
        <Link href='/' className='inline-flex items-center gap-x-2'>
          <LandPlotIcon className='stroke-primary' size='1.25em' />
          <p className='text-lg font-bold'>Posaha</p>
        </Link>

        <PublicHeaderNavbar />
      </div>
    </header>
  )
}
