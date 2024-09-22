import { ToggleTheme } from '@/components/ui/toggle-theme'

import { auth } from '@/server/next-auth'

import { HeaderNavbarProfile } from './header-navbar-profile'

export async function HeaderNavbar() {
  let session = await auth()

  return (
    <nav className='ml-auto inline-flex items-center gap-x-2'>
      <ToggleTheme />
      <HeaderNavbarProfile session={session} />
    </nav>
  )
}
