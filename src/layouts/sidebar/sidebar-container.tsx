import { SidebarMenu } from './sidebar-menu'

export function SidebarContainer() {
  return (
    <aside className='fixed left-0 bottom-0 top-16 w-56 xl:w-72 bg-background border-r max-lg:hidden z-30'>
      <div className='py-4 px-2.5 lg:px-4'>
        <p className='text-lg font-semibold tracking-tight'>Administrator</p>
      </div>

      <SidebarMenu />
    </aside>
  )
}
