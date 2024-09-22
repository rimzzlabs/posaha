import { A, F, O, pipe, S } from '@mobily/ts-belt'
import { match } from 'ts-pattern'

type StrictT<T> = T extends { ok: TAny } ? never : T extends Array<TAny> ? never : T

type TActionReturn<T extends 'success' | 'error'> = T extends 'success'
  ? <D extends Record<string, TAny>>(data: StrictT<D>) => { ok: true } & D
  : <E extends string>(error: E) => { ok: false; error: typeof error }

export function actionReturn<T extends 'success' | 'error'>(type: T): TActionReturn<T> {
  if (type === 'success') {
    return (<D>(data: D = {} as D) => ({ ...data, ok: true })) as TActionReturn<T>
  }
  return (<E extends string>(error: E) => ({ ok: false, error })) as TActionReturn<T>
}

export function extractDatabaseError(message: string) {
  return match(
    pipe(
      message,
      S.split(' '),
      A.last,
      O.mapWithDefault('Server error', F.identity),
      S.replaceAll('"', ''),
    ),
  )
    .with('user_ktp_unique', () => 'Ktp Unique' as const)
    .with('user_email_unique', () => 'Email Unique' as const)
    .otherwise(() => 'Server Error' as const)
}
