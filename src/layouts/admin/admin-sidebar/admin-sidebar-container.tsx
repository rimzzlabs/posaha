import { AdminSidebarMenu } from './admin-sidebar-menu'

export function AdminSidebarContainer() {
  return (
    <aside className='fixed left-0 bottom-0 top-16 w-72 bg-background border-r max-lg:hidden'>
      <div className='py-4 px-10'>
        <p className='text-lg font-semibold tracking-tight'>Administrator</p>
      </div>

      <AdminSidebarMenu />
    </aside>
  )
}
