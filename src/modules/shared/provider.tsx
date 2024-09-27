'use client'

import { ModalProvider } from '@/components/modals'
import { ProgressBar } from '@/components/ui/progress-bar'
import { TooltipProvider } from '@/components/ui/tooltip'

import { QUERY_CLIENT_CONFIG } from '@/lib/configs/react-query'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider as JotaiProvider } from 'jotai'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { useRef } from 'react'

type TProvider = React.PropsWithChildren<{ session: Session | null }>

export function Provider(props: TProvider) {
  let qcRef = useRef<QueryClient | null>(null)
  if (!qcRef.current) {
    qcRef.current = new QueryClient(QUERY_CLIENT_CONFIG)
  }

  return (
    <SessionProvider session={props.session} refetchOnWindowFocus>
      <JotaiProvider>
        <QueryClientProvider client={qcRef.current}>
          <ThemeProvider
            enableSystem
            attribute='class'
            defaultTheme='dark'
            storageKey='app.posaha.theme'
          >
            <TooltipProvider>{props.children}</TooltipProvider>
            <ProgressBar />
            <ModalProvider />
          </ThemeProvider>
          <ReactQueryDevtools position='bottom' buttonPosition='bottom-left' />
        </QueryClientProvider>
      </JotaiProvider>
    </SessionProvider>
  )
}
