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

import { formatPrice } from '@/lib/number'

import { A, D, N, O, Option, pipe } from '@mobily/ts-belt'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

let chartConfig = {
  sale: {
    label: 'Pendapatan',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

let PPH_TAX = 0.005 // 0.5%

type TDashboardChart = {
  data: Option<Array<{ month: string; sale: number }>>
}
export function DashboardChart(props: TDashboardChart) {
  let data = pipe(
    props.data,
    O.fromNullable,
    O.mapWithDefault([], (data) => data),
  )
  let netRevenue = pipe(
    data,
    A.map(D.getUnsafe('sale')),
    A.map((value) => N.subtract(value * PPH_TAX)(value)),
    A.reduce(0, N.add),
  )
  let grossRevenue = pipe(data, A.map(D.getUnsafe('sale')), A.reduce(0, N.add))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grafis Chart Penjualan</CardTitle>
        <CardDescription>January - Juli 2024</CardDescription>
      </CardHeader>
      <CardContent className='w-full'>
        <ChartContainer config={chartConfig} className='h-32 sm:h-52 md:h-56 xl:h-96 w-full'>
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
            <Bar dataKey='sale' fill='var(--color-sale)' radius={6} />
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
