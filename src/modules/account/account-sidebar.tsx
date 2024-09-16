import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { IdCardIcon, LockIcon } from 'lucide-react'

export function AccountSidebar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl xl:text-2xl'>Menu akun saya</CardTitle>
        <CardDescription>Daftar menu yang tersedia</CardDescription>
      </CardHeader>

      <CardContent>
        <p className='text-lg font-semibold mb-4'>Akun</p>
        <Button variant='secondary' className='w-full justify-normal gap-x-2'>
          <IdCardIcon size='1em' />
          Data Diri
        </Button>

        <Button variant='ghost' className='w-full justify-normal gap-x-2 mt-3'>
          <LockIcon size='1em' />
          Keamanan
        </Button>
      </CardContent>
    </Card>
  )
}
