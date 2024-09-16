import { AccountPersonalInfo, AccountSidebar } from '@/modules/account'

export default function AccountPage() {
  return (
    <div className='grid gap-3 lg:gap-4 lg:min-h-[calc(100vh-7rem)] md:grid-cols-[minmax(234px,260px)_minmax(0,1fr)] xl:grid-cols-[minmax(14.625rem,23.75rem)_minmax(0,1fr)]'>
      <AccountSidebar />
      <AccountPersonalInfo />
    </div>
  )
}
