type User = TPrettify<
  {
    id: string
    email: string
    password: string
  } & TTimeStamp
>

type UserRole = TPrettify<
  {
    id: string
    name: 'admin' | 'cashier'
  } & TTimeStamp
>

type UserProfile = TPrettify<
  {
    id: string
    userId: string
    fullName: string
    role: UserRole
  } & Omit<User, 'password' | 'id'>
>
