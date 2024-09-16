import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { For } from '@/components/ui/for'

import { getUserByEmail } from '@/database/query/user'
import { USER_ROLES } from '@/lib/constant'
import { auth } from '@/server/next-auth'

import { AccountPersonalInfoAvatar } from './account-personal-info-avatar'

import { A, D, F, N, O, pipe, S } from '@mobily/ts-belt'
import { PencilIcon } from 'lucide-react'
import { match, P } from 'ts-pattern'

export async function AccountPersonalInfo() {
  let session = await auth()
  let res = await pipe(
    session?.user.email,
    O.fromNullable,
    O.mapWithDefault('rimzzlabs@proton.me', F.identity),
    getUserByEmail,
  )
  if (!res.ok) throw new Error('Unauthorized')

  let user = pipe(res, D.getUnsafe('data'))
  let labels = ['No. KTP', 'Nama Lengkap']
  let values = [user.ktp, user.name]

  let isAddressEmpty = pipe(user.address, S.trim, S.length, N.lt(1))
  let address = match([isAddressEmpty, user.address])
    .with([false, P.select()], F.identity)
    .otherwise(() => <em className='text-muted-foreground'>Belum ada data alamat</em>)
  let userInformations = pipe(
    2,
    A.makeWithIndex((n) => {
      return { label: F.defaultTo(labels[n], ''), value: F.defaultTo(values[n], '') }
    }),
  )
  let roleInformation = pipe(
    USER_ROLES,
    A.getBy((role) => role.value === user.role),
    O.mapWithDefault({ value: '', label: '--', color: 'hsl(var(--primary))' }, F.identity),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl xl:text-2xl font-bold'>Informasi Data Diri</CardTitle>
        <CardDescription>Berikut adalah informasi lengkap data diri anda</CardDescription>
      </CardHeader>

      <CardContent className='grid gap-4'>
        <div className='flex flex-col md:flex-row items-start gap-3'>
          <AccountPersonalInfoAvatar id={user.id} name={user.name} image={user.image} />

          <div className='flex-1 flex flex-col gap-4 w-full'>
            <For each={userInformations}>
              {(args) => (
                <div className='flex flex-col gap-1'>
                  <p className='text-sm font-semibold text-muted-foreground'>{args.label}</p>
                  <div className='bg-background text-foreground border py-2.5 px-4 rounded-lg text-sm font-medium'>
                    {args.value}
                  </div>
                </div>
              )}
            </For>
          </div>
        </div>

        <div className='grid md:grid-cols-[minmax(218px,220px)_minmax(0,1fr)] gap-4'>
          <div className='max-h-max'>
            <p className='text-sm font-semibold mb-1'>Peran/Role</p>
            <div className='p-4 rounded-lg bg-background text-foreground border whitespace-pre-wrap flex items-center gap-x-2 text-sm font-medium'>
              <div className='size-4 rounded' style={{ backgroundColor: roleInformation.color }} />
              <span>{roleInformation.label}</span>
            </div>
          </div>

          <div>
            <p className='text-sm font-semibold mb-1'>Alamat Lengkap</p>
            <div className='p-4 rounded-lg bg-background text-foreground border whitespace-pre-wrap text-balance text-sm font-medium'>
              {address}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className='justify-end'>
        <Button variant='secondary' className='gap-x-2'>
          <PencilIcon size='1em' />
          Perbarui data diri
        </Button>
      </CardFooter>
    </Card>
  )
}
