import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { AccountPersonalInfo } from '@/modules/account'

import { ShieldIcon, UserIcon } from 'lucide-react'

export default function AccountPage() {
  return (
    <Tabs defaultValue='account'>
      <Card>
        <CardHeader>
          <TabsList className='max-w-max'>
            <TabsTrigger value='account' className='gap-x-2'>
              <UserIcon size='1em' />
              Akun
            </TabsTrigger>

            <TabsTrigger value='security' className='gap-x-2'>
              <ShieldIcon size='1em' />
              Keamanan
            </TabsTrigger>
          </TabsList>
        </CardHeader>

        <CardContent>
          <AccountPersonalInfo />
        </CardContent>
      </Card>
    </Tabs>
  )
}
