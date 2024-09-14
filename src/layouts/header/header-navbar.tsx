import { ToggleTheme } from '@/components/ui/toggle-theme'

import { HeaderNavbarProfile } from './header-navbar-profile'

export function HeaderNavbar() {
  return (
    <nav className='inline-flex items-center gap-x-2 ml-auto'>
      <ToggleTheme />
      <HeaderNavbarProfile />
    </nav>
  )
}
