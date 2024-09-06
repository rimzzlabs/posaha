"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { HeadingThree } from "@/components/ui/headings";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createProductFormValidator } from "./create-product-form-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { omit, random, sleep, uid } from "radash";
import { useSetAtom } from "jotai";
import { productListAtom } from "@/states/product";
import { faker } from "@faker-js/faker/locale/id_ID";
import { useRouter } from "next/navigation";
import { B } from "@mobily/ts-belt";
import { Loader2Icon, SendHorizonalIcon } from "lucide-react";
import CurrencyInput from "react-currency-input-field";

export function CreateProductForm() {
  let router = useRouter();
  let setProductList = useSetAtom(productListAtom);

  let form = useForm<z.infer<typeof createProductFormValidator>>({
    defaultValues: {
      name: "",
      price: "" as unknown as number,
      stock: 1 as unknown as number,
    },
    resolver: zodResolver(createProductFormValidator),
  });

  let disableInteractive = form.formState.isSubmitting;
  let submitIcon = B.ifElse(
    disableInteractive,
    () => <Loader2Icon size="1em" className="animate-spin" />,
    () => <SendHorizonalIcon size="1em" />
  );

  let mockSubmit = async (
    values: z.infer<typeof createProductFormValidator>
  ) => {
    router.prefetch("/admin/product/list");
    let toastId = toast.loading("Memproses permintaan...");

    // pretend mock fetch
    await sleep(random(1000, 2500));
    toast.dismiss(toastId);

    let timestamp = new Date().toISOString();
    let newProduct: Product = {
      id: uid(32),
      name: values.name,
      price: values.price,
      description: faker.commerce.productDescription(),
      stock: { id: uid(16), available: values.stock, sold: 0 },
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    setProductList((productList) => [...productList, newProduct]);
    toast.success("Berhasil menambahkan produk baru");
    router.push("/admin/product/list");
  };

  return (
    <Form {...form}>
      <form className="max-w-lg" onSubmit={form.handleSubmit(mockSubmit)}>
        <HeadingThree className="mb-4">Informasi Produk</HeadingThree>
        <FormField
          name="name"
          control={form.control}
          disabled={disableInteractive}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Produk</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  autoComplete="off"
                  placeholder="Kiripik Jengkol Pedas Ahoy"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="price"
          control={form.control}
          disabled={disableInteractive}
          render={({ field }) => (
            <FormItem className="pt-3">
              <FormLabel>Harga Produk</FormLabel>
              <FormControl>
                <CurrencyInput
                  {...omit(field, ["onChange"])}
                  customInput={Input}
                  prefix="Rp "
                  type="text"
                  inputMode="numeric"
                  allowDecimals={false}
                  autoComplete="off"
                  groupSeparator="."
                  decimalSeparator=","
                  step={100}
                  onValueChange={(value) => field.onChange(value)}
                  placeholder="Rp 20.000 misalnya"
                  min={0}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <HeadingThree className="mt-6 mb-4">Informasi Stok Produk</HeadingThree>

        <FormField
          name="stock"
          control={form.control}
          disabled={disableInteractive}
          render={({ field }) => (
            <FormItem className="pt-3">
              <FormLabel>Stok Produk</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="Masukan jumlah stok produk"
                  min={1}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-3">
          <Button className="gap-x-2" disabled={disableInteractive}>
            Kirim
            {submitIcon}
          </Button>
        </div>
      </form>
    </Form>
  );
}
