import { cn } from '@/lib/utils'

import type { ComponentPropsWithoutRef } from 'react'

export function PublicWrapper(props: ComponentPropsWithoutRef<'div'>) {
  return <div {...props} className={cn('mx-auto w-11/12 max-w-6xl pt-16', props.className)} />
}
