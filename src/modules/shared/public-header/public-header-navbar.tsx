import { ToggleTheme } from '@/components/ui/toggle-theme'

import { PublicHeaderNavbarItem } from './public-header-navbar-item'

import { B } from '@mobily/ts-belt'
import type { Session } from 'next-auth'

export function PublicHeaderNavbar(props: { session: Session | null }) {
  let isAuthenticated = Boolean(props.session?.user?.id)

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
