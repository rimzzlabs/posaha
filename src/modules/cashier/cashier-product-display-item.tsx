'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { B } from '@mobily/ts-belt'
import { Loader2Icon, PlusIcon } from 'lucide-react'
import Image from 'next/image'
import { random, sleep } from 'radash'
import * as R from 'react'
import { toast } from 'sonner'

type TCashierProductDisplayItem = {
  id: string
  name: string
  image: string
  description: string
  stock: number
  price: string
  category: {
    name: string
  }
}

export function CashierProductDisplayItem(props: TCashierProductDisplayItem) {
  let [isPending, setIsPending] = R.useState(false)

  let buttonIcon = B.ifElse(
    isPending,
    () => <Loader2Icon size='1em' className='animate-spin-ease' />,
    () => <PlusIcon size='1em' />,
  )

  let addToCart = async () => {
    toast.dismiss()
    setIsPending(true)
    await sleep(random(1200, 2000))
    toast.success('Berhasil menambahkan produk ke keranjang belanja')
    setIsPending(false)
  }

  return (
    <Card>
      <Image
        src={props.image}
        alt={props.name}
        width={265}
        height={148}
        loading='lazy'
        className='shrink-0 grow-0'
      />
      <CardHeader className='p-4'>
        <CardTitle className='sr-only'>{props.name}</CardTitle>
        <CardDescription>{props.name}</CardDescription>

        <p className='font-bold'>{props.price}</p>
        <Badge variant='secondary' className='max-w-max'>
          {props.category.name}
        </Badge>
      </CardHeader>
      <CardFooter className='p-4 pb-3 pt-0'>
        <Button disabled={isPending} onClick={addToCart} size='sm' className='gap-x-2'>
          {buttonIcon}
          Keranjang
        </Button>
      </CardFooter>
    </Card>
  )
}
