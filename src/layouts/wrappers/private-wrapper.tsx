import { cn } from '@/lib/utils'

import { ComponentPropsWithoutRef } from 'react'

export function PrivateWrapper(props: ComponentPropsWithoutRef<'main'>) {
  return (
    <main className={cn('pt-16 pl-56 xl:pl-72 max-lg:pl-0', props.className)} {...props}>
      <div className='px-2 lg:p-6'>{props.children}</div>
    </main>
  )
}
