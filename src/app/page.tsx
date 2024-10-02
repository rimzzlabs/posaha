import { BackgroundLines } from '@/components/ui/background-lines'

import { PublicHeaderContainer } from '@/modules/shared/public-header'

import { Fragment } from 'react'

export default function Home() {
  return (
    <Fragment>
      <PublicHeaderContainer />
      <BackgroundLines className='flex items-center justify-center'>
        <main className='relative z-10 w-11/12 max-w-5xl'>
          <h1 className='z-20 text-balance bg-gradient-to-b from-stone-900 to-stone-700 bg-clip-text py-2 text-center font-sans text-2xl font-bold tracking-tight text-transparent dark:from-stone-600 dark:to-white md:py-10 md:text-4xl lg:text-7xl'>
            <span className='sr-only'>Posaha: </span>Solusi POS Terjangkau untuk UMKM dan Warung
            Indonesia
          </h1>
          <p className='mx-auto max-w-xl text-center text-sm text-stone-700 dark:text-stone-400 md:text-lg'>
            Kelola usaha UMKM atau warung Anda dengan mudah dan efisien
          </p>
        </main>
      </BackgroundLines>
    </Fragment>
  )
}
