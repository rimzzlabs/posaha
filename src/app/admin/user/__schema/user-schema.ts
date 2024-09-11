import { isValidNik } from '@/lib/user'

import { z } from 'zod'

export let createUserSchema = z.object({
  nik: z
    .string()
    .min(1, 'Harap isi bagian ini')
    .refine(isValidNik, { message: 'No. KTP/NIK tidak valid' }),
  fullName: z
    .string()
    .min(1, 'Harap isi bagian ini')
    .max(255, 'Maksimal nama lengkap adalah 60 karakter'),
  email: z.string().min(1, 'Harap isi bagian ini').email('Alamat surel tidak valid'),
  password: z
    .string()
    .min(8, 'Password setidaknya 8 karakter atau lebih')
    .regex(/[\W_]/, 'Password harus mengandung setidaknya 1 karakter khusus')
    .regex(/[\d_]/, 'Password harus mengandung setidaknya 1 karakter angka'),
  role: z.string().min(1, 'Harap pilih role'),
  address: z.string().min(1, 'Harap isi bagian ini'),
})
