import { ToggleTheme } from '@/components/ui/toggle-theme'

import { AdminHeaderNavbarProfile } from './admin-header-navbar-profile'

export function AdminHeaderNavbar() {
  return (
    <nav className='inline-flex items-center gap-x-2 ml-auto'>
      <ToggleTheme />
      <AdminHeaderNavbarProfile />
    </nav>
  )
}
