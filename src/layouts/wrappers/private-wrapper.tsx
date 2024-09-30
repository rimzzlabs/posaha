import { cn } from '@/lib/utils'

import type { ComponentPropsWithoutRef } from 'react'

export function PrivateWrapper(props: ComponentPropsWithoutRef<'main'>) {
  return (
    <main className={cn('pl-56 pt-16 max-xl:pl-0 xl:pl-72', props.className)} {...props}>
      <div className='px-2 py-6 lg:px-6'>{props.children}</div>
    </main>
  )
}
