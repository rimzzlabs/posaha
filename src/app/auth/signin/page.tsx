import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { PublicWrapper } from '@/layouts/wrappers'
import { SignInForm } from '@/modules/auth/signin'
import { PublicHeaderContainer } from '@/modules/shared/public-header'

import { LockIcon } from 'lucide-react'
import { Fragment } from 'react'

export default function SigninPage() {
  return (
    <Fragment>
      <PublicHeaderContainer />
      <PublicWrapper className='flex min-h-[calc(100vh-4rem)] items-center justify-center'>
        <Card className='max-w-xl'>
          <CardHeader>
            <CardTitle>
              <LockIcon size='1.875rem' className='mb-2' />
              <div>Masuk ke Posaha</div>
            </CardTitle>
            <CardDescription>
              Untuk menggunakan aplikasi Posaha, masuk ke aplikasi dengan menggunakakan alamat surel
              dan kata sandi anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignInForm />
          </CardContent>
        </Card>
      </PublicWrapper>
    </Fragment>
  )
}
