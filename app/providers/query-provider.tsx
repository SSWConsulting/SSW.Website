"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { ReactNode, useMemo } from "react";

// Dev-only: loaded lazily so it never ships in the production bundle.
const ReactQueryDevtools =
  process.env.NODE_ENV === "development"
    ? dynamic(() =>
        import("@tanstack/react-query-devtools").then(
          (mod) => mod.ReactQueryDevtools
        )
      )
    : () => null;

const FIVE_MINS = 1000 * 60 * 5;

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: { queries: { staleTime: FIVE_MINS } },
  });
}

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useMemo(() => makeQueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
      )}
    </QueryClientProvider>
  );
};
