import { ScrollArea } from '@/components/ui/scroll-area'

import { cn } from '@/lib/utils'

import { ComponentPropsWithoutRef } from 'react'

export function PrivateWrapper(props: ComponentPropsWithoutRef<'main'>) {
  return (
    <main className={cn('pt-16 pl-72', props.className)} {...props}>
      <div className='p-4 md:p-10 bg-muted'>
        <div className='bg-background p-6 md:p-10 rounded-xl'>
          <ScrollArea className='h-[calc(100vh-4rem-2rem-3rem)] md:h-[calc(100vh-4rem-5rem-5rem)] pr-4'>
            {props.children}
          </ScrollArea>
        </div>
      </div>
    </main>
  )
}
