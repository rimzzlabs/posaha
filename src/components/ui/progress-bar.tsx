'use client'

import { F, S } from '@mobily/ts-belt'
import { AppProgressBar as NProgressBar } from 'next-nprogress-bar'
import { useTheme } from 'next-themes'

export function ProgressBar() {
  let { theme } = useTheme()

  let color = F.ifElse(
    F.defaultTo('system')(theme),
    S.includes('dark'),
    () => 'hsl(var(--primary))',
    () => 'hsl(var(--primary))',
  )

  return (
    <NProgressBar
      shallowRouting
      options={{ showSpinner: false, minimum: 30 }}
      color={color}
      height='4px'
    />
  )
}
