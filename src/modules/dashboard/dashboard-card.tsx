import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { F } from '@mobily/ts-belt'
import { PackageIcon, type LucideIcon } from 'lucide-react'
import { toFloat } from 'radash'
import { match, P } from 'ts-pattern'

type TDashboardCard = {
  label: string
  value: string | number
  icon: LucideIcon
  formatter?: (value: number) => string
}

export function DashboardCard(props: TDashboardCard) {
  let icon = match(props.icon)
    .with(P.nullish, () => <PackageIcon size='1em' />)
    .otherwise((Icon) => <Icon size='1em' />)

  let formatter = match(props.formatter)
    .with(P.instanceOf(Function), F.identity)
    .otherwise(() => F.identity)

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{props.label}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <p className='mb-2 text-2xl font-bold'>{formatter(toFloat(props.value, 1))}</p>
      </CardContent>
    </Card>
  )
}
