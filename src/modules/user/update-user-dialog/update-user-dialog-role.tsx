'use client'

import { For } from '@/components/ui/for'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import type { updateUserSchema } from '@/app/app/user/__schema'
import { USER_ROLES } from '@/lib/constant'

import { A, pipe } from '@mobily/ts-belt'
import { useFormContext } from 'react-hook-form'
import type { z } from 'zod'

export function UpdateUserDialogRole() {
  let form = useFormContext<z.infer<typeof updateUserSchema>>()

  let disableInteractive = form.formState.isSubmitting
  let roles = pipe(
    USER_ROLES,
    A.filter((role) => role.value !== 'super-admin'),
  )

  return (
    <FormField
      name='role'
      control={form.control}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel asterisk>Role</FormLabel>
            <Select
              defaultValue={field.value}
              disabled={disableInteractive}
              onValueChange={field.onChange}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder='Pilih role pengguna' />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <For each={roles}>
                  {({ value, label }) => (
                    <SelectItem className='flex flex-row items-center gap-x-2' value={value}>
                      {label}
                    </SelectItem>
                  )}
                </For>
              </SelectContent>
            </Select>

            <FormDescription className='text-balance'>
              Role menentukan apa yang dapat dilakukan pengguna dalam sistem sesuai dengan batasan
              yang sudah ditentukan. Pilihlah role sesuai dengan pekerjaan yang ditetapkan untuk
              pengguna ini.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
