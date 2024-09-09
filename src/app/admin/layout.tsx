import { AdminHeaderContainer } from '@/layouts/admin/admin-header'
import { AdminSidebarContainer } from '@/layouts/admin/admin-sidebar'
import { PrivateWrapper } from '@/layouts/wrappers'

import { Fragment, PropsWithChildren } from 'react'

export default function AdminLayout(props: PropsWithChildren) {
  return (
    <Fragment>
      <AdminHeaderContainer />
      <AdminSidebarContainer />
      <PrivateWrapper>{props.children}</PrivateWrapper>
    </Fragment>
  )
}
