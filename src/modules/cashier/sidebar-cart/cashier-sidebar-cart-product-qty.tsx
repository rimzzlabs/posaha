'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { deleteCartQtyAtom, updateCartQtyAtom } from '@/states/storage'

import { N, pipe, S } from '@mobily/ts-belt'
import { useSetAtom } from 'jotai'
import { MinusIcon, PlusIcon } from 'lucide-react'
import { toFloat } from 'radash'
import type { ChangeEvent } from 'react'

type TCashierSidebarCartProductQty = { qty: number; id: string; stock: number }

export function CashierSidebarCartProductQty(props: TCashierSidebarCartProductQty) {
  let updateQty = useSetAtom(updateCartQtyAtom)
  let removeProductInCart = useSetAtom(deleteCartQtyAtom)

  let onDecrement = (prevQty: number) => () => {
    updateQty({ id: props.id, qty: pipe(prevQty, N.subtract(1)) })
  }
  let onIncrement = (prevQty: number) => () => {
    updateQty({ id: props.id, qty: pipe(prevQty, N.add(1)) })
  }
  let onBlur = (id: string, prevQty: number) => (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    let isEmptyString = pipe(value, S.replaceByRe(/s+/g, ''), S.length, N.lt(1))
    if (isEmptyString) {
      e.target.value = String(prevQty)
      return
    }

    let qty = toFloat(value, 0)
    if (qty === 0) return removeProductInCart(props.id)

    if (qty > props.stock) return updateQty({ id: props.id, qty: 10 })

    updateQty({ id, qty })
  }

  return (
    <div className='grid grid-cols-[repeat(3,minmax(0,max-content))] gap-2'>
      <Button
        variant='outline'
        className='w-9 px-0'
        onClick={onDecrement(props.qty)}
        disabled={N.lte(props.qty, 1)}
      >
        <MinusIcon size='1rem' />
      </Button>

      <Input
        min={1}
        max={props.stock}
        type='number'
        placeholder='1'
        autoComplete='off'
        inputMode='numeric'
        className='w-12'
        key={props.qty}
        defaultValue={props.qty}
        onBlur={onBlur(props.id, props.qty)}
      />

      <Button
        variant='outline'
        className='w-9 px-0'
        onClick={onIncrement(props.qty)}
        disabled={N.gte(props.qty, props.stock)}
      >
        <PlusIcon size='1rem' />
      </Button>
    </div>
  )
}
