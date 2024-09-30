import { For } from '@/components/ui/for'
import { HeadingTwo } from '@/components/ui/headings'

import { formatPrice } from '@/lib/number'
import {
  DashboardCard,
  DashboardChart,
  DashboardFilter,
  DashboardTransaction,
} from '@/modules/dashboard'
import { auth } from '@/server/next-auth'

import { A, B, F, N, O, pipe } from '@mobily/ts-belt'
import { DollarSignIcon, PackageCheckIcon, PackagePlusIcon, UsersIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import { draw, random, sleep, toFloat, uid } from 'radash'
import { Fragment } from 'react'

export default async function AdminDashboardPage() {
  let [session, cardsData, chartData, latestTrx] = await Promise.all([
    auth(),
    getCardsData(),
    getChartData(),
    getLatestTransaction(),
  ])

  let role = pipe(session?.user?.role, O.fromNullable, O.mapWithDefault('cashier', F.identity))
  let isUserAdmin = role !== 'cashier'

  if (!isUserAdmin) redirect('/app/transaction/cashier')

  return (
    <Fragment>
      <div className='flex items-center justify-between'>
        <HeadingTwo>Dasbor</HeadingTwo>

        <DashboardFilter />
      </div>

      {B.ifElse(
        isUserAdmin,
        () => (
          <div className='grid gap-2 pt-6 sm:grid-cols-2 2xl:grid-cols-4'>
            <For each={cardsData}>
              {(item, index) => (
                <DashboardCard
                  formatter={index === 0 ? formatPrice : undefined}
                  percentage={item.percentage}
                  label={item.label}
                  icon={item.icon}
                  value={item.value}
                />
              )}
            </For>
          </div>
        ),
        () => null,
      )}

      {B.ifElse(
        isUserAdmin,
        () => (
          <div className='grid gap-2 pt-2 xl:grid-cols-[minmax(484px,896px)_minmax(400px,1fr)]'>
            <DashboardChart data={chartData} />
            <DashboardTransaction data={latestTrx} />
          </div>
        ),
        () => null,
      )}
    </Fragment>
  )
}

async function getCardsData() {
  await sleep(random(1000, 2500))

  let getLabel = (index: number) =>
    ({
      0: 'Total Penjualan',
      1: 'Total Produk Terjual',
      2: 'Total Produk Baru',
      3: 'Total Kasir Beroperasi',
    })[index] || '--'

  let getValue = (index: number) =>
    index === 0 ? random(10_000_000, 120_000_000) : random(50, 500)

  let getIcon = (index: number) =>
    ({
      0: DollarSignIcon,
      1: PackageCheckIcon,
      2: PackagePlusIcon,
      3: UsersIcon,
    })[index] || DollarSignIcon

  let getPercentage = () => toFloat((Math.random() * 100).toFixed(2), 0.0)

  return pipe(
    4,
    A.makeWithIndex((index) => ({
      label: getLabel(index),
      value: getValue(index),
      percentage: getPercentage(),
      icon: getIcon(index),
    })),
    F.toMutable,
  )
}

async function getChartData() {
  await sleep(random(500, 700))
  let dates = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ]

  return pipe(
    dates.length,
    A.makeWithIndex((index) => ({
      month: pipe(dates, A.get(index), O.mapWithDefault('-', F.identity)),
      sale: B.ifElse(N.gt(7)(index), F.always(0), () => random(50_000_000, 120_000_000)),
    })),
    F.toMutable,
  )
}

async function getLatestTransaction() {
  await sleep(random(800, 1000))
  let products = ['Minyakita 1L', 'Gula Pasir 1KG', 'Saus ABC 500ML', 'Kecap Bango 1L']
  let makeTrx = (n: number) => {
    let price = random(5000, 32500)
    let qty = random(1, 10)
    let total = N.multiply(price)(qty)
    let name = draw(products) || 'Minyakita 1L'
    let time = new Date()
    time.setMinutes(time.getMinutes() - n)
    let timestamp = time.toISOString()

    return {
      id: uid(14),
      name,
      price,
      qty,
      total,
      timestamp,
    }
  }

  return pipe(10, A.makeWithIndex(makeTrx), F.toMutable)
}
