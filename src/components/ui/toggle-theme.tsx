'use client'

import { Button } from './button'

import { useIsClient } from '@uidotdev/usehooks'
import { Loader2, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { P, match } from 'ts-pattern'

export function ToggleTheme() {
  let isClient = useIsClient()
  let { theme, setTheme } = useTheme()

  let toggleTheme = () => {
    let nextTheme = match(theme)
      .with('dark', () => 'light')
      .otherwise(() => 'dark')

    setTheme(nextTheme)
  }

  let icon = match([theme, isClient])
    .with([P._, false], () => <Loader2 size='1rem' className='animate-spin' />)
    .with(['dark', P._], () => <MoonIcon size='1rem' />)
    .otherwise(() => <SunIcon size='1rem' />)

  return (
    <Button onClick={toggleTheme} className='size-9 p-0' variant='ghost'>
      {icon}
      <span className='sr-only'>Siang</span>
    </Button>
  )
}
