"use client";

import { Loader2, MoonIcon, SunIcon } from "lucide-react";
import { useIsClient } from "@uidotdev/usehooks";
import { Button } from "./button";
import { useTheme } from "next-themes";
import { P, match } from "ts-pattern";

export function ToggleTheme() {
  const isClient = useIsClient();
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    const theme = match(resolvedTheme)
      .with("dark", () => "light")
      .otherwise(() => "dark");

    setTheme(theme);
  };
  const icon = match([resolvedTheme, isClient])
    .with([P._, false], () => <Loader2 size="1rem" className="animate-spin" />)
    .with(["dark", P._], () => <MoonIcon size="1rem" />)
    .otherwise(() => <SunIcon size="1rem" />);

  return (
    <Button onClick={toggleTheme} className="size-9 p-0" variant="ghost">
      {icon}
      <span className="sr-only">Siang</span>
    </Button>
  );
}
