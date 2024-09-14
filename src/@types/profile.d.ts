type Profile = TPrettify<
  {
    id: string
    avatar?: string
    fullName: string
    email: string
    role: UserRole['name']
  } & TTimeStamp
>
