import { Button } from '@/components/ui/button'
import { For } from '@/components/ui/for'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Select, SelectContent, SelectItem } from '@/components/ui/select'

import { createUserSchema } from '@/app/app/user/__schema/user-schema'
import { USER_ROLES } from '@/lib/constant'
import { cn } from '@/lib/utils'
import { sessionAtom } from '@/states/session'

import { A, F, O, pipe } from '@mobily/ts-belt'
import { SelectTrigger } from '@radix-ui/react-select'
import { useAtomValue } from 'jotai'
import { ChevronDownIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { match, P } from 'ts-pattern'
import { z } from 'zod'

export function CreateUserRole() {
  let form = useFormContext<z.infer<typeof createUserSchema>>()
  let session = useAtomValue(sessionAtom)

  let roles = match([session?.role, USER_ROLES])
    .with(['super-admin', P.select()], F.identity)
    .with(['admin', P.select()], (value) =>
      pipe(
        value,
        A.filter((role) => role.name === 'cashier'),
      ),
    )
    .otherwise(() => [])

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
                      'flex gap-x-2 w-full justify-normal max-w-52',
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
                <For each={roles}>
                  {({ id, label }) => (
                    <SelectItem className='flex items-center flex-row gap-x-2' value={id}>
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
