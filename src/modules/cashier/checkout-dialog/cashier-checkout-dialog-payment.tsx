import { Badge } from '@/components/ui/badge'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import type { TCreateTransactionSchema } from '@/app/app/transaction/__schema'

import { useFormContext } from 'react-hook-form'

export function CashierCheckoutDialogPayment() {
  let form = useFormContext<TCreateTransactionSchema>()

  return (
    <FormField
      name='paymentMethod'
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Metode Pembayaran</FormLabel>

          <FormControl>
            <RadioGroup
              className='grid grid-cols-2'
              defaultValue={field.value}
              onValueChange={field.onChange}
            >
              <FormItem className='flex flex-row-reverse items-center justify-end gap-x-3 space-y-0'>
                <FormLabel className='font-normal'>Uang Kertas</FormLabel>
                <FormControl>
                  <RadioGroupItem value='cash' />
                </FormControl>
              </FormItem>

              <FormItem
                aria-disabled='true'
                className='flex flex-row-reverse items-center justify-end gap-x-3 space-y-0 text-muted-foreground'
              >
                <FormLabel aria-disabled='true' className='font-normal'>
                  QRIS <Badge className='align-text-top text-[0.625rem]'>Akan Datang</Badge>
                </FormLabel>
                <FormControl aria-disabled='true'>
                  <RadioGroupItem value='qris' disabled />
                </FormControl>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
