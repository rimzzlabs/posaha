import { Button } from '@/components/ui/button'

import { PublicHeaderContainer } from '@/modules/shared/public-header'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Fragment } from 'react'

export default function Home() {
  return (
    <Fragment>
      <PublicHeaderContainer />
      <main className='mx-auto flex min-h-screen w-11/12 max-w-2xl flex-col items-center justify-center py-10 pt-16 text-center'>
        <h1 className='text-4xl font-bold xl:text-5xl 2xl:text-6xl'>Posaha</h1>
        <p className='mt-2 text-balance font-medium xl:text-lg'>
          Posaha adalah <em>web-app</em> <em>Point Of Sales</em> yang gratis, cepat, dan{' '}
          <em>sumber terbuka</em> untuk para pemilik usaha UMKM di Indonesia.
        </p>

        <div className='mt-4 flex items-center gap-x-2'>
          <Button asChild>
            <Link href='/auth/signin'>Masuk</Link>
          </Button>
          <Button variant='secondary' className='gap-x-1'>
            Pelajari <ArrowRight className='size-4' />
          </Button>
        </div>
      </main>
    </Fragment>
  )
}
