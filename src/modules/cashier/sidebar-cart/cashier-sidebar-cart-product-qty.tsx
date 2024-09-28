'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useUpdateCartQty } from '@/app/app/product/__hooks'

import { B, N } from '@mobily/ts-belt'
import { MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { toInt } from 'radash'

type TCashierSidebarCartProductQty = { cartItemId: string; quantity: number; stock: number }

export function CashierSidebarCartProductQty(props: TCashierSidebarCartProductQty) {
  let updateCartQty = useUpdateCartQty(props)

  return (
    <div className='ml-auto grid grid-cols-[repeat(3,minmax(0,max-content))] gap-2'>
      {B.ifElse(
        updateCartQty.showDeleteButton,
        () => (
          <Button
            variant='outline'
            className='w-9 px-0'
            onClick={updateCartQty.onClickDelete({
              cartItemId: props.cartItemId,
              userId: updateCartQty.userId,
            })}
          >
            <Trash2Icon size='1rem' />
          </Button>
        ),
        () => (
          <Button
            variant='outline'
            className='w-9 px-0'
            onClick={updateCartQty.onDecrement}
            disabled={N.lte(toInt(updateCartQty.qtyValue, 0), 1)}
          >
            <MinusIcon size='1rem' />
          </Button>
        ),
      )}

      <Input
        min={1}
        type='number'
        placeholder='1'
        className='w-16'
        autoComplete='off'
        inputMode='numeric'
        max={props.stock}
        disabled={!updateCartQty.userId}
        value={updateCartQty.qtyValue}
        onChange={updateCartQty.onChangeQtyValue}
      />

      <Button
        variant='outline'
        className='w-9 px-0'
        onClick={updateCartQty.onIncrement(props.stock)}
        disabled={N.gte(toInt(updateCartQty.qtyValue, 0), props.stock)}
      >
        <PlusIcon size='1rem' />
      </Button>
    </div>
  )
}
