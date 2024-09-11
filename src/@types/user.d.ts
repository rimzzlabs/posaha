type User = TPrettify<
  {
    id: string
    email: string
    password: string
  } & TTimeStamp
>

type UserProfile = TPrettify<
  {
    id: string
    avatar?: string | null
    userId: string
    fullName: string
    address: string
    role: UserRole
  } & Omit<User, 'password' | 'id'>
>
