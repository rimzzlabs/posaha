"use client";

import { ThemeProvider } from "next-themes";
import { Provider as JotaiProvider } from "jotai";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useRef } from "react";
import { getReactQueryConfig } from "@/lib/configs/react-query";

export function Provider(props: React.PropsWithChildren) {
  let qcRef = useRef<QueryClient | null>(null);
  if (!qcRef.current) {
    qcRef.current = new QueryClient(getReactQueryConfig());
  }

  return (
    <JotaiProvider>
      <QueryClientProvider client={qcRef.current}>
        <ThemeProvider
          enableSystem
          attribute="class"
          defaultTheme="dark"
          storageKey="app.posaha.theme"
        >
          {props.children}
        </ThemeProvider>
        <ReactQueryDevtools position="bottom" buttonPosition="bottom-left" />
      </QueryClientProvider>
    </JotaiProvider>
  );
}
