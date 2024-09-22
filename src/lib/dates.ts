import { format } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'
import { id } from 'date-fns/locale'

/**
 *
 * @param date should be valid date
 * @param token the unicode token that `date-fns` can parse
 * @default token "EEEE, dd MMM, yyyy - HH:mm"
 * @returns
 */
export function formatDate(date: string | number | Date, token = 'EEEE, dd MMM, yyyy - hh:mm') {
  const zonedTime = toZonedTime(date, 'Asia/Jakarta', { timeZone: 'GMT' })
  return format(zonedTime, token, { locale: id })
}
