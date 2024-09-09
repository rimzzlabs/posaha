import { z } from 'zod'

export let createProductCategorySchema = z.object({
  label: z.string().min(1, 'Harap isi bagian ini'),
  color: z.string().min(1, 'Harap pilih warna kategori label'),
})
