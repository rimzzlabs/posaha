import type { Option } from '@mobily/ts-belt'
import type { Session } from 'next-auth'

declare global {
  type TPrettify<T> = {
    [K in keyof T]: T[K]
  } & {}

  type TApiErrorResponse = {
    errors: Array<string>
    code: number
    status: 'error'
  }

  type TApiSuccessResponse<D> = {
    code: number
    errors: Array<never>
    status: 'success'
    data: D
  }

  type TApiResponse<D> = TPrettify<TApiSuccessResponse<D> | TApiErrorResponse>

  type TTimeStamp = {
    updatedAt: string
    createdAt: string
  }

  type TPromiseReturn<D> = Awaited<ReturnType<D>>

  type TPageProps = {
    params: Record<string, string>
    searchParams: Record<string, string>
  }

  type TWithSession = { session: Option<Session> }
}

export {}
