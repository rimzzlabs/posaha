'use client'

import { AppProgressBar as NProgressBar } from 'next-nprogress-bar'

export function ProgressBar() {
  return (
    <NProgressBar
      shallowRouting
      startPosition={25}
      options={{ showSpinner: false }}
      color='hsl(var(--primary))'
      height='4px'
    />
  )
}
