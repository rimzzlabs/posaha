import { PublicHeaderNavbarItem } from './public-header-navbar-item'

export function PublicHeaderNavbar() {
  return (
    <nav className='inline-flex items-center gap-x-2 ml-auto'>
      <PublicHeaderNavbarItem href='/auth/signin'>Masuk</PublicHeaderNavbarItem>
    </nav>
  )
}
