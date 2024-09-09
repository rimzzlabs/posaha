import { cn } from '@/lib/utils'

import { ComponentPropsWithoutRef } from 'react'

export function HeadingOne(props: ComponentPropsWithoutRef<'h1'>) {
  return (
    <h1
      {...props}
      className={cn('text-4xl md:text-5xl font-bold tracking-tight', props.className)}
    />
  )
}

export function HeadingTwo(props: ComponentPropsWithoutRef<'h2'>) {
  return (
    <h2
      {...props}
      className={cn('text-xl md:text-3xl font-bold tracking-tight', props.className)}
    />
  )
}

export function HeadingThree(props: ComponentPropsWithoutRef<'h3'>) {
  return (
    <h3
      {...props}
      className={cn('text-lg md:text-xl font-semibold tracking-tight', props.className)}
    />
  )
}
