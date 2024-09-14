import { Button } from '@/components/ui/button'

import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

export function PublicHeaderNavbarItem(props: PropsWithChildren<{ href: Url }>) {
  return (
    <Button asChild>
      <Link href={props.href}>{props.children}</Link>
    </Button>
  )
}
