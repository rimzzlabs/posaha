import type { QueryClientConfig } from '@tanstack/react-query'

export const QUERY_CLIENT_CONFIG: QueryClientConfig = {
  defaultOptions: {
    queries: { refetchOnWindowFocus: process.env.NODE_ENV === 'production' },
  },
}
