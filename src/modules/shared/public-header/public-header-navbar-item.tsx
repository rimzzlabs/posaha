import { Button } from '@/components/ui/button'

import type { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import type { PropsWithChildren } from 'react'

export function PublicHeaderNavbarItem(props: PropsWithChildren<{ href: Url }>) {
  return (
    <Button asChild>
      <Link href={props.href}>{props.children}</Link>
    </Button>
  )
}
