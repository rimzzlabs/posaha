import { Button } from '@/components/ui/button'
import { For } from '@/components/ui/for'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem } from '@/components/ui/select'

import { createUserSchema } from '@/app/app/user/__schema/user-schema'
import { USER_ROLES } from '@/lib/constant'
import { cn } from '@/lib/utils'

import { A, O, pipe } from '@mobily/ts-belt'
import { SelectTrigger } from '@radix-ui/react-select'
import { ChevronDownIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'

export function CreateUserRole() {
  let form = useFormContext<z.infer<typeof createUserSchema>>()

  let getFieldValueLabelAndBgColor = (value: string) => {
    return pipe(
      USER_ROLES,
      A.getBy((role) => role.id === value),
      O.mapNullable((value) => ({ backgroundColor: value.color, label: value.label })),
      O.getWithDefault({ backgroundColor: 'hsl(var(--primary))', label: 'Pilih role pengguna' }),
    )
  }

  return (
    <FormField
      name='role'
      control={form.control}
      render={({ field }) => {
        let { backgroundColor, label } = getFieldValueLabelAndBgColor(field.value)

        return (
          <FormItem>
            <FormLabel asterisk>Role</FormLabel>
            <Select defaultValue={field.value} onValueChange={field.onChange}>
              <SelectTrigger asChild>
                <FormControl>
                  <Button
                    variant='outline'
                    className={cn(
                      'flex gap-x-2 w-full justify-normal',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    <div className='w-4 h-4 shrink-0 rounded' style={{ backgroundColor }} />
                    <span>{label}</span>
                    <ChevronDownIcon className='shrink-0 ml-auto' size='1em' />
                  </Button>
                </FormControl>
              </SelectTrigger>

              <SelectContent>
                <For each={USER_ROLES}>
                  {({ id, label }) => (
                    <SelectItem className='flex items-center flex-row gap-x-2' value={id}>
                      {label}
                    </SelectItem>
                  )}
                </For>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
