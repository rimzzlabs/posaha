'use client'

import { Button, ButtonProps } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { For } from '@/components/ui/for'

import { getSidebarList } from '@/lib/constant'

import { F } from '@mobily/ts-belt'
import { ArrowUpRight, ChevronDownIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'
import { match } from 'ts-pattern'

export function SidebarMenu() {
  let pathname = usePathname()
  let menu = getSidebarList(pathname)

  return (
    <nav className='flex flex-col gap-2'>
      <For each={menu}>
        {(group) => {
          if (!group.visible) return <Fragment />

          return (
            <div className='px-2.5 lg:px-4 pt-6'>
              {group.label && (
                <p className='text-muted-foreground select-none text-sm font-semibold mb-2'>
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
                        <Button className='gap-x-2 justify-normal' variant={variant} asChild>
                          <Link href={path}>
                            <Icon size='1rem' /> {label}
                          </Link>
                        </Button>
                      )
                    }

                    return (
                      <Collapsible>
                        <CollapsibleTrigger asChild>
                          <Button variant={variant} className='justify-normal w-full'>
                            <Icon size='1rem' className='mr-1' />
                            {label}
                            <ChevronDownIcon size='1rem' className='ml-auto' />
                          </Button>
                        </CollapsibleTrigger>

                        <CollapsibleContent className='flex flex-col gap-x-1 pl-3 py-px'>
                          <For each={subMenus}>
                            {({ label, path, icon: Icon, newTab }, key) => (
                              <Button
                                asChild
                                key={key}
                                variant='ghost'
                                className='gap-x-2 justify-normal'
                              >
                                <Link
                                  target={newTab ? '_blank' : '_self'}
                                  rel='noopener noreferrer'
                                  href={path}
                                >
                                  <Icon size='1em' />
                                  {label}
                                  {newTab && <ArrowUpRight size='0.75rem' className='ml-auto' />}
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
    </nav>
  )
}
