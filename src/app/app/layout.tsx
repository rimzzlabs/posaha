import { SessionCheck } from '@/components/ui/session-check'

import { HeaderContainer } from '@/layouts/header'
import { SidebarContainer } from '@/layouts/sidebar'
import { PrivateWrapper } from '@/layouts/wrappers'

import dynamic from 'next/dynamic'
import { Fragment, type PropsWithChildren } from 'react'

let SidebarSheet = dynamic(
  () => import('@/layouts/sidebar/sidebar-sheet').then((mod) => ({ default: mod.SidebarSheet })),
  { ssr: false },
)

export default function AdminLayout(props: PropsWithChildren) {
  return (
    <Fragment>
      <SessionCheck />
      <HeaderContainer />
      <SidebarContainer />
      <SidebarSheet />
      <PrivateWrapper>{props.children}</PrivateWrapper>
    </Fragment>
  )
}
