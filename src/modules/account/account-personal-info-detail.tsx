import { AccountPersonalInfoUpdate } from './account-personal-info-update'

export function AccountPersonalInfoDetail(user: TUser) {
  return (
    <div className='space-y-4'>
      <div className='grid gap-4 md:grid-cols-2'>
        <div className='space-y-1.5'>
          <p className='font-semibold text-muted-foreground'>Nama Lengkap</p>
          <div className='select-none rounded-md bg-muted p-3'>{user.name}</div>
        </div>

        <div className='space-y-1.5'>
          <p className='font-semibold text-muted-foreground'>Alamat Surel</p>
          <div className='select-none rounded-md bg-muted p-3'>{user.email}</div>
        </div>
      </div>

      <div className='space-y-1.5'>
        <p className='font-semibold text-muted-foreground'>Alamat rumah</p>
        <div className='min-h-44 select-none whitespace-pre-wrap rounded-md bg-muted p-3'>
          {user.address}
        </div>
      </div>

      <AccountPersonalInfoUpdate
        key={user.id}
        userId={user.id}
        name={user.name}
        email={user.email}
        address={user.address}
      />
    </div>
  )
}
