'use client'

import { Button } from '@/components/ui/button'
import { HeadingOne } from '@/components/ui/headings'

import { RefreshCcwIcon } from 'lucide-react'
import Image from 'next/image'

type TErrorPage = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ reset }: TErrorPage) {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center text-center'>
      <Image
        priority
        width={280}
        height={280}
        src='/error.svg'
        alt='Error illustration'
        className='shrink-0 grow-0 object-right'
      />
      <HeadingOne className='mb-2 mt-4'>Oops terjadi kesalahan</HeadingOne>
      <p className='mb-4'>Terjadi kesalahan pada aplikasi, harap coba lagi nanti</p>
      <Button className='gap-x-2' onClick={reset}>
        <RefreshCcwIcon size='1em' />
        Coba lagi
      </Button>
    </div>
  )
}
