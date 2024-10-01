import { HeadingThree, HeadingTwo } from '@/components/ui/headings'
import { TabsContent } from '@/components/ui/tabs'

import { getUserByEmail } from '@/database/query/user'
import { auth } from '@/server/next-auth'

import { AccountSecurityForm } from './account-security-form'

import { D, F, O, pipe } from '@mobily/ts-belt'
import { redirect } from 'next/navigation'

export async function AccountSecurity() {
  let session = await auth()

  let res = await pipe(
    session?.user.email,
    O.fromNullable,
    O.mapWithDefault('', F.identity),
    getUserByEmail,
  )
  let user = pipe(res, D.get('data'))
  if (!user || user === 'user not found') redirect('/auth/signin')

  return (
    <TabsContent value='security'>
      <HeadingTwo className='mb-2'>Keamanan Akun</HeadingTwo>
      <p className='mb-6 max-w-2xl text-secondary-foreground'>
        Anda dapat memperbarui informasi keamanan akun anda disini, seperti memperbarui kata sandi
        akun anda. Untuk menjaga akun anda tetap aman, kami sarankan untuk mengganti kata sandi
        setiap 3 atau 6 Bulan sekali.
      </p>
      <HeadingThree>Perbarui Kata sandi</HeadingThree>

      <AccountSecurityForm key={user.id} email={user.email} userId={user.id} />
    </TabsContent>
  )
}
