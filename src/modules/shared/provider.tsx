'use client'

import { ModalProvider } from '@/components/modals'
import { ProgressBar } from '@/components/ui/progress-bar'
import { TooltipProvider } from '@/components/ui/tooltip'

import { getReactQueryConfig } from '@/lib/configs/react-query'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider as JotaiProvider } from 'jotai'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { useRef } from 'react'

export function Provider(props: React.PropsWithChildren) {
  let qcRef = useRef<QueryClient | null>(null)
  if (!qcRef.current) {
    qcRef.current = new QueryClient(getReactQueryConfig())
  }

  return (
    <SessionProvider refetchOnWindowFocus>
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
