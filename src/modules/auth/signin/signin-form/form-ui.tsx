"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { HeadingTwo } from "@/components/ui/headings";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInFormValidator } from "./form-validator";
import { z } from "zod";
import { toast } from "sonner";
import { InputPassword } from "@/components/ui/input-password";

type TSignInForm = {
  type: "admin" | "cashier";
};
export function SignInForm(props: TSignInForm) {
  const form = useForm<z.infer<typeof signInFormValidator>>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(signInFormValidator),
  });

  const headingLabel =
    props.type === "admin"
      ? "Masuk sebagai Administrator"
      : "Masuk sebagai Kasir";

  function onSubmit(values: z.infer<typeof signInFormValidator>) {
    toast.success("Success", { description: JSON.stringify(values) });
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <HeadingTwo>{headingLabel}</HeadingTwo>

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full flex-1">
              <FormLabel>Alamat surel</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  autoComplete="email"
                  placeholder="Alamat surel anda"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full flex-1">
              <FormLabel>Kata sandi</FormLabel>
              <FormControl>
                <InputPassword
                  {...field}
                  autoComplete="current-password"
                  placeholder="Kata sandi anda "
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button>Masuk</Button>
        </div>
      </form>
    </Form>
  );
}
