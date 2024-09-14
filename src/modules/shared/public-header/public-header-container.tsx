import { PublicHeaderNavbar } from './public-header-navbar'

import { LandPlotIcon } from 'lucide-react'
import Link from 'next/link'

export function PublicHeaderContainer() {
  return (
    <header className='fixed bg-background top-0 inset-x-0 border-b z-[99]'>
      <div className='h-16 w-11/12 max-w-6xl mx-auto flex items-center'>
        <Link href='/' className='inline-flex items-center gap-x-2'>
          <LandPlotIcon className='stroke-primary' size='1.25em' />
          <p className='text-lg font-bold'>Posaha</p>
        </Link>

        <PublicHeaderNavbar />
      </div>
    </header>
  )
}
