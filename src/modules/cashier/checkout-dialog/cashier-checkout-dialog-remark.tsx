'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

import type { createTransactionSchema } from '@/app/app/transaction/__schema'

import { useFormContext } from 'react-hook-form'
import type { z } from 'zod'

export function CashierCheckoutDialogRemark() {
  let form = useFormContext<z.infer<typeof createTransactionSchema>>()

  return (
    <FormField
      name='remark'
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Catatan <span className='text-muted-foreground'>(opsional)</span>:
          </FormLabel>
          <FormControl>
            <Textarea
              {...field}
              placeholder='Misal: Transaksi John uang kertas 50 rebuan 2'
              disabled={form.formState.isSubmitting}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
