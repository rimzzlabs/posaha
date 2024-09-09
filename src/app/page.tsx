import { Button } from '@/components/ui/button'

import { PublicHeaderContainer } from '@/modules/shared/public-header'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Fragment } from 'react'

export default function Home() {
  return (
    <Fragment>
      <PublicHeaderContainer />
      <main className='pt-16 min-h-screen py-10 flex flex-col items-center justify-center text-center w-11/12 mx-auto max-w-2xl'>
        <h1 className='text-4xl xl:text-5xl 2xl:text-6xl font-bold'>Posaha</h1>
        <p className='xl:text-lg font-medium mt-2 text-balance'>
          Posaha adalah <em>web-app</em> <em>Point Of Sales</em> yang gratis, cepat, dan{' '}
          <em>sumber terbuka</em> untuk para pemilik usaha UMKM di Indonesia.
        </p>

        <div className='flex items-center gap-x-2 mt-4'>
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
