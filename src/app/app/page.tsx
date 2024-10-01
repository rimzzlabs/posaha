import { HeadingTwo } from '@/components/ui/headings'

import { getDashboard } from '@/database/query/sales'
import { formatPrice } from '@/lib/number'
import { DashboardCard, DashboardChart, DashboardTransaction } from '@/modules/dashboard'
import { auth } from '@/server/next-auth'

import { B, F, O, pipe } from '@mobily/ts-belt'
import { CircleDollarSignIcon, PackageCheckIcon, PackageIcon, UsersIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import { Fragment } from 'react'

export default async function AdminDashboardPage() {
  let [session, dashboard] = await Promise.all([auth(), getDashboard()])

  let role = pipe(session?.user?.role, O.fromNullable, O.mapWithDefault('cashier', F.identity))
  let isUserAdmin = role !== 'cashier'

  if (!isUserAdmin) redirect('/app/transaction/cashier')

  let latestTransaction = dashboard.data.transactions
  let cardsData = dashboard.data.cards
  let chartData = dashboard.data.chartData

  return (
    <Fragment>
      <div className='flex items-center justify-between'>
        <HeadingTwo>Dasbor</HeadingTwo>
      </div>

      {B.ifElse(
        isUserAdmin,
        () => (
          <div className='grid gap-2 pt-6 sm:grid-cols-2 2xl:grid-cols-4'>
            <DashboardCard
              formatter={formatPrice}
              label='Total Penjualan'
              icon={CircleDollarSignIcon}
              value={cardsData.totalRevenue}
            />
            <DashboardCard
              label='Total Produk Terjual'
              icon={PackageCheckIcon}
              value={cardsData.totalProductSold}
            />
            <DashboardCard label='Total Produk' icon={PackageIcon} value={cardsData.totalProduct} />
            <DashboardCard
              label='Jumlah Kasir Beroperasi'
              icon={UsersIcon}
              value={cardsData.totalCashier}
            />
          </div>
        ),
        () => null,
      )}

      {B.ifElse(
        isUserAdmin,
        () => (
          <div className='grid gap-2 pt-2 xl:grid-cols-[minmax(484px,896px)_minmax(400px,1fr)]'>
            <DashboardChart data={chartData} />
            <DashboardTransaction data={latestTransaction} />
          </div>
        ),
        () => null,
      )}
    </Fragment>
  )
}
