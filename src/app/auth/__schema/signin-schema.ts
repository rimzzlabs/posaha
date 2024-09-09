import { z } from 'zod'

export let signInSchema = z.object({
  email: z.string().min(1, 'Harap isi bagian ini').email('Alamat surel tidak valid'),
  password: z.string().min(1, 'Harap isi bagian ini'),
})
