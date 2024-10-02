import { BackgroundLines } from '@/components/ui/background-lines'

import { PublicHeaderContainer } from '@/modules/shared/public-header'

import { Fragment } from 'react'

export default function Home() {
  return (
    <Fragment>
      <PublicHeaderContainer />
      <BackgroundLines>
        <main className='mx-auto flex min-h-screen w-11/12 max-w-4xl flex-col items-center justify-center py-10 pt-16 text-center'>
          <h1 className='relative z-20 text-balance bg-gradient-to-b from-stone-900 to-stone-700 bg-clip-text py-2 text-center font-sans text-2xl font-bold tracking-tight text-transparent dark:from-stone-600 dark:to-white md:py-10 md:text-4xl lg:text-7xl'>
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
