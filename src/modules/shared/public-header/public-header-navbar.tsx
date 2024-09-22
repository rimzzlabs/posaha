import { PublicHeaderNavbarItem } from './public-header-navbar-item'

export function PublicHeaderNavbar() {
  return (
    <nav className='ml-auto inline-flex items-center gap-x-2'>
      <PublicHeaderNavbarItem href='/auth/signin'>Masuk</PublicHeaderNavbarItem>
    </nav>
  )
}
