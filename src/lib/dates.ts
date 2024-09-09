import { format } from 'date-fns'
import { id } from 'date-fns/locale'

/**
 *
 * @param date should be valid date
 * @param token the unicode token that `date-fns` can parse
 * @default token "EEEE, dd MMM, yyyy - HH:mm"
 * @returns
 */
export function formatDate(date: string | number | Date, token = 'EEEE, dd MMM, yyyy - HH:mm') {
  return format(date, token, { locale: id })
}
