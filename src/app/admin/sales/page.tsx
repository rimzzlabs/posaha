import { For } from '@/components/ui/for'
import { HeadingTwo } from '@/components/ui/headings'

import { formatPrice } from '@/lib/number'
import { SalesCard, SalesDatePicker, SalesRecentTransaction } from '@/modules/sales'
import { SalesChart } from '@/modules/sales/sales-chart'

import { A, F, O, pipe } from '@mobily/ts-belt'
import { DollarSignIcon, PackageCheckIcon, PackagePlusIcon, UsersIcon } from 'lucide-react'
import { random, sleep, toFloat } from 'radash'
import { Fragment } from 'react'

let getCardsData = async () => {
  await sleep(random(1000, 2500))

  let getLabel = (index: number) =>
    ({
      0: 'Total Penjualan',
      1: 'Total Produk Terjual',
      2: 'Total Produk Baru',
      3: 'Total Pengguna Baru',
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

let getChartData = async () => {
  await sleep(random(500, 700))
  let dates = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli']

  return pipe(
    dates.length,
    A.makeWithIndex((index) => ({
      month: pipe(dates, A.get(index), O.mapWithDefault('-', F.identity)),
      sale: random(6_000_000, 20_000_000),
    })),
    F.toMutable,
  )
}

export default async function Sales() {
  let [cardsData, chartData] = await Promise.all([getCardsData(), getChartData()])

  return (
    <Fragment>
      <div className='flex items-center justify-between'>
        <HeadingTwo>Laporan Penjualan</HeadingTwo>

        <SalesDatePicker />
      </div>

      <div className='grid grid-cols-4 gap-3 pt-8'>
        <For each={cardsData}>
          {(item, index) => (
            <SalesCard
              formatter={index === 0 ? formatPrice : undefined}
              percentage={item.percentage}
              label={item.label}
              icon={item.icon}
              value={item.value}
            />
          )}
        </For>
      </div>

      <div className='pt-3 grid grid-cols-[minmax(484px,896px)_minmax(240px,1fr)] gap-3'>
        <SalesChart data={chartData} />
        <SalesRecentTransaction />
      </div>
    </Fragment>
  )
}
