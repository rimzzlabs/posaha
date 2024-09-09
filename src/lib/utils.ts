import { D, F, pipe } from '@mobily/ts-belt'
import { clsx, type ClassValue } from 'clsx'
import type { FieldValues, FormState } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isFormPending<D extends FieldValues>(formState: FormState<D>) {
  return pipe(formState, D.get('isSubmitting'), F.defaultTo(false))
}
