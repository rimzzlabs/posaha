import { pipe, O, Option } from '@mobily/ts-belt'

export function formatPrice(number: Option<number>) {
  let intl = new Intl.NumberFormat('id', {
    currency: 'IDR',
    style: 'currency',
  })
  return pipe(
    O.fromNullable(number),
    O.match(intl.format, () => 'Rp 0'),
  )
}

export function formatPriceCompact(number: Option<number>) {
  let intl = new Intl.NumberFormat('id', {
    currency: 'IDR',
    style: 'currency',
    notation: 'compact',
    minimumFractionDigits: 2,
    compactDisplay: 'long',
  })
  return pipe(
    O.fromNullable(number),
    O.match(intl.format, () => 'Rp 0'),
  )
}
