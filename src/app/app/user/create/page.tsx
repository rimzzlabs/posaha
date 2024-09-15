import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { CreateUserForm } from '@/modules/user/create-user'
import { auth } from '@/server/next-auth'

export default async function CreateUserPage() {
  let session = await auth()

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl lg:text-2xl'>Buat Pengguna Baru</CardTitle>
        <CardDescription>Anda dapat membuat pengguna baru disini</CardDescription>
      </CardHeader>
      <CardContent>
        <CreateUserForm session={session} />
      </CardContent>
    </Card>
  )
}
