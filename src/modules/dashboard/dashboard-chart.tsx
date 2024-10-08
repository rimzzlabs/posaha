'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

import { NEXT_PUBLIC_TAX_FEE } from '@/lib/configs/environment-client'
import { formatPrice } from '@/lib/number'

import type { Option } from '@mobily/ts-belt'
import { A, D, F, N, O, pipe } from '@mobily/ts-belt'
import { toFloat } from 'radash'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

let chartConfig = {
  sale: {
    label: 'Pendapatan',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

type TDashboardChart = {
  data: Option<Array<{ month: string; revenue: number }>>
}

const PPH_TAX = toFloat(NEXT_PUBLIC_TAX_FEE, 0)

export function DashboardChart(props: TDashboardChart) {
  let data = pipe(props.data, O.mapWithDefault([], F.identity))
  let grossRevenue = pipe(data, A.map(D.getUnsafe('revenue')), A.reduce(0, N.add))
  let netRevenue = pipe(
    data,
    A.map((value) => ({ revenue: value.revenue, tax: value.revenue * PPH_TAX })),
    A.map((value) => N.subtract(value.tax)(value.revenue)),
    A.reduce(0, N.add),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grafis Chart Penjualan</CardTitle>
        <CardDescription>Data penjualan periode Tahun 2024</CardDescription>
      </CardHeader>
      <CardContent className='w-full'>
        <ChartContainer config={chartConfig} className='h-32 w-full sm:h-52 md:h-56 xl:h-[31rem]'>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator='line' />} />
            <Bar dataKey='revenue' fill='var(--color-sale)' radius={6} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col items-start gap-2 text-sm'>
        <p className='font-medium leading-none text-muted-foreground'>
          Total pendapatan kotor mencapai {formatPrice(grossRevenue)}
        </p>
        <p className='font-medium leading-none text-muted-foreground'>
          Total pendapatan bersih setelah dipotong PPH sebesar (5%) mencapai{' '}
          {formatPrice(netRevenue)}
        </p>
      </CardFooter>
    </Card>
  )
}
