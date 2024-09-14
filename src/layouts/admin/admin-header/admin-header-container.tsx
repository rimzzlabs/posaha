import { AdminHeaderNavbar } from './admin-header-navbar'

import { LandPlotIcon } from 'lucide-react'
import Link from 'next/link'

export function AdminHeaderContainer() {
  return (
    <header className='fixed bg-background top-0 inset-x-0 border-b z-40'>
      <div className='h-16 flex items-center px-10'>
        <Link href='/admin' className='inline-flex items-center gap-x-2'>
          <LandPlotIcon className='stroke-primary' size='1.25em' />
          <p className='text-lg font-bold'>Posaha</p>
        </Link>
        <AdminHeaderNavbar />
      </div>
    </header>
  )
}
