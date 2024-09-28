import { CardHeader, CardTitle } from '@/components/ui/card'
import { SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'

import { B } from '@mobily/ts-belt'

export function CashierSidebarCartHeader(props: { asSheet?: boolean }) {
  return B.ifElse(
    Boolean(props?.asSheet),
    () => (
      <SheetHeader>
        <SheetTitle>Keranjang Belanja</SheetTitle>
        <SheetDescription>Informasi keranjang belanjaan pelanggan untuk saat ini</SheetDescription>
      </SheetHeader>
    ),
    () => (
      <CardHeader className='h-16 flex-row items-center justify-between'>
        <CardTitle>Keranjang Belanja</CardTitle>
      </CardHeader>
    ),
  )
}
