import { ToggleTheme } from '@/components/ui/toggle-theme'

import { auth } from '@/server/next-auth'

import { HeaderNavbarProfile } from './header-navbar-profile'

export async function HeaderNavbar() {
  let session = await auth()

  return (
    <nav className='inline-flex items-center gap-x-2 ml-auto'>
      <ToggleTheme />
      <HeaderNavbarProfile session={session} />
    </nav>
  )
}
