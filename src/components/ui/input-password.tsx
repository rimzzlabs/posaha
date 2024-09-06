"use client";

import { Button } from "./button";

import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import * as React from "react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    let [type, setType] = React.useState<"password" | "text">("password");

    let togglePassword = () => {
      setType((prev) => (prev === "password" ? "text" : "password"));
    };

    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
            "pr-10"
          )}
          ref={ref}
          {...props}
        />

        <Button
          type="button"
          onClick={togglePassword}
          variant="outline"
          size="icon"
          className="absolute right-1 top-1 border-none h-8 w-8"
        >
          {type === "text" && <EyeIcon size="0.875rem" />}
          {type === "password" && <EyeOffIcon size="0.875rem" />}
          <span className="sr-only">Toggle password</span>
        </Button>
      </div>
    );
  }
);
InputPassword.displayName = "InputPassword";

export { InputPassword };
