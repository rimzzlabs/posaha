import { SessionCheck } from '@/components/ui/session-check'

import { HeaderContainer } from '@/layouts/header'
import { SidebarContainer } from '@/layouts/sidebar'
import { PrivateWrapper } from '@/layouts/wrappers'

import { Fragment, PropsWithChildren } from 'react'

export default function AdminLayout(props: PropsWithChildren) {
  return (
    <Fragment>
      <SessionCheck />
      <HeaderContainer />
      <SidebarContainer />
      <PrivateWrapper>{props.children}</PrivateWrapper>
    </Fragment>
  )
}
