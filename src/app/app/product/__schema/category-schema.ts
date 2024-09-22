import { z } from 'zod'

export let createCategorySchema = z.object({
  name: z.string().min(1, 'Harap isi bagian ini'),
  color: z.string().min(1, 'Harap pilih warna kategori label'),
})

export let deleteCategorySchema = z.object({ id: z.string().min(1, 'Harap isi kategori') })
