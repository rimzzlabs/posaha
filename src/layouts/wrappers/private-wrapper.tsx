import { cn } from '@/lib/utils'

import type { ComponentPropsWithoutRef } from 'react'

export function PrivateWrapper(props: ComponentPropsWithoutRef<'main'>) {
  return (
    <main className={cn('pl-56 pt-16 max-lg:pl-0 xl:pl-72', props.className)} {...props}>
      <div className='px-2 lg:p-6'>{props.children}</div>
    </main>
  )
}
