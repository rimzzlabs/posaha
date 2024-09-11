import { HeadingOne } from '@/components/ui/headings'

import { CreateUserForm } from '@/modules/user/create-user'

import { Fragment } from 'react'

export default function CreateUserPage() {
  return (
    <Fragment>
      <HeadingOne>Tambah Penguna Baru</HeadingOne>
      <CreateUserForm />
    </Fragment>
  )
}
