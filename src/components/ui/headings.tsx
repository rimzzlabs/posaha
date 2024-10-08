import { cn } from '@/lib/utils'

import type { ComponentPropsWithoutRef } from 'react'

export function HeadingOne(props: ComponentPropsWithoutRef<'h1'>) {
  return (
    <h1
      {...props}
      className={cn('text-4xl font-bold tracking-tight md:text-5xl', props.className)}
    />
  )
}

export function HeadingTwo(props: ComponentPropsWithoutRef<'h2'>) {
  return (
    <h2
      {...props}
      className={cn('text-xl font-bold tracking-tight md:text-3xl', props.className)}
    />
  )
}

export function HeadingThree(props: ComponentPropsWithoutRef<'h3'>) {
  return (
    <h3
      {...props}
      className={cn('text-lg font-semibold tracking-tight md:text-xl', props.className)}
    />
  )
}
