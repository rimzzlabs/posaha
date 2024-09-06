import { QueryClientConfig } from "@tanstack/react-query";

export function getReactQueryConfig(): QueryClientConfig {
  return {
    defaultOptions: {
      queries: { refetchOnWindowFocus: process.env.NODE_ENV === "production" },
    },
  };
}
