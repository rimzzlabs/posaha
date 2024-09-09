import { HeadingOne } from '@/components/ui/headings'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

import { SignInForm } from './signin-form'

import Image from 'next/image'

export function SignInContainer() {
  return (
    <div className='grid xl:grid-cols-2 py-5 md:py-6 gap-6 xl:min-h-[calc(100vh-4rem)] xl:py-10 xl:items-center'>
      <div className='flex flex-col xl:flex-col-reverse gap-6'>
        <Image
          priority
          width={512}
          height={512}
          alt='Welcome image'
          src='/undraw-welcome.svg'
          className='max-xl:hidden'
        />
        <div>
          <HeadingOne>Masuk ke posaha</HeadingOne>
          <p className='md:text-lg md:font-medium mt-2'>Masuk ke aplikasi Posaha</p>
        </div>
      </div>
      <Tabs defaultValue='admin'>
        <TabsList>
          <TabsTrigger value='admin'>Admin</TabsTrigger>
          <TabsTrigger value='cashier'>Kasir</TabsTrigger>
        </TabsList>

        <TabsContent value='admin'>
          <SignInForm type='admin' />
        </TabsContent>
        <TabsContent value='cashier'>
          <SignInForm type='cashier' />
        </TabsContent>
      </Tabs>
    </div>
  )
}
