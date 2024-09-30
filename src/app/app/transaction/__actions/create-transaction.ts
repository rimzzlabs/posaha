'use server'

import { createTransaction } from '@/database/query/transaction'
import { actionReturn } from '@/lib/req-res'

import { createTransactionSchema } from '../__schema'

import { createSafeActionClient } from 'next-safe-action'
import { revalidatePath } from 'next/cache'
import { tryit } from 'radash'

export let createTransactionAction = createSafeActionClient()
  .schema(createTransactionSchema)
  .action(async ({ parsedInput: payload }) => {
    const [error, res] = await tryit(createTransaction)(payload)

    if (error) {
      console.info('(LOG ERR) createTransactionAction error: ', error.message)
      return actionReturn('error')('Terjadi kesalahan pada server')
    }

    revalidatePath('/app/transaction/cashier')
    return actionReturn('success')({ data: res.transaction })
  })
