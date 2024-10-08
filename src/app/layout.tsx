import { Toaster } from '@/components/ui/sonner'

import { Provider } from '@/modules/shared/provider'
import { auth } from '@/server/next-auth'

import './globals.css'

import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import PlusJakartaSansLocal from 'next/font/local'
import type { PropsWithChildren } from 'react'

const pjs = PlusJakartaSansLocal({
  src: [
    {
      path: '../../public/fonts/PlusJakartaSans/PlusJakartaSans-Normal-Variable.ttf',
      style: 'normal',
      weight: 'normal',
    },
    {
      path: '../../public/fonts/PlusJakartaSans/PlusJakartaSans-Italic-Variable.ttf',
      style: 'italic',
      weight: 'normal',
    },
  ],
  variable: '--font-pjs',
  preload: true,
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Posaha',
  description: 'Generated by create next app',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
    notranslate: true,
  },
}

export default async function RootLayout(props: PropsWithChildren) {
  let session = await auth()

  return (
    <html lang='id' translate='no' suppressHydrationWarning>
      <body className={pjs.variable}>
        <SessionProvider session={session} refetchOnWindowFocus>
          <Provider>
            <Toaster />
            {props.children}
          </Provider>
        </SessionProvider>
      </body>
    </html>
  )
}
