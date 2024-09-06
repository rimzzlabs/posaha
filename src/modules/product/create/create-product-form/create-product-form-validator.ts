import { toFloat } from "radash";
import { z } from "zod";

export let createProductFormValidator = z.object({
  name: z.string().min(1, "Harap isi bagian ini"),
  price: z.preprocess(
    (a) => toFloat(a, 0),
    z
      .number({ invalid_type_error: "Harap isi bagian ini" })
      .min(1000, "Minimal harga produk ialah Rp. 1000")
  ),
  stock: z.preprocess(
    (a) => toFloat(a, 0),
    z
      .number({ invalid_type_error: "Harap isi bagian ini" })
      .min(1, "Minimal stok produk ialah 1")
  ),
});
