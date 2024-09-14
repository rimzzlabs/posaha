import { HeaderContainer } from '@/layouts/header'
import { SidebarContainer } from '@/layouts/sidebar'
import { PrivateWrapper } from '@/layouts/wrappers'

import { Fragment, PropsWithChildren } from 'react'

export default function AdminLayout(props: PropsWithChildren) {
  return (
    <Fragment>
      <HeaderContainer />
      <SidebarContainer />
      <PrivateWrapper>{props.children}</PrivateWrapper>
    </Fragment>
  )
}
