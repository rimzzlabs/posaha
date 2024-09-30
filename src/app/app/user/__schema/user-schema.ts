import { isValidNik } from '@/lib/user'

import { z } from 'zod'

export let createUserSchema = z.object({
  ktp: z
    .string()
    .min(1, 'Harap isi bagian ini')
    .refine(isValidNik, { message: 'No. KTP/NIK tidak valid' }),
  name: z
    .string()
    .min(1, 'Harap isi bagian ini')
    .max(255, 'Maksimal nama lengkap adalah 255 karakter'),
  email: z.string().min(1, 'Harap isi bagian ini').email('Alamat surel tidak valid'),
  password: z
    .string()
    .min(8, 'Password setidaknya 8 karakter atau lebih')
    .regex(/[\W_]/, 'Password harus mengandung setidaknya 1 karakter khusus')
    .regex(/[\d_]/, 'Password harus mengandung setidaknya 1 karakter angka'),
  role: z.enum(['super-admin', 'admin', 'cashier'], { message: 'Harap pilih role' }),
  address: z.string().min(1, 'Harap isi bagian ini'),
})

export let deleteUserSchema = z.object({
  id: z.string().min(1, 'Harap isi bagian ini'),
})

export let updateUserSchema = z.object({
  userId: z.string().min(1, 'ID Pengguna tidak valid'),
  name: z.string().min(1, 'Nama pengguna tidak valid'),
  address: z.string().min(1, 'Alamat tidak valid'),
  role: z.enum(['super-admin', 'admin', 'cashier'], { message: 'Harap pilih role' }),
})

export let updateUserPasswordSchema = z
  .object({
    userId: z.string().min(1, 'ID Pengguna tidak valid'),
    email: z.string().min(1, 'Email pengguna tidak valid').email('Email pengguna tidak valid'),
    oldPassword: z.string().min(1, 'Kata sandi lama tidak valid'),
    newPassword: z
      .string()
      .min(8, 'Password setidaknya 8 karakter atau lebih')
      .regex(/[\W_]/, 'Password harus mengandung setidaknya 1 karakter khusus')
      .regex(/[\d_]/, 'Password harus mengandung setidaknya 1 karakter angka'),
  })
  .refine((shape) => shape.newPassword !== shape.oldPassword, {
    message: 'Kata sandi lama dan kata sandi baru tidak boleh sama',
    path: ['newPassword'],
  })

export let updateUserSelfSchema = z.object({
  userId: z.string().min(1, 'ID Pengguna tidak valid'),
  name: z.string().min(1, 'Nama pengguna tidak valid'),
  email: z.string().min(1, 'Harap isi bagian ini').email('Alamat surel tidak valid'),
  address: z.string().min(1, 'Alamat tidak valid'),
})
