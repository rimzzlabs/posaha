import { D, F, pipe } from '@mobily/ts-belt'
import { clsx, type ClassValue } from 'clsx'
import type { FieldValues, FormState } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { match } from 'ts-pattern'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isFormPending<D extends FieldValues>(formState: FormState<D>) {
  return pipe(formState, D.get('isSubmitting'), F.defaultTo(false))
}

export function getRoleColor(role: TRole) {
  return match(role)
    .with('super-admin', () => '#FCA5A5')
    .with('admin', () => '#FDE047')
    .with('cashier', () => '#6EE7B7')
    .otherwise(() => '#FFA98A')
}
