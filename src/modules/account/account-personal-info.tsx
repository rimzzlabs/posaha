import { HeadingTwo } from '@/components/ui/headings'
import { TabsContent } from '@/components/ui/tabs'

import { getUserByEmail } from '@/database/query/user'
import { auth } from '@/server/next-auth'

import { AccountPersonalInfoAvatar } from './account-personal-info-avatar'
import { AccountPersonalInfoDetail } from './account-personal-info-detail'

import { D, F, O, pipe } from '@mobily/ts-belt'
import { redirect } from 'next/navigation'

export async function AccountPersonalInfo() {
  let session = await auth()
  let res = await pipe(
    session?.user.email,
    O.fromNullable,
    O.mapWithDefault('rimzzlabs@proton.me', F.identity),
    getUserByEmail,
  )
  let user = pipe(res, D.get('data'))
  if (!user || user === 'user not found') redirect('/auth/signin')

  return (
    <TabsContent value='account'>
      <HeadingTwo className='mb-6'>Informasi Pribadi</HeadingTwo>
      <div className='grid gap-4 md:grid-cols-[minmax(min-content,max-content)_minmax(0,1fr)]'>
        <div>
          <AccountPersonalInfoAvatar id={user.id} image={user.image} name={user.name} />
        </div>

        <AccountPersonalInfoDetail {...user} />
      </div>
    </TabsContent>
  )
}
