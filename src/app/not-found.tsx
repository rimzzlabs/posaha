import { Button } from '@/components/ui/button'

import { PublicWrapper } from '@/layouts/wrappers'

import { ArrowLeftIcon, SendHorizonalIcon } from 'lucide-react'
import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <PublicWrapper className='flex min-h-screen flex-col items-center justify-center py-20 text-center'>
      <h1 className='text-center text-4xl font-bold xl:text-5xl 2xl:text-6xl'>
        Kontent tidak ditemukan
      </h1>
      <p className='mt-2 text-balance font-medium xl:text-lg'>
        Sayangnya, konten yang anda cari tidak dapat ditemukan, jika ini merupakan kesalahan, harap
        beri tahu kami.
      </p>

      <Button className='mt-4 gap-x-2' variant='secondary'>
        Laporkan <SendHorizonalIcon size='1em' />
      </Button>
      <Button className='mt-4 gap-x-2' asChild>
        <Link href='/'>
          <ArrowLeftIcon size='1em' /> Kembali
        </Link>
      </Button>
    </PublicWrapper>
  )
}
