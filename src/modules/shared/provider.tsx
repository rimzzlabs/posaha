'use client'

import { ModalProvider } from '@/components/modals'
import { TooltipProvider } from '@/components/ui/tooltip'

import { getReactQueryConfig } from '@/lib/configs/react-query'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider as JotaiProvider } from 'jotai'
import { ThemeProvider } from 'next-themes'
import { useRef } from 'react'

export function Provider(props: React.PropsWithChildren) {
  let qcRef = useRef<QueryClient | null>(null)
  if (!qcRef.current) {
    qcRef.current = new QueryClient(getReactQueryConfig())
  }

  return (
    <JotaiProvider>
      <QueryClientProvider client={qcRef.current}>
        <ThemeProvider
          enableSystem
          attribute='class'
          defaultTheme='dark'
          storageKey='app.posaha.theme'
        >
          <TooltipProvider>{props.children}</TooltipProvider>
          <ModalProvider />
        </ThemeProvider>
        <ReactQueryDevtools position='bottom' buttonPosition='bottom-left' />
      </QueryClientProvider>
    </JotaiProvider>
  )
}
