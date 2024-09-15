type TWithoutOk<T> = T extends { ok: any } ? never : T
type TMetaPagination = { page: number; limit: number; total: number; rows: number }

type TDbQueryReturn<T extends 'success' | 'success-paginate' | 'error'> = T extends 'success'
  ? <D>(data: D) => { ok: true; data: D }
  : T extends 'success-paginate'
    ? <D, M extends TMetaPagination>(data: D, meta: M) => { ok: true; data: D; meta: M }
    : <E extends string>(error: E) => { ok: false; error: typeof error }

type TActionReturn<T extends 'success' | 'error'> = T extends 'success'
  ? <D extends Record<string, any>>(data: TWithoutOk<D>) => { ok: true } & D
  : <E extends string>(error: E) => { ok: false; error: typeof error }

export function dbQueryReturn<T extends 'success' | 'success-paginate' | 'error'>(
  type: T,
): TDbQueryReturn<T> {
  if (type === 'success-paginate') {
    return (<D, M>(data: D, meta: M) => ({ ok: true, data, meta })) as TDbQueryReturn<T>
  }

  if (type === 'success') {
    return (<D>(data: D) => ({ ok: true, data })) as TDbQueryReturn<T>
  }

  return (<E extends string>(error: E) => ({ ok: false, error })) as TDbQueryReturn<T>
}

export function actionReturn<T extends 'success' | 'error'>(type: T): TActionReturn<T> {
  if (type === 'success') {
    return (<D>(data: D = {} as D) => ({ ...data, ok: true })) as TActionReturn<T>
  }
  return (<E extends string>(error: E) => ({ ok: false, error })) as TActionReturn<T>
}
