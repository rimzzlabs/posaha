import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { TransactionCashierProductDisplay } from '@/modules/cashier'
import { auth } from '@/server/next-auth'

import { F, O, pipe } from '@mobily/ts-belt'
import { redirect, RedirectType } from 'next/navigation'

export default async function TransactionCashierPage() {
  let session = await auth()

  let role = pipe(O.fromNullable(session?.user?.role), O.mapWithDefault('cashier', F.identity))
  if (role !== 'cashier') redirect('/app', RedirectType.replace)

  return (
    <div className='grid gap-4 xl:grid-cols-[minmax(480px,768px)_minmax(280px,1fr)] 3xl:grid-cols-[minmax(768px,1280px)_minmax(480px,1fr)]'>
      <TransactionCashierProductDisplay />

      <Card>
        <CardHeader>
          <CardTitle>Keranjang Belanja</CardTitle>
          <CardDescription>
            Pastikan keranjang belanja sesuai dengan apa yang diinginkan pelanggan
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
