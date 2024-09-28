import { SidebarMenu } from './sidebar-menu'

export function SidebarContainer() {
  return (
    <aside className='fixed bottom-0 left-0 top-16 z-30 w-56 border-r bg-background max-xl:hidden xl:w-72'>
      <div className='px-2.5 py-4 lg:px-4'>
        <p className='text-lg font-semibold tracking-tight'>Menu Dasbor</p>
      </div>

      <SidebarMenu />
    </aside>
  )
}
