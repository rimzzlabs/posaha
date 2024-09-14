import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { F } from '@mobily/ts-belt'
import { PackageIcon, type LucideIcon } from 'lucide-react'
import { toFloat } from 'radash'
import { match, P } from 'ts-pattern'

type TDashboardCard = {
  label: string
  value: string | number
  percentage: number
  icon: LucideIcon
  formatter?: (value: number) => string
}

export function DashboardCard(props: TDashboardCard) {
  let icon = match(props.icon)
    .with(P.nullish, () => <PackageIcon size='1em' />)
    .otherwise((Icon) => <Icon size='1em' />)

  let formatter = match(props.formatter)
    .with(P.instanceOf(Function), (f) => f)
    .otherwise(() => F.identity)

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='font-medium text-sm'>{props.label}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <p className='text-2xl font-bold mb-2'>{formatter(toFloat(props.value, 1))}</p>
        <p className='text-xs text-muted-foreground'>{props.percentage}% dari bulan lalu</p>
      </CardContent>
    </Card>
  )
}
