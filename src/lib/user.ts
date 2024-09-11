import { B, F, N, pipe, S } from '@mobily/ts-belt'

export function isValidNik(ktpNumber: string) {
  return pipe(
    ktpNumber,
    S.toLowerCase,
    S.replaceByRe(/\s+/g, ''),
    S.replaceByRe(/\D/g, ''),
    S.length,
    F.ifElse(
      (value) => pipe(value, N.gt(16), B.or(pipe(value, N.lt(16)))),
      () => false,
      () => true,
    ),
  )
}
