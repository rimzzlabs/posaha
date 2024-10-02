'use client'

import { ToggleTheme } from '@/components/ui/toggle-theme'

import { PublicHeaderNavbarItem } from './public-header-navbar-item'

import { B } from '@mobily/ts-belt'
import { useSession } from 'next-auth/react'

export function PublicHeaderNavbar() {
  let session = useSession()

  let isAuthenticated = session.status === 'authenticated'

  let button = B.ifElse(
    isAuthenticated,
    () => <PublicHeaderNavbarItem href='/app'>Dasbor</PublicHeaderNavbarItem>,
    () => <PublicHeaderNavbarItem href='/auth/signin'>Masuk</PublicHeaderNavbarItem>,
  )

  return (
    <nav className='ml-auto inline-flex items-center gap-x-2'>
      <ToggleTheme />
      {button}
    </nav>
  )
}
