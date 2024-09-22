'use client'

import type { ButtonProps } from '@/components/ui/button'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { For } from '@/components/ui/for'
import { Skeleton } from '@/components/ui/skeleton'

import { getSidebarList } from '@/lib/constant'

import { B, F, O, pipe } from '@mobily/ts-belt'
import { ArrowUpRight, ChevronDownIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { list } from 'radash'
import { Fragment } from 'react'
import { match } from 'ts-pattern'

export function SidebarMenu() {
  let pathname = usePathname()
  let session = useSession()

  let role = pipe(session.data?.user.role, O.fromNullable, O.mapWithDefault('cashier', F.identity))
  let menu = getSidebarList(pathname, role)

  return (
    <nav className='flex flex-col gap-2'>
      {B.ifElse(
        ['loading', 'unauthenticated'].includes(session.status),
        () => (
          <div className='flex flex-col gap-4 px-2.5 pt-6 lg:px-4'>
            <For each={list(8)}>{() => <Skeleton className='h-8 w-full' />}</For>
          </div>
        ),
        () => (
          <For each={menu}>
            {(group) => {
              if (!group.visible) return <Fragment />

              return (
                <div className='px-2.5 pt-6 lg:px-4'>
                  {group.label && (
                    <p className='mb-2 select-none text-sm font-semibold text-muted-foreground'>
                      {group.label}
                    </p>
                  )}

                  <div className='flex flex-col gap-1'>
                    <For each={group.menus}>
                      {({ label, path, icon: Icon, ...args }) => {
                        if (!args.visible) return <Fragment />

                        let subMenus = F.defaultTo(
                          args.subMenus,
                          [] as NonNullable<typeof args.subMenus>,
                        )
                        let variant = match<boolean, ButtonProps['variant']>(args.active)
                          .with(true, () => 'secondary')
                          .otherwise(() => 'ghost')

                        if (subMenus.length === 0) {
                          return (
                            <Button className='justify-normal gap-x-2' variant={variant} asChild>
                              <Link href={path}>
                                <Icon size='1rem' /> {label}
                              </Link>
                            </Button>
                          )
                        }

                        return (
                          <Collapsible>
                            <CollapsibleTrigger asChild>
                              <Button variant={variant} className='w-full justify-normal'>
                                <Icon size='1rem' className='mr-1' />
                                {label}
                                <ChevronDownIcon size='1rem' className='ml-auto' />
                              </Button>
                            </CollapsibleTrigger>

                            <CollapsibleContent className='flex flex-col gap-x-1 py-px pl-3'>
                              <For each={subMenus}>
                                {({ label, path, icon: Icon, newTab }, key) => (
                                  <Button
                                    asChild
                                    key={key}
                                    variant='ghost'
                                    className='justify-normal gap-x-2'
                                  >
                                    <Link
                                      target={newTab ? '_blank' : '_self'}
                                      rel='noopener noreferrer'
                                      href={path}
                                    >
                                      <Icon size='1em' />
                                      {label}
                                      {newTab && (
                                        <ArrowUpRight size='0.75rem' className='ml-auto' />
                                      )}
                                    </Link>
                                  </Button>
                                )}
                              </For>
                            </CollapsibleContent>
                          </Collapsible>
                        )
                      }}
                    </For>
                  </div>
                </div>
              )
            }}
          </For>
        ),
      )}
    </nav>
  )
}
